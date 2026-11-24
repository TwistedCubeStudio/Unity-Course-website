(function () {
  "use strict";

  var KEY = "tc-lang";
  var lang = "ar";
  try {
    if (localStorage.getItem(KEY) === "en") lang = "en";
  } catch (e) {}
  window.TC_LANG = lang;

  var UI = {
    ar: {
      menu: "القائمة",
      menuAria: "فتح قائمة الدروس",
      brand: "كورس صناعة الألعاب",
      present: "وضع العرض",
      searchPh: "ابحث عن درس",
      navAria: "الدروس",
      tryTitle: "جرّب بنفسك",
      tryClose: "إغلاق",
      tryHelp: "عدّل الكود واضغط تشغيل. النتيجة هنا محاكاة لـ Console، مش تشغيل Unity نفسه.",
      tryRun: "تشغيل",
      tryReset: "إعادة المثال",
      tryCodeAria: "محرر الكود",
      navMissing: "ملفات الدروس مش موجودة.",
      searchResults: "نتائج البحث",
      searchEmpty: "مفيش درس بالكلمة دي.",
      example: "مثال",
      copy: "نسخ",
      tryIt: "جرّب بنفسك",
      warnTag: "غلطة شائعة",
      askTag: "سؤال للقاعة",
      noteTag: "مهم",
      docTitle: "Twisted Cube — كورس صناعة الألعاب",
      docDesc: "مادة شرح كورس Unity: دروس C#، أساسيات واجهة المحرر، وأول لعبة.",
      homeTitle: "مادة شرح كورس Unity",
      homeLead: "المدرّس يفتح الدرس قدام الطلبة: شرح، مثال من Scripts في Unity، نتيجة في Console، زرار جرّب بنفسك، وكويز قصير على نفس الدرس.",
      startCsharp: "ابدأ دروس C#",
      startUnity: "ابدأ من واجهة Unity",
      startGame: "أول لعبة",
      howTitle: "طريقة الشرح",
      feat1t: "نفس ترتيب دروس C#",
      feat1d: "مقدمة، Variables، شروط، Loops، Methods، و GameObjects. الاسم الإنجليزي للدرس ظاهر عشان يربطوا بالمصطلح.",
      feat2t: "أمثلة Scripts في Unity",
      feat2d: "Debug.Log، و MonoBehaviour، و float، و Inspector.",
      feat3t: "مثال + جرّب + كويز",
      feat3d: "النتيجة تظهر تحت الكود. الجرّب يفتح محرر يشتغل في المتصفح. آخر الدرس ٣ أسئلة.",
      feat4t: "واجهة المحرر وأول لعبة",
      feat4d: "Hierarchy و Scene و Game و Inspector و Components، وبعدين لعبة جمع عملات خطوة بخطوة.",
      pathTitle: "مسار الشرح",
      lessonWord: "درس.",
      firstClassTag: "اقتراح لأول حصة",
      firstClass: "القائمة مرتبة C# ثم الواجهة ثم اللعبة. لو الطلبة لسه فاتحين Unity أول مرة، ابدأ بدروس الواجهة عشان الأسماء تبقى على الشاشة، وبعدين ارجع لدروس C#.",
      presentTag: "وضع العرض",
      presentHelp: "زرار وضع العرض فوق بيكبّر الخط ويخبي القائمة عشان البروجيكتور. ارجعه لما تحب تتنقل. التقدم والكويز بيتسجلوا في المتصفح ده.",
      missingLesson: "الدرس مش موجود",
      backHome: "ارجع للبداية",
      crumbHome: "البداية",
      lessonOf: "الدرس {n} من {m}",
      minutes: "حوالي {n} دقايق",
      learn: "هنتعلم إيه",
      quizTitle: "كويز الدرس",
      quizNext: "السؤال اللي بعده",
      quizSee: "شوف النتيجة",
      quizRetry: "إعادة الكويز",
      markDone: "تم شرح الدرس",
      prev: "السابق",
      next: "التالي",
      copied: "اتنسخ",
      copyFail: "انسخ الكود يدوي",
      markedRead: "الدرس اتعلّم كمقروء",
      quizResult: "النتيجة",
      quizScore: "{n} من {m}",
      quizResultBody: "لو سؤال وقع، ارجعوا للنقطة بتاعته في الشرح قبل الدرس الجاي.",
      quizProgress: "سؤال {n} من {m}",
      hintUpdate: "التجربة بتنادي Update مرة واحدة. في Unity الـ Method دي بتتنده كل frame.",
      hintStart: "التجربة بتنفّذ Awake ثم Start مرة واحدة، زي بداية التشغيل في Unity."
    },
    en: {
      menu: "Menu",
      menuAria: "Open the lesson list",
      brand: "Game development course",
      present: "Present",
      searchPh: "Search lessons",
      navAria: "Lessons",
      tryTitle: "Try it yourself",
      tryClose: "Close",
      tryHelp: "Edit the code and press Run. This console is a simulation, not the Unity editor.",
      tryRun: "Run",
      tryReset: "Reset example",
      tryCodeAria: "Code editor",
      navMissing: "Lesson files are missing.",
      searchResults: "Search results",
      searchEmpty: "No lesson matches that word.",
      example: "Example",
      copy: "Copy",
      tryIt: "Try it yourself",
      warnTag: "Common mistake",
      askTag: "Ask the room",
      noteTag: "Important",
      docTitle: "Twisted Cube — Game development course",
      docDesc: "Unity course material: C# lessons, editor windows, and a first game.",
      homeTitle: "Unity course material",
      homeLead: "The instructor opens a lesson in front of the class: an explanation, a Unity script example, the Console result, a try-it editor, and a short quiz on that lesson.",
      startCsharp: "Start C# lessons",
      startUnity: "Start from the Unity windows",
      startGame: "First game",
      howTitle: "How a lesson works",
      feat1t: "A full C# path",
      feat1d: "Intro, variables, conditions, loops, methods, and objects. Each lesson keeps its English name so the term sticks.",
      feat2t: "Unity script examples",
      feat2d: "Debug.Log, MonoBehaviour, float, and the Inspector.",
      feat3t: "Example, try it, quiz",
      feat3d: "The result shows under the code. Try it opens an editor in the browser. Each lesson ends with 3 questions.",
      feat4t: "The editor, then a first game",
      feat4d: "Hierarchy, Scene, Game, Inspector, and Components, then a coin-collecting game step by step.",
      pathTitle: "Teaching path",
      lessonWord: "lessons.",
      firstClassTag: "Suggestion for the first class",
      firstClass: "The list is ordered C#, then the editor, then the game. If this is the students' first time in Unity, start with the window lessons so the names are on screen, then come back to C#.",
      presentTag: "Present mode",
      presentHelp: "Present mode enlarges the type and hides the lesson list for the projector. Turn it off when you need to navigate. Progress and quizzes stay in this browser.",
      missingLesson: "Lesson not found",
      backHome: "Back to the start",
      crumbHome: "Home",
      lessonOf: "Lesson {n} of {m}",
      minutes: "about {n} min",
      learn: "You will learn",
      quizTitle: "Lesson quiz",
      quizNext: "Next question",
      quizSee: "See the result",
      quizRetry: "Retry quiz",
      markDone: "Mark lesson as taught",
      prev: "Previous",
      next: "Next",
      copied: "Copied",
      copyFail: "Copy the code manually",
      markedRead: "Lesson marked as taught",
      quizResult: "Result",
      quizScore: "{n} of {m}",
      quizResultBody: "If a question was missed, go back to that point in the lesson before the next one.",
      quizProgress: "Question {n} of {m}",
      hintUpdate: "This demo calls Update once. In Unity that method runs every frame.",
      hintStart: "This demo runs Awake, then Start, once — the same order as play mode in Unity."
    }
  };

  var TERMS = [
    ["مدخلات الدالة", "Method Parameters"],
    ["كلاس Unity", "Unity Class"],
    ["الكائن الفاضي", "Empty GameObject"],
    ["كائن فاضي", "Empty GameObject"],
    ["الفاصلة المنقوطة", "semicolon"],
    ["فاصلة منقوطة", "semicolon"],
    ["السكريبتات", "Scripts"],
    ["سكريبتات", "Scripts"],
    ["السكربتات", "Scripts"],
    ["سكربتات", "Scripts"],
    ["لإسكريبت", "Script"],
    ["السكريبت", "Script"],
    ["سكريبت", "Script"],
    ["السكربت", "Script"],
    ["سكربت", "Script"],
    ["المتغيرات", "Variables"],
    ["المتغير", "Variable"],
    ["متغيرات", "Variables"],
    ["متغير", "Variable"],
    ["الدوال", "Methods"],
    ["الدالة", "Method"],
    ["دوال", "Methods"],
    ["دالة", "Method"],
    ["الكائنات", "GameObjects"],
    ["الكائن", "GameObject"],
    ["كائنات", "GameObjects"],
    ["كائن", "GameObject"],
    ["الكلاسات", "Classes"],
    ["كلاسات", "Classes"],
    ["الكلاس", "Class"],
    ["كلاس", "Class"],
    ["المكوّنات", "Components"],
    ["المكونات", "Components"],
    ["مكوّنات", "Components"],
    ["مكونات", "Components"],
    ["المكوّن", "Component"],
    ["المكون", "Component"],
    ["كمكوّن", "as a Component"],
    ["كمكون", "as a Component"],
    ["مكوّن", "Component"],
    ["مكون", "Component"],
    ["التعليقات", "Comments"],
    ["تعليقات", "Comments"],
    ["التعليق", "Comment"],
    ["تعليق", "Comment"],
    ["الخصائص", "Properties"],
    ["الخاصية", "Property"],
    ["خصائص", "Properties"],
    ["خاصية", "Property"],
    ["المصفوفات", "Arrays"],
    ["المصفوفة", "Array"],
    ["مصفوفات", "Arrays"],
    ["مصفوفة", "Array"],
    ["الكونستركتور", "Constructor"],
    ["كونستركتور", "Constructor"],
    ["الوراثة", "Inheritance"],
    ["وراثة", "Inheritance"],
    ["المشاهد", "Scenes"],
    ["المشهد", "Scene"],
    ["مشاهد", "Scenes"],
    ["مشهد", "Scene"],
    ["المفتش", "Inspector"],
    ["مفتش", "Inspector"],
    ["الفريمات", "frames"],
    ["فريمات", "frames"],
    ["الفريم", "frame"],
    ["فريم", "frame"],
    ["اللووب", "Loop"],
    ["اللوبس", "Loops"],
    ["لوبس", "Loops"],
    ["اللوب", "Loop"],
    ["لوب", "Loop"],
    ["البوليان", "bool"],
    ["بوليان", "bool"],
    ["الكونسول", "Console"],
    ["كونسول", "Console"],
    ["الفولدرات", "Folders"],
    ["فولدرات", "Folders"],
    ["الفولدر", "Folder"],
    ["فولدر", "Folder"],
    ["الشبابيك", "windows"],
    ["شبابيك", "windows"],
    ["الشباك", "window"],
    ["شباك", "window"],
    ["الخامات", "Materials"],
    ["خامات", "Materials"],
    ["الخامة", "Material"],
    ["خامة", "Material"],
    ["الميتاداتا", "metadata"],
    ["الحقول", "Fields"],
    ["الحقل", "Field"],
    ["حقول", "Fields"],
    ["حقل", "Field"],
    ["المدخلات", "Parameters"],
    ["مدخلات", "Parameters"],
    ["المدخل", "Parameter"],
    ["مدخل", "Parameter"],
    ["الفهارس", "indexes"],
    ["الفهارس", "indexes"],
    ["الفهرس", "index"],
    ["فهرس", "index"],
    ["الوسم", "Tag"],
    ["وسم", "Tag"]
  ];
  TERMS.sort(function (a, b) { return b[0].length - a[0].length; });

  var CODE_SWAPS = [
    ["أهلا بـ Unity", "Hello, Unity"],
    ["اللاعب ظهر", "Player spawned"],
    ["مش هيظهر", "this will not show"],
    ["الباب اتفتح", "The door opened"],
    ["اللعبة شغالة", "The game is running"],
    ["Player ظهر", "Player spawned"],
    ["محاولات اللاعب", "player lives"],
    ["النقاط: ", "Score: "]
  ];

  var ERROR_RULES = [
    [/^النص مفتوح ومقفلتوش بعلامة التنصيص$/, "A string is missing its closing quote"],
    [/^رمز مش مفهوم: (.+)$/, "Unexpected symbol: $1"],
    [/^الكود وقف عند «(.+)»\. راجع الأقواس أو الفاصلة المنقوطة\.$/, "The code stopped at \"$1\". Check braces or the semicolon."],
    [/^متوقع نوع زي int أو float أو string$/, "Expected a type such as int, float, or string"],
    [/^جوه الخاصية متوقع get أو set$/, "Inside a property, expected get or set"],
    [/^foreach محتاج كلمة in$/, "foreach needs the in keyword"],
    [/^جوه switch متوقع case أو default$/, "Inside switch, expected case or default"],
    [/^المشغّل \?: مش متاح في التجربة دي$/, "The ?: operator is not available in this demo"],
    [/^تعبير مش واضح جنب «(.+)»$/, "The expression is unclear next to \"$1\""],
    [/^«(.+)» أمر من Unity نفسه\. شغّله جوه المحرر\. التجربة هنا بتشغّل منطق C# و Debug\.Log\.$/, "\"$1\" is a Unity API call. Run it in the editor. This demo runs C# logic and Debug.Log."],
    [/^مش لاقي اسم بالاسم ده: (.+)$/, "No name called: $1"],
    [/^النوع int بياخد رقم$/, "Type int needs a number"],
    [/^النوع float بياخد رقم$/, "Type float needs a number"],
    [/^النوع string بياخد نص بين علامتي تنصيص\. لو عايز تضم رقم حوّله أو استخدم \+$/, "Type string needs text in quotes. To add a number, convert it or use +"],
    [/^النوع bool بياخد true أو false بس$/, "Type bool only accepts true or false"],
    [/^العملية (.+) محتاجة أرقام أو نصوص$/, "Operator $1 needs numbers or text"],
    [/^القسمة على صفر$/, "Division by zero"],
    [/^باقي القسمة على صفر$/, "Modulo by zero"],
    [/^الكونسول امتلى\. غالبًا في لوب بتطبع من غير ما يخلّص\.$/, "The console filled up. A loop is probably printing without an end."],
    [/^الكود طول أوي واتوقف\. راجع اللوب\.$/, "The code ran too long and stopped. Check the loop."],
    [/^الدالة دي بتاخد رقم$/, "This method takes a number"],
    [/^Mathf\.Abs بياخد رقم$/, "Mathf.Abs takes a number"],
    [/^الشرط لازم يكون true أو false\. للمقارنة استخدم == مش =$/, "A condition must be true or false. Compare with ==, not ="],
    [/^اللوب مالوش نهاية واضحة\.$/, "The loop has no clear end."],
    [/^شرط اللوب لازم يكون bool$/, "A loop condition must be a bool"],
    [/^شرط for لازم يكون bool$/, "A for condition must be a bool"],
    [/^foreach بيشتغل على مصفوفة أو List$/, "foreach works on an array or a List"],
    [/^this بتستخدم جوه كلاس$/, "this is used inside a class"],
    [/^تعبير مش مدعوم في التجربة$/, "This expression is not supported in the demo"],
    [/^الخاصية (.+) ملهاش get$/, "Property $1 has no get"],
    [/^الخاصية (.+) ملهاش set$/, "Property $1 has no set"],
    [/^متغير string بياخد نص$/, "A string variable needs text"],
    [/^محور Vector بياخد رقم$/, "A Vector axis needs a number"],
    [/^متقدرش تعيّن على base$/, "You cannot assign to base"],
    [/^متقدرش تعيّن على (.+)$/, "You cannot assign to $1"],
    [/^الأقواس المربعة دي للمصفوفة أو الـ List$/, "These square brackets are for an array or a List"],
    [/^رقم الخانة لازم يكون رقم$/, "An index must be a number"],
    [/^الخانة (.+) بره المصفوفة$/, "Index $1 is outside the array"],
    [/^الخانة (.+) بره المصفوفة\. الطول (.+)$/, "Index $1 is outside the array. Length is $2"],
    [/^التعيين ده مش واضح$/, "This assignment is unclear"],
    [/^علامة ! بتستخدم مع bool$/, "! is used with a bool"],
    [/^علامة السالب بتستخدم مع رقم$/, "The minus sign is used with a number"],
    [/^\+\+ و -- للارقام$/, "++ and -- are for numbers"],
    [/^\+\+ مش شغال هنا$/, "++ does not work here"],
    [/^\+\+ و -- بيشتغلوا على متغير$/, "++ and -- work on a variable"],
    [/^&& و \|\| بيستخدموا bool\. الشرط يطلع true أو false\.$/, "&& and || use bool. The condition must be true or false."],
    [/^&& و \|\| بيستخدموا bool$/, "&& and || use bool"],
    [/^المقارنة دي للأرقام$/, "This comparison is for numbers"],
    [/^NullReferenceException: بتحاول تستخدم حاجة فاضية\. في Unity الرسالة دي بتطلع حمرا في Console\.$/, "NullReferenceException: you are using something empty. In Unity this message shows in red in the Console."],
    [/^مفيش (.+) هنا$/, "There is no $1 here"],
    [/^Vector ملوش (.+)$/, "Vector has no $1"],
    [/^النص ملوش (.+) في التجربة دي$/, "string has no $1 in this demo"],
    [/^المصفوفة ليها Length والخانات \[0\]$/, "An array has Length and slots [0]"],
    [/^الـ List في التجربة بتدعم Add و Count والأقواس \[\]$/, "List in this demo supports Add, Count, and []"],
    [/^مش قادر أوصل لـ (.+)$/, "Cannot reach $1"],
    [/^الأقواس المربعة للمصفوفة أو List$/, "Square brackets are for an array or a List"],
    [/^مش دالة$/, "That is not a method"],
    [/^مفيش نسخة من الدالة بتاخد (.+) مدخلات$/, "No overload of this method takes $1 arguments"],
    [/^الدوال نادت بعضها كتير أوي$/, "Methods called each other too many times"],
    [/^الاسم ده مش دالة تتنده$/, "That name is not a method you can call"],
    [/^النص ده مش رقم$/, "That text is not a number"],
    [/^تحويل int محتاج رقم$/, "An int cast needs a number"],
    [/^تحويل float محتاج رقم$/, "A float cast needs a number"],
    [/^حجم المصفوفة رقم$/, "An array size must be a number"],
    [/^حجم المصفوفة مش منطقي$/, "That array size is not valid"],
    [/^مش لاقي الكلاس (.+)$/, "Cannot find class $1"],
    [/^مفيش كونستركتور بياخد (.+) مدخلات$/, "No constructor takes $1 arguments"],
    [/^اكتب كود الأول\.$/, "Write some code first."],
    [/^حصل خطأ$/, "Something went wrong"],
    [/^الكود خلّص من غير Debug\.Log$/, "The code finished without Debug.Log"]
  ];

  function ui(key) {
    var pack = UI[window.TC_LANG] || UI.ar;
    var text = pack[key];
    if (text == null) text = UI.ar[key] || key;
    var args = arguments;
    text = String(text).replace(/\{(\w+)\}/g, function (_, name) {
      if (name === "n" && args.length > 1) return String(args[1]);
      if (name === "m" && args.length > 2) return String(args[2]);
      return _;
    });
    if (window.TC_LANG !== "en") text = gloss(text);
    return text;
  }

  function gloss(text) {
    var i;
    for (i = 0; i < TERMS.length; i++) {
      var from = TERMS[i][0];
      var to = TERMS[i][1];
      if (text.indexOf(from) === -1) continue;
      text = text.replace(new RegExp(from, "g"), function (match, offset, whole) {
        var prev = offset > 0 ? whole.charAt(offset - 1) : "";
        if (prev && prev !== " " && /[\u0600-\u06FF]/.test(prev)) return " " + to;
        return to;
      });
    }
    return text;
  }

  function translateError(text) {
    var line = "";
    var body = text;
    var mark = body.match(/ — سطر (\d+)$/);
    if (mark) {
      line = " — line " + mark[1];
      body = body.slice(0, mark.index);
    }
    var i;
    for (i = 0; i < ERROR_RULES.length; i++) {
      if (ERROR_RULES[i][0].test(body)) {
        return body.replace(ERROR_RULES[i][0], ERROR_RULES[i][1]) + line;
      }
    }
    return "";
  }

  function t(value) {
    if (value == null) return "";
    var s = String(value);
    if (!/[\u0600-\u06FF]/.test(s)) return s;
    if (window.TC_LANG === "en") {
      var map = window.EN_TEXT || {};
      if (Object.prototype.hasOwnProperty.call(map, s)) return map[s];
      var err = translateError(s);
      if (err) return err;
      return s;
    }
    return gloss(s);
  }

  function localizeCode(code) {
    var src = String(code || "");
    if (window.TC_LANG !== "en") return src;
    CODE_SWAPS.forEach(function (pair) {
      src = src.split(pair[0]).join(pair[1]);
    });
    return src;
  }

  function applyChrome() {
    var en = window.TC_LANG === "en";
    document.documentElement.lang = en ? "en" : "ar";
    document.documentElement.dir = en ? "ltr" : "rtl";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", ui("docDesc"));
    var menu = document.getElementById("menuBtn");
    if (menu) {
      menu.textContent = ui("menu");
      menu.setAttribute("aria-label", ui("menuAria"));
    }
    var brand = document.querySelector(".brand span");
    if (brand) brand.textContent = ui("brand");
    var langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.textContent = en ? "عربي" : "EN";
      langBtn.setAttribute("aria-label", en ? "Switch to Arabic" : "التبديل إلى الإنجليزية");
    }
    var present = document.getElementById("presentBtn");
    if (present) present.textContent = ui("present");
    var search = document.getElementById("search");
    if (search) search.placeholder = ui("searchPh");
    var nav = document.getElementById("nav");
    if (nav) nav.setAttribute("aria-label", ui("navAria"));
    var tryTitle = document.getElementById("tryTitle");
    if (tryTitle && document.getElementById("tryModal").hidden) tryTitle.textContent = ui("tryTitle");
    var tryClose = document.getElementById("tryClose");
    if (tryClose) tryClose.textContent = ui("tryClose");
    var help = document.querySelector(".modal-help");
    if (help) help.textContent = ui("tryHelp");
    var tryRun = document.getElementById("tryRun");
    if (tryRun) tryRun.textContent = ui("tryRun");
    var tryReset = document.getElementById("tryReset");
    if (tryReset) tryReset.textContent = ui("tryReset");
    var tryCode = document.getElementById("tryCode");
    if (tryCode) tryCode.setAttribute("aria-label", ui("tryCodeAria"));
  }

  function setLang(next) {
    window.TC_LANG = next === "en" ? "en" : "ar";
    try { localStorage.setItem(KEY, window.TC_LANG); } catch (e) {}
    applyChrome();
    if (window.TC_RERENDER) window.TC_RERENDER();
  }

  window.TC = {
    t: t,
    ui: ui,
    gloss: gloss,
    localizeCode: localizeCode,
    applyChrome: applyChrome,
    setLang: setLang,
    toggle: function () { setLang(window.TC_LANG === "en" ? "ar" : "en"); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyChrome);
  } else {
    applyChrome();
  }
})();
