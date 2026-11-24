(function () {
  "use strict";

  var tracks = [window.CSHARP_TRACK, window.UNITY_TRACK, window.GAME_TRACK].filter(Boolean);
  var nav = document.getElementById("nav");
  var main = document.getElementById("main");
  var search = document.getElementById("search");
  var sidebar = document.getElementById("sidebar");
  var backdrop = document.getElementById("backdrop");
  var modal = document.getElementById("tryModal");
  var tryCode = document.getElementById("tryCode");
  var tryOut = document.getElementById("tryOut");
  var tryTitle = document.getElementById("tryTitle");
  var toast = document.getElementById("toast");
  var presentBtn = document.getElementById("presentBtn");
  var tryStarter = "";
  var activeQuiz = null;
  var DONE_KEY = "tc-unity-done";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(code) {
    var src = escapeHtml(code);
    var keywords = {
      using: 1, namespace: 1, public: 1, private: 1, protected: 1, class: 1, void: 1,
      if: 1, else: 1, for: 1, foreach: 1, while: 1, return: 1, new: 1, this: 1, base: 1,
      true: 1, false: 1, null: 1, break: 1, continue: 1, switch: 1, case: 1, default: 1,
      static: 1, override: 1, virtual: 1, in: 1
    };
    var types = {
      int: 1, float: 1, double: 1, string: 1, bool: 1, var: 1, MonoBehaviour: 1,
      Vector3: 1, Vector2: 1, Debug: 1, Mathf: 1, Transform: 1, GameObject: 1,
      Input: 1, Collider: 1, Rigidbody: 1, List: 1
    };
    var out = "";
    var i = 0;
    while (i < src.length) {
      if (src.slice(i, i + 2) === "//") {
        var end = src.indexOf("\n", i);
        if (end < 0) end = src.length;
        out += '<span class="cm">' + src.slice(i, end) + "</span>";
        i = end;
        continue;
      }
      if (src.charAt(i) === '"') {
        var j = i + 1;
        while (j < src.length && src.charAt(j) !== '"') {
          if (src.charAt(j) === "\\") j++;
          j++;
        }
        out += '<span class="st">' + src.slice(i, j + 1) + "</span>";
        i = j + 1;
        continue;
      }
      var ch = src.charAt(i);
      if (/[A-Za-z_]/.test(ch)) {
        var k = i + 1;
        while (k < src.length && /[A-Za-z0-9_]/.test(src.charAt(k))) k++;
        var word = src.slice(i, k);
        if (keywords[word]) out += '<span class="kw">' + word + "</span>";
        else if (types[word]) out += '<span class="ty">' + word + "</span>";
        else out += word;
        i = k;
        continue;
      }
      if (/[0-9]/.test(ch)) {
        var n = i + 1;
        while (n < src.length && /[0-9.fF]/.test(src.charAt(n))) n++;
        out += '<span class="nu">' + src.slice(i, n) + "</span>";
        i = n;
        continue;
      }
      out += ch;
      i++;
    }
    return out;
  }

  function flatLessons() {
    var list = [];
    tracks.forEach(function (track) {
      track.groups.forEach(function (group) {
        group.lessons.forEach(function (lesson, index) {
          list.push({ track: track, group: group, lesson: lesson, index: index });
        });
      });
    });
    var count = {};
    list.forEach(function (item) {
      count[item.track.id] = (count[item.track.id] || 0) + 1;
      item.number = count[item.track.id];
      item.total = 0;
    });
    list.forEach(function (item) { item.total = count[item.track.id]; });
    return list;
  }

  function lessonKey(trackId, lessonId) { return trackId + "/" + lessonId; }

  function readDone() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY) || "{}"); }
    catch (e) { return {}; }
  }

  function markDone(key) {
    var done = readDone();
    done[key] = 1;
    localStorage.setItem(DONE_KEY, JSON.stringify(done));
    renderNav();
  }

  function findLesson(trackId, lessonId) {
    var list = flatLessons();
    for (var i = 0; i < list.length; i++) {
      if (list[i].track.id === trackId && list[i].lesson.id === lessonId) {
        return {
          item: list[i],
          prev: list[i - 1] || null,
          next: list[i + 1] || null
        };
      }
    }
    return null;
  }

  function tx(value) { return window.TC.t(value); }

  function isRtl() {
    return document.documentElement.getAttribute("dir") !== "ltr";
  }

  function markTerms(value) {
    var safe = escapeHtml(value);
    if (!isRtl()) return safe;
    return safe.replace(/[A-Za-z][A-Za-z0-9+#._]*(?:[ \t]*:[ \t]*[A-Za-z][A-Za-z0-9+#._]*|[ \t]+[A-Za-z][A-Za-z0-9+#._]*)*/g, function (word) {
      var core = word.replace(/[.!?؟]+$/, "");
      var tail = word.slice(core.length);
      if (!core) return word;
      return '<bdi dir="ltr">' + core + "</bdi>" + tail;
    });
  }

  function splitSentences(text) {
    var parts = [];
    var buf = "";
    var i;
    for (i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      buf += ch;
      if (ch !== "." && ch !== "!" && ch !== "?" && ch !== "؟") continue;
      var prev = i > 0 ? text.charAt(i - 1) : "";
      var next = text.charAt(i + 1);
      if (ch === "." && /[A-Za-z0-9]/.test(prev) && /[A-Za-z0-9]/.test(next)) continue;
      if (next !== "" && next !== " " && next !== "\n") continue;
      parts.push(buf.replace(/\s+$/, ""));
      buf = "";
      while (text.charAt(i + 1) === " ") i++;
    }
    if (buf.replace(/\s/g, "")) parts.push(buf.replace(/^\s+|\s+$/g, ""));
    return parts;
  }

  function htmlText(value) {
    var raw = String(tx(value));
    if (!isRtl()) return markTerms(raw);
    var parts = splitSentences(raw);
    if (parts.length < 2) return '<span class="sentence" dir="rtl">' + markTerms(raw) + "</span>";
    return parts.map(function (part) {
      return '<span class="sentence" dir="rtl">' + markTerms(part) + "</span>";
    }).join("");
  }

  function searchable(item) {
    var lesson = item.lesson;
    var blob = [item.track.title, item.group.title, lesson.title, lesson.w3 || "", (lesson.goals || []).join(" ")];
    (lesson.blocks || []).forEach(function (block) {
      if (block.text) blob.push(block.text);
      if (block.items) blob.push(block.items.join(" "));
      if (block.title) blob.push(block.title);
      if (block.caption) blob.push(block.caption);
      if (block.heads) blob.push(block.heads.join(" "));
      if (block.rows) block.rows.forEach(function (row) { blob.push(row.join(" ")); });
      if (block.type === "steps" && block.items) {
        block.items.forEach(function (step) { blob.push(step.title + " " + step.body); });
      }
    });
    (lesson.quiz || []).forEach(function (q) {
      blob.push(q.q, (q.choices || []).join(" "), q.why || "");
    });
    return blob.map(function (part) { return part + " " + tx(part); }).join(" ").toLowerCase();
  }

  function renderNav() {
    var query = (search.value || "").trim().toLowerCase();
    var list = flatLessons();
    var done = readDone();
    var html = "";
    if (!tracks.length) {
      nav.innerHTML = '<p class="nav-empty">' + escapeHtml(window.TC.ui("navMissing")) + "</p>";
      return;
    }
    if (query) {
      var hits = list.filter(function (item) { return searchable(item).indexOf(query) >= 0; });
      html += '<div class="group-label">' + escapeHtml(window.TC.ui("searchResults")) + "</div>";
      if (!hits.length) html += '<p class="nav-empty">' + escapeHtml(window.TC.ui("searchEmpty")) + "</p>";
      hits.forEach(function (item) { html += linkHtml(item, done); });
      nav.innerHTML = html;
      return;
    }
    tracks.forEach(function (track) {
      html += '<div class="track-label">' + markTerms(tx(track.title)) + "</div>";
      track.groups.forEach(function (group) {
        html += '<div class="group-label">' + markTerms(tx(group.title)) + "</div>";
        group.lessons.forEach(function (lesson) {
          var item = list.filter(function (entry) {
            return entry.track.id === track.id && entry.lesson.id === lesson.id;
          })[0];
          html += linkHtml(item, done);
        });
      });
    });
    nav.innerHTML = html;
  }

  function linkHtml(item, done) {
    var key = lessonKey(item.track.id, item.lesson.id);
    var current = location.hash === "#/" + key;
    var cls = "lesson-link" + (current ? " active" : "") + (done[key] ? " done" : "");
    var num = item.number < 10 ? "0" + item.number : String(item.number);
    return '<a class="' + cls + '" href="#/' + key + '"><small>' + num + "</small><span>" + markTerms(tx(item.lesson.title)) + "</span></a>";
  }

  function cell(value) {
    var text = tx(value);
    if (/^[\x00-\x7F]+$/.test(text) && /[A-Za-z0-9()]/.test(text)) return '<span class="ltr">' + escapeHtml(text) + "</span>";
    return markTerms(text);
  }

  function consoleHtml(result, code) {
    var html = '<div class="console"><div class="console-bar"><b>Console</b></div>';
    if (!result.ok && result.error) html += '<div class="log-error">' + escapeHtml(tx(result.error)) + "</div>";
    result.logs.forEach(function (log) {
      var cls = log.kind === "muted" ? "log-muted" : "log";
      html += '<div class="' + cls + '">' + escapeHtml(tx(log.text)) + "</div>";
    });
    if (/void\s+Update/.test(code)) html += '<p class="run-hint">' + escapeHtml(window.TC.ui("hintUpdate")) + "</p>";
    else if (/void\s+Start/.test(code) || /void\s+Awake/.test(code)) html += '<p class="run-hint">' + escapeHtml(window.TC.ui("hintStart")) + "</p>";
    html += "</div>";
    return html;
  }

  function renderCode(block) {
    var code = window.TC.localizeCode(block.code || "");
    var title = block.title ? tx(block.title) : window.TC.ui("example");
    var html = '<section class="example"><div class="example-top"><strong>' + markTerms(title) + '</strong><div class="example-actions">';
    html += '<button class="btn-line" type="button" data-copy="1">' + escapeHtml(window.TC.ui("copy")) + "</button>";
    if (block.run) html += '<button class="btn-red" type="button" data-try="1">' + escapeHtml(window.TC.ui("tryIt")) + "</button>";
    html += "</div></div>";
    html += "<pre>" + highlight(code) + "</pre>";
    if (block.run && window.UnityRunner) html += consoleHtml(window.UnityRunner.run(code), code);
    if (block.caption) html += '<p class="caption">' + htmlText(block.caption) + "</p>";
    html += "</section>";
    return html;
  }

  function hierarchyRows(items, depth) {
    var html = "";
    (items || []).forEach(function (item) {
      var cls = "row" + (item.selected ? " sel" : "");
      html += '<div class="' + cls + '" style="padding-inline-start:' + (6 + depth * 14) + 'px"><i class="dot ' + escapeHtml(item.kind || "cube") + '"></i>' + escapeHtml(item.name) + "</div>";
      if (item.children) html += hierarchyRows(item.children, depth + 1);
    });
    return html;
  }

  function renderMock(block) {
    var html = '<section class="mock">';
    if (block.variant === "layout") {
      var panels = [
        ["hierarchy", "Hierarchy"],
        ["scene", "Scene"],
        ["inspector", "Inspector"],
        ["project", "Project"],
        ["game", "Game"],
        ["console", "Console"]
      ];
      html += '<div class="layout-map">';
      panels.forEach(function (panel) {
        html += '<div class="' + (block.focus === panel[0] ? "is-focus" : "") + '">' + panel[1] + "</div>";
      });
      html += "</div>";
    } else if (block.variant === "console") {
      html += '<div class="console-fake">';
      (block.lines || []).forEach(function (line) {
        html += '<div class="lv-' + escapeHtml(line.level || "info") + '">' + escapeHtml(tx(line.text)) + "</div>";
      });
      html += "</div>";
    } else if (block.variant === "project") {
      html += '<div class="proj">';
      (block.lines || []).forEach(function (line) {
        html += "<div>" + escapeHtml(tx(line)) + "</div>";
      });
      html += "</div>";
    } else {
      var focus = block.focus || "";
      function panelClass(name) {
        if (!focus) return "";
        return focus === name ? " is-focus" : " is-dim";
      }
      html += '<div class="unity">';
      html += '<section class="panel' + panelClass("hierarchy") + '"><h3>Hierarchy</h3><div class="tree">' + hierarchyRows(block.hierarchy || [], 0) + "</div></section>";
      html += '<section class="panel' + panelClass(block.showGame ? "game" : "scene") + '"><h3>' + (block.showGame ? "Game" : "Scene") + '</h3>';
      html += '<div class="stage' + (block.showGame ? " game" : "") + '">';
      html += '<div class="actor ground"></div><div class="actor capsule-body"></div>';
      html += '<div class="actor coin-body" style="left:22%"></div><div class="actor coin-body" style="left:68%"></div>';
      if (block.showGame) html += '<div class="score-hud">Score: 0</div>';
      html += "</div></section>";
      html += '<section class="panel' + panelClass("inspector") + '"><h3>Inspector</h3><div class="insp">';
      var insp = block.inspector || { name: "Player", tag: "Untagged", components: [] };
      html += '<div class="comp"><b>' + escapeHtml(insp.name || "Object") + "</b><div><span>Tag</span><span>" + escapeHtml(insp.tag || "Untagged") + "</span></div></div>";
      (insp.components || []).forEach(function (comp) {
        html += '<div class="comp"><b>' + escapeHtml(tx(comp.title)) + "</b>";
        (comp.rows || []).forEach(function (row) {
          html += "<div><span>" + escapeHtml(tx(row[0])) + "</span><span>" + escapeHtml(tx(row[1])) + "</span></div>";
        });
        html += "</div>";
      });
      html += "</div></section></div>";
    }
    if (block.caption) html += '<p class="mock-cap">' + htmlText(block.caption) + "</p>";
    html += "</section>";
    return html;
  }

  function renderBlocks(blocks) {
    var html = "";
    (blocks || []).forEach(function (block, index) {
      if (block.type === "p") html += "<p>" + htmlText(block.text) + "</p>";
      else if (block.type === "h") html += "<h2>" + markTerms(tx(block.text)) + "</h2>";
      else if (block.type === "ul" || block.type === "ol") {
        html += "<" + block.type + ">";
        block.items.forEach(function (item) { html += "<li>" + htmlText(item) + "</li>"; });
        html += "</" + block.type + ">";
      } else if (block.type === "note" || block.type === "warn" || block.type === "ask") {
        var label = block.type === "warn" ? window.TC.ui("warnTag") : block.type === "ask" ? window.TC.ui("askTag") : window.TC.ui("noteTag");
        html += '<aside class="callout ' + block.type + '"><span class="tag">' + escapeHtml(label) + "</span>" + htmlText(block.text) + "</aside>";
      } else if (block.type === "table") {
        html += '<div class="table-wrap"><table><thead><tr>';
        block.heads.forEach(function (head) { html += "<th>" + markTerms(tx(head)) + "</th>"; });
        html += "</tr></thead><tbody>";
        block.rows.forEach(function (row) {
          html += "<tr>";
          row.forEach(function (col) { html += "<td>" + cell(col) + "</td>"; });
          html += "</tr>";
        });
        html += "</tbody></table></div>";
      } else if (block.type === "code") {
        html += '<div data-snippet="' + index + '">' + renderCode(block) + "</div>";
      } else if (block.type === "steps") {
        html += '<ol class="steps">';
        block.items.forEach(function (step, stepIndex) {
          html += "<li><i>" + (stepIndex + 1) + "</i><div><strong>" + htmlText(step.title) + "</strong><p>" + htmlText(step.body) + "</p></div></li>";
        });
        html += "</ol>";
      } else if (block.type === "checks") {
        html += '<ul class="checks">';
        block.items.forEach(function (item, checkIndex) {
          html += '<li><button class="check" type="button" data-check="' + checkIndex + '"><i></i><span>' + htmlText(item) + "</span></button></li>";
        });
        html += "</ul>";
      } else if (block.type === "mock") html += renderMock(block);
    });
    return html;
  }

  function renderHome() {
    document.title = window.TC.ui("docTitle");
    var counts = {};
    tracks.forEach(function (track) {
      counts[track.id] = track.groups.reduce(function (sum, group) { return sum + group.lessons.length; }, 0);
    });
    var first = {};
    tracks.forEach(function (track) { first[track.id] = track.groups[0].lessons[0].id; });
    var html = '<article class="page">';
    html += '<section class="hero"><img src="assets/logo-white.png" alt="">';
    html += "<div><h1>" + escapeHtml(window.TC.ui("homeTitle")) + "</h1>";
    html += "<p>" + htmlText(window.TC.ui("homeLead")) + "</p>";
    html += '<div class="hero-actions">';
    html += '<a href="#/csharp/' + first.csharp + '">' + escapeHtml(window.TC.ui("startCsharp")) + "</a>";
    html += '<a href="#/unity/' + first.unity + '">' + escapeHtml(window.TC.ui("startUnity")) + "</a>";
    html += '<a href="#/game/' + first.game + '">' + escapeHtml(window.TC.ui("startGame")) + "</a>";
    html += "</div></div></section>";
    html += "<h2>" + escapeHtml(window.TC.ui("howTitle")) + "</h2>";
    html += '<div class="features">';
    html += feature(window.TC.ui("feat1t"), window.TC.ui("feat1d"));
    html += feature(window.TC.ui("feat2t"), window.TC.ui("feat2d"));
    html += feature(window.TC.ui("feat3t"), window.TC.ui("feat3d"));
    html += feature(window.TC.ui("feat4t"), window.TC.ui("feat4d"));
    html += "</div>";
    html += "<h2>" + escapeHtml(window.TC.ui("pathTitle")) + "</h2>";
    html += '<div class="home-grid">';
    tracks.forEach(function (track, index) {
      html += '<a class="path" href="#/' + track.id + "/" + first[track.id] + '"><div class="path-no">' + (index + 1) + "</div><div><b>" + markTerms(tx(track.title)) + "</b><span>" + counts[track.id] + " " + escapeHtml(window.TC.ui("lessonWord")) + " " + htmlText(track.blurb) + "</span></div></a>";
    });
    html += "</div>";
    html += '<aside class="callout ask"><span class="tag">' + escapeHtml(window.TC.ui("firstClassTag")) + "</span>" + escapeHtml(window.TC.ui("firstClass")) + "</aside>";
    html += '<aside class="callout"><span class="tag">' + escapeHtml(window.TC.ui("presentTag")) + "</span>" + escapeHtml(window.TC.ui("presentHelp")) + "</aside>";
    html += "</article>";
    main.innerHTML = html;
    window.scrollTo(0, 0);
  }

  function feature(title, text) {
    return '<article class="feature"><strong>' + markTerms(title) + "</strong><span>" + htmlText(text) + "</span></article>";
  }

  function renderLesson(trackId, lessonId) {
    var found = findLesson(trackId, lessonId);
    if (!found) {
      main.innerHTML = '<article class="page"><h1>' + escapeHtml(window.TC.ui("missingLesson")) + '</h1><p><a href="#/">' + escapeHtml(window.TC.ui("backHome")) + "</a></p></article>";
      return;
    }
    var item = found.item;
    var lesson = item.lesson;
    document.title = tx(lesson.title) + " — Twisted Cube";
    var key = lessonKey(trackId, lessonId);
    var html = '<article class="page" data-lesson="' + key + '">';
    html += '<p class="crumbs"><a href="#/">' + escapeHtml(window.TC.ui("crumbHome")) + "</a> / " + markTerms(tx(item.track.title)) + " / " + markTerms(tx(item.group.title)) + "</p>";
    html += '<p class="kicker">' + escapeHtml(lesson.w3 || item.track.short || "") + " · " + escapeHtml(window.TC.ui("lessonOf", item.number, item.total)) + (lesson.minutes ? " · " + escapeHtml(window.TC.ui("minutes", lesson.minutes)) : "") + "</p>";
    html += "<h1>" + markTerms(tx(lesson.title)) + "</h1>";
    if (lesson.goals && lesson.goals.length) {
      html += '<div class="goalbox"><strong>' + escapeHtml(window.TC.ui("learn")) + "</strong><ul>";
      lesson.goals.forEach(function (goal) { html += "<li>" + htmlText(goal) + "</li>"; });
      html += "</ul></div>";
    }
    html += renderBlocks(lesson.blocks);
    if (lesson.quiz && lesson.quiz.length) {
      html += '<section class="quiz" id="quiz"><h2>' + escapeHtml(window.TC.ui("quizTitle")) + '</h2><p class="lead" id="quizProgress"></p><h3 id="quizQuestion"></h3><div id="quizOptions"></div><p class="quiz-why" id="quizWhy" hidden></p><div class="example-actions"><button class="btn-red" type="button" id="quizNext" hidden>' + escapeHtml(window.TC.ui("quizNext")) + '</button><button class="btn-line" type="button" id="quizRetry" hidden>' + escapeHtml(window.TC.ui("quizRetry")) + "</button></div></section>";
    }
    html += '<div class="mark-row"><button class="btn-line" type="button" id="markDone">' + escapeHtml(window.TC.ui("markDone")) + "</button></div>";
    html += '<nav class="pager">';
    if (found.prev) {
      var prevKey = lessonKey(found.prev.track.id, found.prev.lesson.id);
      html += '<a href="#/' + prevKey + '"><span>' + escapeHtml(window.TC.ui("prev")) + "</span>" + markTerms(tx(found.prev.lesson.title)) + "</a>";
    } else html += "<span></span>";
    if (found.next) {
      var nextKey = lessonKey(found.next.track.id, found.next.lesson.id);
      html += '<a class="next" href="#/' + nextKey + '"><span>' + escapeHtml(window.TC.ui("next")) + "</span>" + markTerms(tx(found.next.lesson.title)) + "</a>";
    }
    html += "</nav></article>";
    main.innerHTML = html;
    restoreChecks(key);
    if (lesson.quiz) mountQuiz(lesson, key);
    window.scrollTo(0, 0);
  }

  function currentBlocks() {
    var article = main.querySelector("[data-lesson]");
    if (!article) return [];
    var parts = article.getAttribute("data-lesson").split("/");
    var found = findLesson(parts[0], parts[1]);
    return found ? found.item.lesson.blocks : [];
  }

  function openTry(code, title) {
    tryStarter = code;
    tryTitle.textContent = title ? tx(title) : window.TC.ui("tryTitle");
    tryCode.value = code;
    modal.hidden = false;
    runEditor();
    tryCode.focus();
  }

  function runEditor() {
    var result = window.UnityRunner.run(tryCode.value);
    tryOut.innerHTML = consoleHtml(result, tryCode.value);
  }

  function closeTry() { modal.hidden = true; }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove("show"); }, 1400);
  }

  function mountQuiz(lesson, key) {
    activeQuiz = { items: lesson.quiz, index: 0, score: 0, locked: false, key: key, done: false };
    paintQuiz();
  }

  function paintQuiz() {
    var quiz = activeQuiz;
    if (!quiz) return;
    var progress = document.getElementById("quizProgress");
    var question = document.getElementById("quizQuestion");
    var options = document.getElementById("quizOptions");
    var why = document.getElementById("quizWhy");
    var next = document.getElementById("quizNext");
    var retry = document.getElementById("quizRetry");
    if (!progress) return;
    if (quiz.done) {
      progress.textContent = "";
      question.textContent = window.TC.ui("quizResult");
      options.innerHTML = '<p class="quiz-score">' + escapeHtml(window.TC.ui("quizScore", quiz.score, quiz.items.length)) + "</p><p>" + htmlText(window.TC.ui("quizResultBody")) + "</p>";
      why.hidden = true;
      next.hidden = true;
      retry.hidden = false;
      markDone(quiz.key);
      return;
    }
    var item = quiz.items[quiz.index];
    progress.textContent = window.TC.ui("quizProgress", quiz.index + 1, quiz.items.length);
    question.innerHTML = htmlText(item.q);
    options.innerHTML = "";
    item.choices.forEach(function (choice, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.innerHTML = markTerms(tx(choice));
      button.setAttribute("data-choice", String(index));
      options.appendChild(button);
    });
    why.hidden = true;
    why.textContent = "";
    next.hidden = true;
    retry.hidden = true;
    next.textContent = quiz.index === quiz.items.length - 1 ? window.TC.ui("quizSee") : window.TC.ui("quizNext");
  }

  function restoreChecks(key) {
    var saved = [];
    try { saved = JSON.parse(sessionStorage.getItem("tc-checks:" + key) || "[]"); }
    catch (e) { saved = []; }
    main.querySelectorAll("[data-check]").forEach(function (button) {
      if (saved.indexOf(Number(button.getAttribute("data-check"))) >= 0) button.classList.add("on");
    });
  }

  function route() {
    renderNav();
    var hash = location.hash.replace(/^#\/?/, "");
    if (!hash) {
      renderHome();
      return;
    }
    var parts = hash.split("/");
    renderLesson(parts[0], parts[1]);
  }

  document.getElementById("menuBtn").addEventListener("click", function () {
    sidebar.classList.toggle("open");
    backdrop.hidden = !sidebar.classList.contains("open");
  });
  backdrop.addEventListener("click", function () {
    sidebar.classList.remove("open");
    backdrop.hidden = true;
  });
  nav.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 980px)").matches || document.body.classList.contains("present")) {
      sidebar.classList.remove("open");
      backdrop.hidden = true;
    }
  });
  search.addEventListener("input", renderNav);
  presentBtn.addEventListener("click", function () {
    document.body.classList.toggle("present");
    presentBtn.classList.toggle("is-on", document.body.classList.contains("present"));
    if (document.body.classList.contains("present")) {
      sidebar.classList.remove("open");
      backdrop.hidden = true;
    }
  });

  main.addEventListener("click", function (event) {
    var copyBtn = event.target.closest("[data-copy]");
    var tryBtn = event.target.closest("[data-try]");
    var checkBtn = event.target.closest("[data-check]");
    var choiceBtn = event.target.closest("[data-choice]");
    if (copyBtn || tryBtn) {
      var holder = event.target.closest("[data-snippet]");
      var blocks = currentBlocks();
      var block = blocks[Number(holder.getAttribute("data-snippet"))];
      if (copyBtn) {
        var text = window.TC.localizeCode(block.code);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { showToast(window.TC.ui("copied")); }, function () { fallbackCopy(text); });
        } else fallbackCopy(text);
      }
      if (tryBtn) openTry(window.TC.localizeCode(block.code), block.title || "");
    }
    if (checkBtn) {
      checkBtn.classList.toggle("on");
      var article = main.querySelector("[data-lesson]");
      var key = article.getAttribute("data-lesson");
      var picked = [];
      article.querySelectorAll("[data-check].on").forEach(function (button) {
        picked.push(Number(button.getAttribute("data-check")));
      });
      sessionStorage.setItem("tc-checks:" + key, JSON.stringify(picked));
    }
    if (choiceBtn && activeQuiz && !activeQuiz.locked && !activeQuiz.done) {
      var pickedIndex = Number(choiceBtn.getAttribute("data-choice"));
      var item = activeQuiz.items[activeQuiz.index];
      activeQuiz.locked = true;
      main.querySelectorAll("[data-choice]").forEach(function (button) {
        var index = Number(button.getAttribute("data-choice"));
        if (index === item.a) button.classList.add("correct");
        if (index === pickedIndex && pickedIndex !== item.a) button.classList.add("wrong");
      });
      if (pickedIndex === item.a) activeQuiz.score++;
      var why = document.getElementById("quizWhy");
      why.hidden = false;
      why.innerHTML = htmlText(item.why);
      document.getElementById("quizNext").hidden = false;
    }
    if (event.target.id === "quizNext" && activeQuiz) {
      activeQuiz.index++;
      activeQuiz.locked = false;
      if (activeQuiz.index >= activeQuiz.items.length) activeQuiz.done = true;
      paintQuiz();
    }
    if (event.target.id === "quizRetry" && activeQuiz) {
      activeQuiz.index = 0;
      activeQuiz.score = 0;
      activeQuiz.locked = false;
      activeQuiz.done = false;
      paintQuiz();
    }
    if (event.target.id === "markDone") {
      var article2 = main.querySelector("[data-lesson]");
      markDone(article2.getAttribute("data-lesson"));
      showToast(window.TC.ui("markedRead"));
    }
  });

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); showToast(window.TC.ui("copied")); }
    catch (e) { showToast(window.TC.ui("copyFail")); }
    area.remove();
  }

  document.getElementById("tryRun").addEventListener("click", runEditor);
  document.getElementById("tryReset").addEventListener("click", function () {
    tryCode.value = tryStarter;
    runEditor();
  });
  document.getElementById("tryClose").addEventListener("click", closeTry);
  modal.addEventListener("click", function (event) { if (event.target === modal) closeTry(); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeTry();
  });

  document.getElementById("langBtn").addEventListener("click", function () {
    window.TC.toggle();
  });

  window.TC_RERENDER = function () {
    modal.hidden = true;
    route();
  };

  window.addEventListener("hashchange", route);
  window.TC.applyChrome();
  route();
})();
