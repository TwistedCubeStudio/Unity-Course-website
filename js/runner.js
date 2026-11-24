/* Tiny Unity-flavored C# runner for classroom examples.
   Covers the lesson subset: types, control flow, methods, classes, inheritance. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.UnityRunner = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var KEYWORDS = {
    if: 1, else: 1, for: 1, while: 1, foreach: 1, in: 1, return: 1, break: 1, continue: 1,
    switch: 1, case: 1, default: 1, new: 1, class: 1, enum: 1, using: 1, namespace: 1,
    public: 1, private: 1, protected: 1, static: 1, const: 1, void: 1, int: 1, float: 1,
    double: 1, string: 1, bool: 1, var: 1, true: 1, false: 1, null: 1, this: 1, base: 1,
    override: 1, virtual: 1, abstract: 1, sealed: 1, readonly: 1, partial: 1
  };

  var TYPE_WORDS = { void: 1, int: 1, float: 1, double: 1, string: 1, bool: 1, var: 1 };

  function fail(message, line) {
    var e = new Error(message);
    e.userMessage = message;
    e.line = line || 0;
    return e;
  }

  function tokenize(src) {
    var tokens = [];
    var i = 0;
    var n = src.length;
    var line = 1;

    function push(type, value) {
      tokens.push({ type: type, value: value, line: line });
    }

    while (i < n) {
      var c = src.charAt(i);
      if (c === "\n") { line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }

      if (c === "/" && src.charAt(i + 1) === "/") {
        while (i < n && src.charAt(i) !== "\n") i++;
        continue;
      }
      if (c === "/" && src.charAt(i + 1) === "*") {
        i += 2;
        while (i < n && !(src.charAt(i) === "*" && src.charAt(i + 1) === "/")) {
          if (src.charAt(i) === "\n") line++;
          i++;
        }
        i += 2;
        continue;
      }

      if (c === '"') {
        i++;
        var s = "";
        while (i < n && src.charAt(i) !== '"') {
          if (src.charAt(i) === "\\") {
            var e = src.charAt(i + 1);
            if (e === "n") s += "\n";
            else if (e === "t") s += "\t";
            else if (e === '"') s += '"';
            else if (e === "\\") s += "\\";
            else s += e;
            i += 2;
            continue;
          }
          if (src.charAt(i) === "\n") line++;
          s += src.charAt(i);
          i++;
        }
        if (src.charAt(i) !== '"') throw fail("النص مفتوح ومقفلتوش بعلامة التنصيص", line);
        i++;
        push("string", s);
        continue;
      }

      if (c === "'") {
        i++;
        var ch = src.charAt(i);
        if (ch === "\\") { i++; ch = src.charAt(i); }
        i++;
        if (src.charAt(i) === "'") i++;
        push("string", ch);
        continue;
      }

      if ((c >= "0" && c <= "9") || (c === "." && src.charAt(i + 1) >= "0" && src.charAt(i + 1) <= "9")) {
        var j = i;
        var sawDot = false;
        while (j < n) {
          var d = src.charAt(j);
          if (d >= "0" && d <= "9") { j++; continue; }
          if (d === "." && !sawDot) { sawDot = true; j++; continue; }
          break;
        }
        var raw = src.slice(i, j);
        var isFloat = sawDot;
        var suf = src.charAt(j);
        if (suf === "f" || suf === "F" || suf === "d" || suf === "D") {
          isFloat = true;
          j++;
        }
        i = j;
        push(isFloat ? "float" : "int", isFloat ? parseFloat(raw) : parseInt(raw, 10));
        continue;
      }

      if ((c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || c === "_") {
        var k = i + 1;
        while (k < n) {
          var ch2 = src.charAt(k);
          if ((ch2 >= "A" && ch2 <= "Z") || (ch2 >= "a" && ch2 <= "z") || (ch2 >= "0" && ch2 <= "9") || ch2 === "_") k++;
          else break;
        }
        var word = src.slice(i, k);
        i = k;
        if (word === "true" || word === "false") push("bool", word === "true");
        else if (word === "null") push("null", null);
        else if (KEYWORDS[word]) push("kw", word);
        else push("id", word);
        continue;
      }

      var two = src.slice(i, i + 2);
      if (two === "==" || two === "!=" || two === "<=" || two === ">=" || two === "&&" || two === "||" ||
          two === "++" || two === "--" || two === "+=" || two === "-=" || two === "*=" || two === "/=" ||
          two === "%=" || two === "=>") {
        push("op", two);
        i += 2;
        continue;
      }

      if ("{}()[].,;:+-*/%<>=!&|?:".indexOf(c) >= 0) {
        push("sym", c);
        i++;
        continue;
      }

      throw fail("رمز مش مفهوم: " + c, line);
    }

    tokens.push({ type: "eof", value: null, line: line });
    return tokens;
  }

  function Parser(tokens) {
    this.t = tokens;
    this.i = 0;
  }

  Parser.prototype.peek = function (ahead) {
    return this.t[Math.min(this.i + (ahead || 0), this.t.length - 1)];
  };

  Parser.prototype.next = function () {
    return this.t[this.i++];
  };

  Parser.prototype.eat = function (type, value) {
    var p = this.peek();
    if (p.type === type && (value === undefined || p.value === value)) {
      this.i++;
      return p;
    }
    return null;
  };

  Parser.prototype.expect = function (type, value) {
    var p = this.eat(type, value);
    if (!p) {
      var g = this.peek();
      throw fail("الكود وقف عند «" + (g.value === null ? "النهاية" : g.value) + "». راجع الأقواس أو الفاصلة المنقوطة.", g.line);
    }
    return p;
  };

  Parser.prototype.skipModifiers = function () {
    while (this.peek().type === "kw" &&
      ["public", "private", "protected", "static", "const", "override", "virtual", "abstract", "sealed", "readonly", "partial"].indexOf(this.peek().value) >= 0) {
      this.next();
    }
  };

  Parser.prototype.skipAttributes = function () {
    while (this.eat("sym", "[")) {
      var depth = 1;
      while (depth > 0 && this.peek().type !== "eof") {
        if (this.peek().type === "sym" && this.peek().value === "[") depth++;
        if (this.peek().type === "sym" && this.peek().value === "]") depth--;
        this.next();
      }
    }
  };

  Parser.prototype.skipGeneric = function () {
    if (!this.eat("sym", "<")) return;
    var depth = 1;
    while (depth > 0 && this.peek().type !== "eof") {
      var p = this.next();
      if (p.type === "sym" && p.value === "<") depth++;
      else if (p.type === "sym" && p.value === ">") depth--;
    }
  };

  Parser.prototype.skipUsings = function () {
    while (this.eat("kw", "using")) {
      while (!this.eat("sym", ";") && this.peek().type !== "eof") this.next();
    }
  };

  Parser.prototype.isTypeToken = function (tok) {
    if (!tok) return false;
    if (tok.type === "id") return true;
    return tok.type === "kw" && !!TYPE_WORDS[tok.value];
  };

  Parser.prototype.lookaheadAfterType = function (index) {
    var j = index;
    var tok = this.t[j];
    if (!this.isTypeToken(tok)) return null;
    j++;
    if (this.t[j] && this.t[j].type === "sym" && this.t[j].value === "<") {
      var depth = 1;
      j++;
      while (this.t[j] && depth > 0) {
        if (this.t[j].type === "sym" && this.t[j].value === "<") depth++;
        if (this.t[j].type === "sym" && this.t[j].value === ">") depth--;
        j++;
      }
    }
    if (this.t[j] && this.t[j].type === "sym" && this.t[j].value === "[") {
      j++;
      if (this.t[j] && this.t[j].type === "sym" && this.t[j].value === "]") j++;
    }
    return { nameIndex: j, next: this.t[j], after: this.t[j + 1] };
  };

  Parser.prototype.looksLikeTopMethod = function () {
    var info = this.lookaheadAfterType(this.i);
    if (!info || !info.next || info.next.type !== "id") return false;
    return info.after && info.after.type === "sym" && info.after.value === "(";
  };

  Parser.prototype.looksLikeMethod = function () {
    var here = this.peek();
    if (here.type === "id" && this.peek(1).type === "sym" && this.peek(1).value === "(") return true;
    var info = this.lookaheadAfterType(this.i);
    if (!info || !info.next || info.next.type !== "id") return false;
    return info.after && info.after.type === "sym" && info.after.value === "(";
  };

  Parser.prototype.looksLikeProperty = function () {
    var info = this.lookaheadAfterType(this.i);
    if (!info || !info.next || info.next.type !== "id") return false;
    return info.after && info.after.type === "sym" && info.after.value === "{";
  };

  Parser.prototype.isDeclStart = function () {
    var info = this.lookaheadAfterType(this.i);
    if (!info || !info.next) return false;
    if (info.next.type === "id") return true;
    return false;
  };

  Parser.prototype.parseProgram = function () {
    var stmts = [];
    this.skipUsings();
    if (this.eat("kw", "namespace")) {
      this.expect("id");
      this.expect("sym", "{");
      while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
        stmts.push(this.parseTop());
      }
      this.eat("sym", "}");
      return stmts;
    }
    while (this.peek().type !== "eof") stmts.push(this.parseTop());
    return stmts;
  };

  Parser.prototype.parseTop = function () {
    this.skipAttributes();
    this.skipUsings();
    this.skipModifiers();
    this.skipAttributes();
    if (this.peek().type === "kw" && this.peek().value === "namespace") {
      this.next();
      this.expect("id");
      this.expect("sym", "{");
      var inner = [];
      while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") inner.push(this.parseTop());
      this.eat("sym", "}");
      return { type: "block", body: inner, line: this.peek().line };
    }
    if (this.peek().type === "kw" && this.peek().value === "class") return this.parseClass();
    if (this.peek().type === "kw" && this.peek().value === "enum") return this.parseEnum();
    if (this.looksLikeTopMethod()) return this.parseMethod(true);
    return this.parseStatement();
  };

  Parser.prototype.parseClass = function () {
    var line = this.peek().line;
    this.expect("kw", "class");
    var name = this.expect("id").value;
    var base = null;
    if (this.eat("sym", ":")) {
      base = this.expect("id").value;
      this.skipGeneric();
      while (this.eat("sym", ",")) {
        this.expect("id");
        this.skipGeneric();
      }
    }
    this.expect("sym", "{");
    var fields = [];
    var methods = [];
    var props = [];
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      this.skipAttributes();
      this.skipModifiers();
      this.skipAttributes();
      if (this.peek().type === "sym" && this.peek().value === "}") break;
      if (this.looksLikeMethod()) methods.push(this.parseMethod(false));
      else if (this.looksLikeProperty()) props.push(this.parseProperty());
      else fields.push(this.parseField());
    }
    this.expect("sym", "}");
    return { type: "class", name: name, base: base, fields: fields, methods: methods, props: props, line: line };
  };

  Parser.prototype.parseEnum = function () {
    var line = this.peek().line;
    this.expect("kw", "enum");
    var name = this.expect("id").value;
    this.expect("sym", "{");
    var members = [];
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      if (this.peek().type === "sym" && this.peek().value === ",") { this.next(); continue; }
      var member = this.expect("id").value;
      if (this.eat("sym", "=")) this.parseExpression();
      members.push(member);
      this.eat("sym", ",");
    }
    this.expect("sym", "}");
    this.eat("sym", ";");
    return { type: "enum", name: name, members: members, line: line };
  };

  Parser.prototype.parseMethod = function (isTop) {
    var line = this.peek().line;
    var isCtor = this.peek().type === "id" && this.peek(1).type === "sym" && this.peek(1).value === "(";
    if (!isCtor) this.readType();
    var name = this.expect("id").value;
    var params = this.parseParams();
    if (this.eat("sym", ";")) {
      return { type: "method", name: name, params: params, body: { type: "block", body: [], line: line }, ctor: isCtor, empty: true, line: line };
    }
    var body = this.parseBlock();
    return { type: "method", name: name, params: params, body: body, ctor: isCtor, line: line, top: !!isTop };
  };

  Parser.prototype.parseParams = function () {
    this.expect("sym", "(");
    var params = [];
    if (!this.eat("sym", ")")) {
      while (true) {
        this.skipModifiers();
        this.readType();
        params.push(this.expect("id").value);
        if (!this.eat("sym", ",")) break;
      }
      this.expect("sym", ")");
    }
    return params;
  };

  Parser.prototype.readType = function () {
    var tok = this.peek();
    if (!(tok.type === "kw" || tok.type === "id")) {
      throw fail("متوقع نوع زي int أو float أو string", tok.line);
    }
    var name = this.next().value;
    this.skipGeneric();
    var isArray = false;
    if (this.eat("sym", "[")) {
      this.expect("sym", "]");
      isArray = true;
    }
    return { name: name, isArray: isArray };
  };

  Parser.prototype.parseProperty = function () {
    var line = this.peek().line;
    var vtype = this.readType();
    var name = this.expect("id").value;
    this.expect("sym", "{");
    var getter = null;
    var setter = null;
    var autoGet = false;
    var autoSet = false;
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      this.skipModifiers();
      var kindTok = this.peek();
      if (kindTok.type !== "id" || (kindTok.value !== "get" && kindTok.value !== "set")) {
        throw fail("جوه الخاصية متوقع get أو set", kindTok.line);
      }
      var kind = this.next().value;
      if (this.eat("sym", ";")) {
        if (kind === "get") autoGet = true;
        else autoSet = true;
      } else if (kind === "get") getter = this.parseBlock();
      else setter = this.parseBlock();
    }
    this.expect("sym", "}");
    var init = null;
    if (this.eat("sym", "=")) init = this.parseExpression();
    this.eat("sym", ";");
    return {
      type: "prop", name: name, vtype: vtype.name, isArray: vtype.isArray,
      getter: getter, setter: setter, autoGet: autoGet, autoSet: autoSet, init: init, line: line
    };
  };

  Parser.prototype.parseField = function () {
    var line = this.peek().line;
    var vtype = this.readType();
    var name = this.expect("id").value;
    var init = null;
    if (this.eat("sym", "=")) init = this.parseInitValue();
    this.expect("sym", ";");
    return { type: "field", name: name, vtype: vtype.name, isArray: vtype.isArray, init: init, line: line };
  };

  Parser.prototype.parseInitValue = function () {
    if (this.peek().type === "sym" && this.peek().value === "{") return this.parseArrayInit();
    return this.parseExpression();
  };

  Parser.prototype.parseArrayInit = function () {
    var line = this.peek().line;
    this.expect("sym", "{");
    var items = [];
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      items.push(this.parseExpression());
      if (!this.eat("sym", ",")) break;
    }
    this.expect("sym", "}");
    return { type: "array", items: items, line: line };
  };

  Parser.prototype.parseBlock = function () {
    var line = this.peek().line;
    this.expect("sym", "{");
    var body = [];
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      body.push(this.parseStatement());
    }
    this.expect("sym", "}");
    return { type: "block", body: body, line: line };
  };

  Parser.prototype.parseStatement = function () {
    this.skipAttributes();
    var p = this.peek();
    if (p.type === "kw" && p.value === "if") return this.parseIf();
    if (p.type === "kw" && p.value === "while") return this.parseWhile();
    if (p.type === "kw" && p.value === "for") return this.parseFor();
    if (p.type === "kw" && p.value === "foreach") return this.parseForeach();
    if (p.type === "kw" && p.value === "switch") return this.parseSwitch();
    if (p.type === "kw" && p.value === "return") {
      var line = this.next().line;
      var value = null;
      if (!(this.peek().type === "sym" && this.peek().value === ";")) value = this.parseExpression();
      this.eat("sym", ";");
      return { type: "return", value: value, line: line };
    }
    if (p.type === "kw" && p.value === "break") {
      var lb = this.next().line;
      this.eat("sym", ";");
      return { type: "break", line: lb };
    }
    if (p.type === "kw" && p.value === "continue") {
      var lc = this.next().line;
      this.eat("sym", ";");
      return { type: "continue", line: lc };
    }
    if (p.type === "sym" && p.value === "{") return this.parseBlock();
    if (p.type === "sym" && p.value === ";") {
      var le = this.next().line;
      return { type: "empty", line: le };
    }
    if (this.isDeclStart() && !this.looksLikeMethod()) return this.parseLocalDecl();
    var line2 = this.peek().line;
    var expr = this.parseExpression();
    this.eat("sym", ";");
    return { type: "expr", expr: expr, line: line2 };
  };

  Parser.prototype.parseLocalDecl = function () {
    var line = this.peek().line;
    var vtype = this.readType();
    var name = this.expect("id").value;
    var init = null;
    if (this.eat("sym", "=")) init = this.parseInitValue();
    this.expect("sym", ";");
    return { type: "decl", name: name, vtype: vtype.name, isArray: vtype.isArray, init: init, line: line };
  };

  Parser.prototype.parseIf = function () {
    var line = this.peek().line;
    this.expect("kw", "if");
    this.expect("sym", "(");
    var test = this.parseExpression();
    this.expect("sym", ")");
    var then = this.parseStatement();
    var els = null;
    if (this.eat("kw", "else")) els = this.parseStatement();
    return { type: "if", test: test, then: then, els: els, line: line };
  };

  Parser.prototype.parseWhile = function () {
    var line = this.peek().line;
    this.expect("kw", "while");
    this.expect("sym", "(");
    var test = this.parseExpression();
    this.expect("sym", ")");
    var body = this.parseStatement();
    return { type: "while", test: test, body: body, line: line };
  };

  Parser.prototype.parseFor = function () {
    var line = this.peek().line;
    this.expect("kw", "for");
    this.expect("sym", "(");
    var init = null;
    if (!(this.peek().type === "sym" && this.peek().value === ";")) {
      if (this.isDeclStart()) init = this.parseLocalDecl();
      else {
        var ex = this.parseExpression();
        this.expect("sym", ";");
        init = { type: "expr", expr: ex, line: line };
      }
    } else this.next();
    var test = null;
    if (!(this.peek().type === "sym" && this.peek().value === ";")) test = this.parseExpression();
    this.expect("sym", ";");
    var update = null;
    if (!(this.peek().type === "sym" && this.peek().value === ")")) update = this.parseExpression();
    this.expect("sym", ")");
    var body = this.parseStatement();
    return { type: "for", init: init, test: test, update: update, body: body, line: line };
  };

  Parser.prototype.parseForeach = function () {
    var line = this.peek().line;
    this.expect("kw", "foreach");
    this.expect("sym", "(");
    this.readType();
    var name = this.expect("id").value;
    if (!(this.peek().type === "kw" && this.peek().value === "in")) {
      throw fail("foreach محتاج كلمة in", this.peek().line);
    }
    this.next();
    var list = this.parseExpression();
    this.expect("sym", ")");
    var body = this.parseStatement();
    return { type: "foreach", name: name, list: list, body: body, line: line };
  };

  Parser.prototype.parseSwitch = function () {
    var line = this.peek().line;
    this.expect("kw", "switch");
    this.expect("sym", "(");
    var test = this.parseExpression();
    this.expect("sym", ")");
    this.expect("sym", "{");
    var cases = [];
    while (!(this.peek().type === "sym" && this.peek().value === "}") && this.peek().type !== "eof") {
      if (this.eat("kw", "case")) {
        var value = this.parseExpression();
        this.expect("sym", ":");
        cases.push({ value: value, body: this.parseSwitchBody(), line: line });
      } else if (this.eat("kw", "default")) {
        this.expect("sym", ":");
        cases.push({ isDefault: true, body: this.parseSwitchBody(), line: line });
      } else {
        throw fail("جوه switch متوقع case أو default", this.peek().line);
      }
    }
    this.expect("sym", "}");
    return { type: "switch", test: test, cases: cases, line: line };
  };

  Parser.prototype.parseSwitchBody = function () {
    var body = [];
    while (this.peek().type !== "eof" &&
      !(this.peek().type === "kw" && (this.peek().value === "case" || this.peek().value === "default")) &&
      !(this.peek().type === "sym" && this.peek().value === "}")) {
      body.push(this.parseStatement());
    }
    return body;
  };

  Parser.prototype.parseExpression = function () { return this.parseAssign(); };

  Parser.prototype.parseAssign = function () {
    var left = this.parseOr();
    var p = this.peek();
    if ((p.type === "sym" && p.value === "=") || (p.type === "op" && ["+=", "-=", "*=", "/=", "%="].indexOf(p.value) >= 0)) {
      var op = this.next().value;
      var right = this.parseAssign();
      return { type: "assign", op: op, left: left, right: right, line: p.line };
    }
    return left;
  };

  Parser.prototype.parseOr = function () {
    var left = this.parseAnd();
    while (this.peek().type === "op" && this.peek().value === "||") {
      var line = this.next().line;
      var right = this.parseAnd();
      left = { type: "binary", op: "||", left: left, right: right, line: line };
    }
    return left;
  };

  Parser.prototype.parseAnd = function () {
    var left = this.parseEq();
    while (this.peek().type === "op" && this.peek().value === "&&") {
      var line = this.next().line;
      var right = this.parseEq();
      left = { type: "binary", op: "&&", left: left, right: right, line: line };
    }
    return left;
  };

  Parser.prototype.parseEq = function () {
    var left = this.parseCmp();
    while (this.peek().type === "op" && (this.peek().value === "==" || this.peek().value === "!=")) {
      var op = this.next();
      var right = this.parseCmp();
      left = { type: "binary", op: op.value, left: left, right: right, line: op.line };
    }
    return left;
  };

  Parser.prototype.parseCmp = function () {
    var left = this.parseAdd();
    while (true) {
      var p = this.peek();
      var op = null;
      if (p.type === "op" && (p.value === "<=" || p.value === ">=")) op = p.value;
      else if (p.type === "sym" && (p.value === "<" || p.value === ">")) op = p.value;
      else break;
      var line = this.next().line;
      var right = this.parseAdd();
      left = { type: "binary", op: op, left: left, right: right, line: line };
    }
    return left;
  };

  Parser.prototype.parseAdd = function () {
    var left = this.parseMul();
    while (this.peek().type === "sym" && (this.peek().value === "+" || this.peek().value === "-")) {
      var op = this.next();
      var right = this.parseMul();
      left = { type: "binary", op: op.value, left: left, right: right, line: op.line };
    }
    return left;
  };

  Parser.prototype.parseMul = function () {
    var left = this.parseUnary();
    while ((this.peek().type === "sym" && (this.peek().value === "*" || this.peek().value === "/" || this.peek().value === "%"))) {
      var op = this.next();
      var right = this.parseUnary();
      left = { type: "binary", op: op.value, left: left, right: right, line: op.line };
    }
    return left;
  };

  Parser.prototype.parseUnary = function () {
    var p = this.peek();
    if (p.type === "sym" && (p.value === "!" || p.value === "-")) {
      this.next();
      return { type: "unary", op: p.value, expr: this.parseUnary(), line: p.line };
    }
    if (p.type === "op" && (p.value === "++" || p.value === "--")) {
      this.next();
      return { type: "unary", op: p.value === "++" ? "pre++" : "pre--", expr: this.parseUnary(), line: p.line };
    }
    return this.parsePostfix();
  };

  Parser.prototype.parsePostfix = function () {
    var expr = this.parsePrimary();
    while (true) {
      if (this.eat("sym", "(")) {
        var args = [];
        var line = this.peek().line;
        if (!this.eat("sym", ")")) {
          while (true) {
            args.push(this.parseExpression());
            if (!this.eat("sym", ",")) break;
          }
          this.expect("sym", ")");
        }
        expr = { type: "call", callee: expr, args: args, line: line };
      } else if (this.eat("sym", ".")) {
        var name = this.expect("id").value;
        expr = { type: "member", object: expr, name: name, line: this.peek().line };
      } else if (this.eat("sym", "[")) {
        var index = this.parseExpression();
        this.expect("sym", "]");
        expr = { type: "index", object: expr, index: index, line: this.peek().line };
      } else if (this.peek().type === "op" && (this.peek().value === "++" || this.peek().value === "--")) {
        var op = this.next();
        expr = { type: "unary", op: op.value === "++" ? "post++" : "post--", expr: expr, line: op.line };
      } else break;
    }
    return expr;
  };

  Parser.prototype.parsePrimary = function () {
    var p = this.peek();
    if (p.type === "int" || p.type === "float" || p.type === "string" || p.type === "bool") {
      this.next();
      return { type: "literal", kind: p.type === "bool" ? "bool" : p.type, value: p.value, line: p.line };
    }
    if (p.type === "null") {
      this.next();
      return { type: "literal", kind: "null", value: null, line: p.line };
    }
    if (p.type === "kw" && p.value === "this") {
      this.next();
      return { type: "this", line: p.line };
    }
    if (p.type === "kw" && p.value === "base") {
      this.next();
      return { type: "base", line: p.line };
    }
    if (p.type === "id") {
      this.next();
      return { type: "var", name: p.value, line: p.line };
    }
    if (p.type === "sym" && p.value === "(") {
      var n1 = this.peek(1);
      var n2 = this.peek(2);
      if (n1.type === "kw" && (n1.value === "int" || n1.value === "float" || n1.value === "double" || n1.value === "string" || n1.value === "bool") &&
          n2.type === "sym" && n2.value === ")") {
        this.next();
        var castType = this.next().value;
        this.next();
        return { type: "cast", vtype: castType, expr: this.parseUnary(), line: p.line };
      }
      this.next();
      var inner = this.parseExpression();
      this.expect("sym", ")");
      return inner;
    }
    if (p.type === "kw" && p.value === "new") return this.parseNew();
    if (p.type === "sym" && p.value === "{") return this.parseArrayInit();
    if (p.type === "sym" && p.value === "?") throw fail("المشغّل ?: مش متاح في التجربة دي", p.line);
    throw fail("تعبير مش واضح جنب «" + (p.value === null ? "النهاية" : p.value) + "»", p.line);
  };

  Parser.prototype.parseNew = function () {
    var line = this.peek().line;
    this.expect("kw", "new");
    var name = "object";
    if (this.peek().type === "id" || this.peek().type === "kw") name = this.next().value;
    this.skipGeneric();
    if (this.eat("sym", "[")) {
      var size = null;
      if (!(this.peek().type === "sym" && this.peek().value === "]")) size = this.parseExpression();
      this.expect("sym", "]");
      var init = null;
      if (this.peek().type === "sym" && this.peek().value === "{") init = this.parseArrayInit();
      return { type: "newArray", name: name, size: size, init: init, line: line };
    }
    var args = [];
    if (this.eat("sym", "(")) {
      if (!this.eat("sym", ")")) {
        while (true) {
          args.push(this.parseExpression());
          if (!this.eat("sym", ",")) break;
        }
        this.expect("sym", ")");
      }
    }
    return { type: "new", name: name, args: args, line: line };
  };

  function Env(parent) {
    this.parent = parent || null;
    this.vars = Object.create(null);
  }
  Env.prototype.hasOwn = function (name) {
    return Object.prototype.hasOwnProperty.call(this.vars, name);
  };
  Env.prototype.findHolder = function (name) {
    if (this.hasOwn(name)) return this;
    if (this.parent) return this.parent.findHolder(name);
    return null;
  };
  Env.prototype.get = function (name, line) {
    if (this.hasOwn(name)) return this.vars[name];
    if (this.parent) return this.parent.get(name, line);
    throw fail(missingName(name), line);
  };

  function missingName(name) {
    if (name === "transform" || name === "Input" || name === "gameObject" || name === "Instantiate" || name === "Destroy" || name === "Time") {
      return "«" + name + "» أمر من Unity نفسه. شغّله جوه المحرر. التجربة هنا بتشغّل منطق C# و Debug.Log.";
    }
    return "مش لاقي اسم بالاسم ده: " + name;
  }

  function INT(v) { return { t: "int", v: Math.trunc(v) }; }
  function FLOAT(v) { return { t: "float", v: Number(v) }; }
  function STR(v) { return { t: "string", v: String(v) }; }
  function BOOL(v) { return { t: "bool", v: !!v }; }
  function NULL() { return { t: "null", v: null }; }

  function isNum(v) { return v && (v.t === "int" || v.t === "float"); }

  function trimNum(n) {
    if (!isFinite(n)) return String(n);
    var r = Math.round(n * 1000) / 1000;
    if (Object.is(r, -0)) return "0";
    return String(r);
  }

  function format(val) {
    if (!val || val.t === "null") return "null";
    if (val.t === "int") return String(Math.trunc(val.v));
    if (val.t === "float") return trimNum(val.v);
    if (val.t === "bool") return val.v ? "True" : "False";
    if (val.t === "string") return val.v;
    if (val.t === "vector") return "(" + trimNum(val.x) + ", " + trimNum(val.y) + ", " + trimNum(val.z) + ")";
    if (val.t === "enum") return val.name;
    if (val.t === "array" || val.t === "list") {
      var bits = [];
      for (var i = 0; i < val.items.length; i++) bits.push(format(val.items[i]));
      return bits.join(", ");
    }
    if (val.t === "object") return val.className;
    return "?";
  }

  function defaultValue(vtype, isArray) {
    if (isArray) return NULL();
    if (vtype === "int") return INT(0);
    if (vtype === "float" || vtype === "double") return FLOAT(0);
    if (vtype === "string") return STR("");
    if (vtype === "bool") return BOOL(false);
    if (vtype === "List") return { t: "list", items: [] };
    return NULL();
  }

  function coerceType(vtype, val, line) {
    if (vtype === "var" || !vtype) return val;
    if (vtype === "int") {
      if (!isNum(val)) throw fail("النوع int بياخد رقم", line);
      return INT(val.v);
    }
    if (vtype === "float" || vtype === "double") {
      if (!isNum(val)) throw fail("النوع float بياخد رقم", line);
      return FLOAT(val.v);
    }
    if (vtype === "string") {
      if (val.t === "null") return val;
      if (val.t !== "string") throw fail("النوع string بياخد نص بين علامتي تنصيص. لو عايز تضم رقم حوّله أو استخدم +", line);
      return val;
    }
    if (vtype === "bool") {
      if (val.t !== "bool") throw fail("النوع bool بياخد true أو false بس", line);
      return val;
    }
    return val;
  }

  function numOp(op, a, b, line) {
    if (op === "+" && a.t === "vector" && b.t === "vector") {
      return { t: "vector", x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }
    if (op === "-" && a.t === "vector" && b.t === "vector") {
      return { t: "vector", x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    }
    if (op === "*" && ((a.t === "vector" && isNum(b)) || (isNum(a) && b.t === "vector"))) {
      var vec = a.t === "vector" ? a : b;
      var s = a.t === "vector" ? b.v : a.v;
      return { t: "vector", x: vec.x * s, y: vec.y * s, z: vec.z * s };
    }
    if (op === "+" && (a.t === "string" || b.t === "string")) return STR(format(a) + format(b));
    if (!isNum(a) || !isNum(b)) throw fail("العملية " + op + " محتاجة أرقام أو نصوص", line);
    var isF = a.t === "float" || b.t === "float";
    var r = 0;
    if (op === "+") r = a.v + b.v;
    else if (op === "-") r = a.v - b.v;
    else if (op === "*") r = a.v * b.v;
    else if (op === "/") {
      if (b.v === 0) throw fail("القسمة على صفر", line);
      r = a.v / b.v;
      if (!isF) r = Math.trunc(r);
    } else if (op === "%") {
      if (b.v === 0) throw fail("باقي القسمة على صفر", line);
      r = a.v % b.v;
      if (!isF) r = Math.trunc(r);
    }
    return isF ? FLOAT(r) : INT(r);
  }

  function valuesEqual(a, b) {
    if (!a || !b) return false;
    if (a.t === "null" || b.t === "null") return a.t === "null" && b.t === "null";
    if (isNum(a) && isNum(b)) return a.v === b.v;
    if (a.t !== b.t) return false;
    if (a.t === "string" || a.t === "bool") return a.v === b.v;
    if (a.t === "enum") return a.enumName === b.enumName && a.name === b.name;
    return false;
  }

  function Runtime(logs) {
    this.logs = logs;
    this.steps = 0;
    this.depth = 0;
    this.table = Object.create(null);
    this.global = new Env(null);
    this.installBuiltins();
  }

  Runtime.prototype.pushLog = function (text) {
    this.logs.push({ kind: "log", text: String(text) });
    if (this.logs.length > 80) throw fail("الكونسول امتلى. غالبًا في لوب بتطبع من غير ما يخلّص.");
  };

  Runtime.prototype.tick = function (line) {
    this.steps++;
    if (this.steps > 8000) throw fail("الكود طول أوي واتوقف. راجع اللوب.", line);
  };

  Runtime.prototype.installBuiltins = function () {
    var self = this;
    function numArg(v, line) {
      if (!isNum(v)) throw fail("الدالة دي بتاخد رقم", line);
      return v.v;
    }
    var math = {
      Abs: function (args) {
        var v = args[0];
        if (!isNum(v)) throw fail("Mathf.Abs بياخد رقم");
        return v.t === "int" ? INT(Math.abs(v.v)) : FLOAT(Math.abs(v.v));
      },
      Max: function (args) {
        var x = numArg(args[0]);
        var y = numArg(args[1]);
        var isF = args[0].t === "float" || args[1].t === "float";
        return isF ? FLOAT(Math.max(x, y)) : INT(Math.max(x, y));
      },
      Min: function (args) {
        var x = numArg(args[0]);
        var y = numArg(args[1]);
        var isF = args[0].t === "float" || args[1].t === "float";
        return isF ? FLOAT(Math.min(x, y)) : INT(Math.min(x, y));
      },
      Round: function (args) { return FLOAT(Math.round(numArg(args[0]))); },
      RoundToInt: function (args) { return INT(Math.round(numArg(args[0]))); },
      Floor: function (args) { return FLOAT(Math.floor(numArg(args[0]))); },
      FloorToInt: function (args) { return INT(Math.floor(numArg(args[0]))); },
      Ceil: function (args) { return FLOAT(Math.ceil(numArg(args[0]))); },
      CeilToInt: function (args) { return INT(Math.ceil(numArg(args[0]))); },
      Sqrt: function (args) { return FLOAT(Math.sqrt(numArg(args[0]))); },
      Pow: function (args) { return FLOAT(Math.pow(numArg(args[0]), numArg(args[1]))); },
      Clamp: function (args) {
        var v = numArg(args[0]);
        var a = numArg(args[1]);
        var b = numArg(args[2]);
        return FLOAT(Math.min(b, Math.max(a, v)));
      },
      Lerp: function (args) {
        var a = numArg(args[0]);
        var b = numArg(args[1]);
        var t = numArg(args[2]);
        return FLOAT(a + (b - a) * t);
      }
    };
    var mathProps = Object.create(null);
    Object.keys(math).forEach(function (name) {
      mathProps[name] = { t: "builtin", fn: math[name] };
    });
    this.global.vars.Mathf = { t: "namespace", props: mathProps };

    this.global.vars.Debug = {
      t: "namespace",
      props: {
        Log: {
          t: "builtin",
          fn: function (args) {
            var parts = [];
            for (var i = 0; i < args.length; i++) parts.push(format(args[i]));
            self.pushLog(parts.join(" "));
            return NULL();
          }
        }
      }
    };

    this.global.vars.Vector3 = {
      t: "namespace",
      props: {
        zero: { t: "vector", x: 0, y: 0, z: 0 },
        one: { t: "vector", x: 1, y: 1, z: 1 },
        up: { t: "vector", x: 0, y: 1, z: 0 },
        right: { t: "vector", x: 1, y: 0, z: 0 },
        forward: { t: "vector", x: 0, y: 0, z: 1 }
      }
    };
    this.global.vars.Vector2 = this.global.vars.Vector3;
  };

  function ReturnSignal(value) { this.value = value; }
  function BreakSignal() {}
  function ContinueSignal() {}

  Runtime.prototype.execMany = function (list, env) {
    for (var i = 0; i < list.length; i++) this.exec(list[i], env);
  };

  Runtime.prototype.exec = function (node, env) {
    if (!node) return;
    this.tick(node.line);
    if (node.type === "block") {
      var inner = new Env(env);
      this.execMany(node.body, inner);
      return;
    }
    if (node.type === "empty") return;
    if (node.type === "expr") { this.eval(node.expr, env); return; }
    if (node.type === "decl") {
      var init = node.init ? this.eval(node.init, env) : null;
      if (init == null) init = defaultValue(node.vtype, node.isArray);
      else if (!node.isArray) init = coerceType(node.vtype, init, node.line);
      env.vars[node.name] = init;
      return;
    }
    if (node.type === "enum") { this.defineEnum(node, env); return; }
    if (node.type === "method") {
      this.declareFunction(env, node);
      return;
    }
    if (node.type === "if") {
      var cond = this.eval(node.test, env);
      if (cond.t !== "bool") throw fail("الشرط لازم يكون true أو false. للمقارنة استخدم == مش =", node.line);
      if (cond.v) this.exec(node.then, env);
      else if (node.els) this.exec(node.els, env);
      return;
    }
    if (node.type === "while") {
      var guard = 0;
      while (true) {
        if (++guard > 5000) throw fail("اللوب مالوش نهاية واضحة.", node.line);
        var c = this.eval(node.test, env);
        if (c.t !== "bool") throw fail("شرط اللوب لازم يكون bool", node.line);
        if (!c.v) break;
        try { this.exec(node.body, env); }
        catch (e) {
          if (e instanceof ContinueSignal) continue;
          if (e instanceof BreakSignal) break;
          throw e;
        }
      }
      return;
    }
    if (node.type === "for") {
      var loop = new Env(env);
      if (node.init) this.exec(node.init, loop);
      var guard2 = 0;
      while (true) {
        if (++guard2 > 5000) throw fail("اللوب مالوش نهاية واضحة.", node.line);
        if (node.test) {
          var ct = this.eval(node.test, loop);
          if (ct.t !== "bool") throw fail("شرط for لازم يكون bool", node.line);
          if (!ct.v) break;
        }
        try { this.exec(node.body, loop); }
        catch (e) {
          if (e instanceof ContinueSignal) { if (node.update) this.eval(node.update, loop); continue; }
          if (e instanceof BreakSignal) break;
          throw e;
        }
        if (node.update) this.eval(node.update, loop);
      }
      return;
    }
    if (node.type === "foreach") {
      var list = this.eval(node.list, env);
      var items = list && (list.t === "array" || list.t === "list") ? list.items : null;
      if (!items) throw fail("foreach بيشتغل على مصفوفة أو List", node.line);
      for (var fi = 0; fi < items.length; fi++) {
        var loopEnv = new Env(env);
        loopEnv.vars[node.name] = items[fi];
        try { this.exec(node.body, loopEnv); }
        catch (e) {
          if (e instanceof ContinueSignal) continue;
          if (e instanceof BreakSignal) break;
          throw e;
        }
      }
      return;
    }
    if (node.type === "switch") {
      var key = this.eval(node.test, env);
      var start = -1;
      var def = -1;
      for (var si = 0; si < node.cases.length; si++) {
        if (node.cases[si].isDefault) def = si;
        else if (start < 0 && valuesEqual(key, this.eval(node.cases[si].value, env))) start = si;
      }
      if (start < 0) start = def;
      if (start < 0) return;
      for (var sj = start; sj < node.cases.length; sj++) {
        try { this.execMany(node.cases[sj].body, env); }
        catch (e) {
          if (e instanceof BreakSignal) return;
          throw e;
        }
      }
      return;
    }
    if (node.type === "return") throw new ReturnSignal(node.value ? this.eval(node.value, env) : NULL());
    if (node.type === "break") throw new BreakSignal();
    if (node.type === "continue") throw new ContinueSignal();
    if (node.type === "class") return;
  };

  Runtime.prototype.defineEnum = function (node, env) {
    var props = Object.create(null);
    for (var i = 0; i < node.members.length; i++) {
      props[node.members[i]] = { t: "enum", enumName: node.name, name: node.members[i], index: i };
    }
    env.vars[node.name] = { t: "namespace", props: props };
  };

  Runtime.prototype.declareFunction = function (env, method) {
    var fn = { t: "fn", name: method.name, params: method.params, body: method.body, env: env, ctor: !!method.ctor };
    var existing = env.hasOwn(method.name) ? env.vars[method.name] : null;
    if (existing && existing.t === "fn") env.vars[method.name] = { t: "overloads", list: [existing, fn] };
    else if (existing && existing.t === "overloads") existing.list.push(fn);
    else env.vars[method.name] = fn;
  };

  Runtime.prototype.eval = function (node, env) {
    this.tick(node.line);
    if (node.type === "literal") {
      if (node.kind === "int") return INT(node.value);
      if (node.kind === "float") return FLOAT(node.value);
      if (node.kind === "string") return STR(node.value);
      if (node.kind === "bool") return BOOL(node.value);
      return NULL();
    }
    if (node.type === "var") return this.readName(env, node.name, node.line);
    if (node.type === "this") {
      if (!env.findHolder("this")) throw fail("this بتستخدم جوه كلاس", node.line);
      return env.get("this", node.line);
    }
    if (node.type === "base") return { t: "base", env: env };
    if (node.type === "array") {
      var items = [];
      for (var i = 0; i < node.items.length; i++) items.push(this.eval(node.items[i], env));
      return { t: "array", items: items };
    }
    if (node.type === "newArray") return this.makeArray(node, env);
    if (node.type === "new") return this.makeNew(node, env);
    if (node.type === "cast") return this.cast(node, env);
    if (node.type === "unary") return this.evalUnary(node, env);
    if (node.type === "binary") return this.evalBinary(node, env);
    if (node.type === "assign") return this.evalAssign(node, env);
    if (node.type === "member") return this.evalMember(node, env);
    if (node.type === "index") return this.evalIndex(node, env);
    if (node.type === "call") return this.evalCall(node, env);
    throw fail("تعبير مش مدعوم في التجربة", node.line);
  };

  Runtime.prototype.readName = function (env, name, line) {
    var val = env.get(name, line);
    if (val && val.t === "prop") return this.readProp(val, env, line);
    return val;
  };

  Runtime.prototype.readProp = function (prop, env, line) {
    if (prop.getter) {
      var local = new Env(env);
      try { this.exec(prop.getter, local); }
      catch (e) {
        if (e instanceof ReturnSignal) return e.value;
        throw e;
      }
      return NULL();
    }
    if (prop.autoGet || prop.backing) return prop.backing;
    throw fail("الخاصية " + prop.name + " ملهاش get", line);
  };

  Runtime.prototype.writeProp = function (prop, value, env, line) {
    value = coerceType(prop.vtype, value, line);
    if (prop.setter) {
      var local = new Env(env);
      local.vars.value = value;
      this.exec(prop.setter, local);
      return value;
    }
    if (prop.autoSet || prop.autoGet) {
      prop.backing = value;
      return value;
    }
    throw fail("الخاصية " + prop.name + " ملهاش set", line);
  };

  Runtime.prototype.assignResolved = function (env, name, value, line) {
    var holder = env.findHolder(name);
    if (!holder) {
      env.vars[name] = value;
      return value;
    }
    var cur = holder.vars[name];
    if (cur && cur.t === "prop") return this.writeProp(cur, value, holder, line);
    if (cur && (cur.t === "int" || cur.t === "float") && isNum(value)) {
      holder.vars[name] = cur.t === "int" ? INT(value.v) : FLOAT(value.v);
      return holder.vars[name];
    }
    if (cur && cur.t === "string" && value.t !== "string") {
      throw fail("متغير string بياخد نص", line);
    }
    holder.vars[name] = value;
    return value;
  };

  Runtime.prototype.memberTarget = function (obj, name, line) {
    var self = this;
    if (obj.t === "vector" && (name === "x" || name === "y" || name === "z")) {
      return {
        get: function () { return FLOAT(obj[name]); },
        set: function (v) {
          if (!isNum(v)) throw fail("محور Vector بياخد رقم", line);
          obj[name] = v.v;
        }
      };
    }
    if (obj.t === "object") {
      return {
        get: function () { return self.readName(obj.env, name, line); },
        set: function (v) { self.assignResolved(obj.env, name, v, line); }
      };
    }
    return null;
  };

  Runtime.prototype.evalAssign = function (node, env) {
    var op = node.op;
    if (node.left.type === "var") {
      if (op === "=") {
        var v = this.eval(node.right, env);
        return this.assignResolved(env, node.left.name, v, node.line);
      }
      var cur = this.readName(env, node.left.name, node.line);
      var next = numOp(op.charAt(0), cur, this.eval(node.right, env), node.line);
      return this.assignResolved(env, node.left.name, next, node.line);
    }
    if (node.left.type === "member") {
      var obj = this.eval(node.left.object, env);
      if (obj.t === "base") throw fail("متقدرش تعيّن على base", node.line);
      var target = this.memberTarget(obj, node.left.name, node.line);
      if (!target) throw fail("متقدرش تعيّن على " + node.left.name, node.line);
      if (op === "=") {
        var rv = this.eval(node.right, env);
        target.set(rv);
        return rv;
      }
      var combined = numOp(op.charAt(0), target.get(), this.eval(node.right, env), node.line);
      target.set(combined);
      return combined;
    }
    if (node.left.type === "index") {
      var arr = this.eval(node.left.object, env);
      var idx = this.eval(node.left.index, env);
      if (!(arr && (arr.t === "array" || arr.t === "list"))) throw fail("الأقواس المربعة دي للمصفوفة أو الـ List", node.line);
      if (!isNum(idx)) throw fail("رقم الخانة لازم يكون رقم", node.line);
      var at = Math.trunc(idx.v);
      if (at < 0 || at >= arr.items.length) throw fail("الخانة " + at + " بره المصفوفة", node.line);
      var value = this.eval(node.right, env);
      if (op !== "=") value = numOp(op.charAt(0), arr.items[at], value, node.line);
      arr.items[at] = value;
      return value;
    }
    throw fail("التعيين ده مش واضح", node.line);
  };

  Runtime.prototype.evalUnary = function (node, env) {
    if (node.op === "!") {
      var v = this.eval(node.expr, env);
      if (v.t !== "bool") throw fail("علامة ! بتستخدم مع bool", node.line);
      return BOOL(!v.v);
    }
    if (node.op === "-") {
      var n = this.eval(node.expr, env);
      if (!isNum(n)) throw fail("علامة السالب بتستخدم مع رقم", node.line);
      return n.t === "int" ? INT(-n.v) : FLOAT(-n.v);
    }
    var delta = node.op === "pre++" || node.op === "post++" ? 1 : -1;
    var tgt = this.incTarget(node.expr, env);
    var old = tgt.get();
    if (!isNum(old)) throw fail("++ و -- للارقام", node.line);
    var updated = old.t === "int" ? INT(old.v + delta) : FLOAT(old.v + delta);
    tgt.set(updated);
    if (node.op === "pre++" || node.op === "pre--") return updated;
    return old;
  };

  Runtime.prototype.incTarget = function (node, env) {
    var self = this;
    if (node.type === "var") {
      return {
        get: function () { return self.readName(env, node.name, node.line); },
        set: function (v) { self.assignResolved(env, node.name, v, node.line); }
      };
    }
    if (node.type === "member") {
      var obj = this.eval(node.object, env);
      var target = this.memberTarget(obj, node.name, node.line);
      if (!target) throw fail("++ مش شغال هنا", node.line);
      return target;
    }
    throw fail("++ و -- بيشتغلوا على متغير", node.line);
  };

  Runtime.prototype.evalBinary = function (node, env) {
    if (node.op === "&&" || node.op === "||") {
      var left = this.eval(node.left, env);
      if (left.t !== "bool") throw fail("&& و || بيستخدموا bool. الشرط يطلع true أو false.", node.line);
      if (node.op === "||" && left.v) return left;
      if (node.op === "&&" && !left.v) return left;
      var right = this.eval(node.right, env);
      if (right.t !== "bool") throw fail("&& و || بيستخدموا bool", node.line);
      return right;
    }
    var a = this.eval(node.left, env);
    var b = this.eval(node.right, env);
    if (node.op === "==") return BOOL(valuesEqual(a, b));
    if (node.op === "!=") return BOOL(!valuesEqual(a, b));
    if (node.op === "<" || node.op === ">" || node.op === "<=" || node.op === ">=") {
      if (!isNum(a) || !isNum(b)) throw fail("المقارنة دي للأرقام", node.line);
      var ok = false;
      if (node.op === "<") ok = a.v < b.v;
      if (node.op === ">") ok = a.v > b.v;
      if (node.op === "<=") ok = a.v <= b.v;
      if (node.op === ">=") ok = a.v >= b.v;
      return BOOL(ok);
    }
    return numOp(node.op, a, b, node.line);
  };

  Runtime.prototype.evalMember = function (node, env) {
    var obj = this.eval(node.object, env);
    if (!obj || obj.t === "null") throw fail("NullReferenceException: بتحاول تستخدم حاجة فاضية. في Unity الرسالة دي بتطلع حمرا في Console.", node.line);
    if (obj.t === "base") {
      var baseFn = obj.env.get("__base__" + node.name, node.line);
      return baseFn;
    }
    if (obj.t === "namespace") {
      if (!obj.props[node.name]) throw fail("مفيش " + node.name + " هنا", node.line);
      return obj.props[node.name];
    }
    if (obj.t === "vector") {
      if (node.name === "x" || node.name === "y" || node.name === "z") return FLOAT(obj[node.name]);
      if (node.name === "magnitude") return FLOAT(Math.sqrt(obj.x * obj.x + obj.y * obj.y + obj.z * obj.z));
      throw fail("Vector ملوش " + node.name, node.line);
    }
    if (obj.t === "string") {
      if (node.name === "Length") return INT(obj.v.length);
      if (node.name === "ToUpper") return { t: "builtin", fn: function () { return STR(obj.v.toUpperCase()); } };
      if (node.name === "ToLower") return { t: "builtin", fn: function () { return STR(obj.v.toLowerCase()); } };
      if (node.name === "Contains") return { t: "builtin", fn: function (args) { return BOOL(obj.v.indexOf(format(args[0])) >= 0); } };
      throw fail("النص ملوش " + node.name + " في التجربة دي", node.line);
    }
    if (obj.t === "array") {
      if (node.name === "Length") return INT(obj.items.length);
      throw fail("المصفوفة ليها Length والخانات [0]", node.line);
    }
    if (obj.t === "list") {
      if (node.name === "Count") return INT(obj.items.length);
      if (node.name === "Add") {
        return {
          t: "builtin",
          fn: function (args) {
            obj.items.push(args[0]);
            return NULL();
          }
        };
      }
      throw fail("الـ List في التجربة بتدعم Add و Count والأقواس []", node.line);
    }
    if (obj.t === "object") return this.readName(obj.env, node.name, node.line);
    throw fail("مش قادر أوصل لـ " + node.name, node.line);
  };

  Runtime.prototype.evalIndex = function (node, env) {
    var arr = this.eval(node.object, env);
    var idx = this.eval(node.index, env);
    if (!(arr && (arr.t === "array" || arr.t === "list"))) throw fail("الأقواس المربعة للمصفوفة أو List", node.line);
    if (!isNum(idx)) throw fail("رقم الخانة لازم يكون رقم", node.line);
    var at = Math.trunc(idx.v);
    if (at < 0 || at >= arr.items.length) throw fail("الخانة " + at + " بره المصفوفة. الطول " + arr.items.length, node.line);
    return arr.items[at];
  };

  Runtime.prototype.evalCall = function (node, env) {
    var callee = this.eval(node.callee, env);
    var args = [];
    for (var i = 0; i < node.args.length; i++) args.push(this.eval(node.args[i], env));
    return this.callValue(callee, args, node.line);
  };

  Runtime.prototype.callValue = function (callee, args, line) {
    if (!callee) throw fail("مش دالة", line);
    if (callee.t === "overloads") {
      var picked = null;
      for (var i = 0; i < callee.list.length; i++) {
        if (callee.list[i].params.length === args.length) picked = callee.list[i];
      }
      if (!picked) throw fail("مفيش نسخة من الدالة بتاخد " + args.length + " مدخلات", line);
      callee = picked;
    }
    if (callee.t === "builtin") return callee.fn(args);
    if (callee.t === "fn") {
      if (++this.depth > 40) throw fail("الدوال نادت بعضها كتير أوي", line);
      var local = new Env(callee.env);
      for (var p = 0; p < callee.params.length; p++) local.vars[callee.params[p]] = args[p] == null ? NULL() : args[p];
      try { this.exec(callee.body, local); }
      catch (e) {
        this.depth--;
        if (e instanceof ReturnSignal) return e.value == null ? NULL() : e.value;
        throw e;
      }
      this.depth--;
      return NULL();
    }
    throw fail("الاسم ده مش دالة تتنده", line);
  };

  Runtime.prototype.cast = function (node, env) {
    var v = this.eval(node.expr, env);
    if (node.vtype === "int") {
      if (v.t === "string") {
        var parsed = parseInt(v.v, 10);
        if (isNaN(parsed)) throw fail("النص ده مش رقم", node.line);
        return INT(parsed);
      }
      if (!isNum(v)) throw fail("تحويل int محتاج رقم", node.line);
      return INT(v.v);
    }
    if (node.vtype === "float" || node.vtype === "double") {
      if (v.t === "string") {
        var pf = parseFloat(v.v);
        if (isNaN(pf)) throw fail("النص ده مش رقم", node.line);
        return FLOAT(pf);
      }
      if (!isNum(v)) throw fail("تحويل float محتاج رقم", node.line);
      return FLOAT(v.v);
    }
    if (node.vtype === "string") return STR(format(v));
    return v;
  };

  Runtime.prototype.makeArray = function (node, env) {
    if (node.init) return this.eval(node.init, env);
    var size = node.size ? this.eval(node.size, env) : INT(0);
    if (!isNum(size)) throw fail("حجم المصفوفة رقم", node.line);
    var n = Math.trunc(size.v);
    if (n < 0 || n > 1000) throw fail("حجم المصفوفة مش منطقي", node.line);
    var fill = node.name === "float" || node.name === "double" ? FLOAT(0) : node.name === "string" ? STR("") : node.name === "bool" ? BOOL(false) : INT(0);
    var items = [];
    for (var i = 0; i < n; i++) items.push(node.name === "int" ? INT(0) : node.name === "float" ? FLOAT(0) : node.name === "string" ? STR("") : node.name === "bool" ? BOOL(false) : fill);
    return { t: "array", items: items };
  };

  Runtime.prototype.makeNew = function (node, env) {
    if (node.name === "Vector3" || node.name === "Vector2") {
      var x = node.args[0] ? this.eval(node.args[0], env) : FLOAT(0);
      var y = node.args[1] ? this.eval(node.args[1], env) : FLOAT(0);
      var z = node.name === "Vector3" && node.args[2] ? this.eval(node.args[2], env) : FLOAT(0);
      return { t: "vector", x: isNum(x) ? x.v : 0, y: isNum(y) ? y.v : 0, z: isNum(z) ? z.v : 0 };
    }
    if (node.name === "List") return { t: "list", items: [] };
    var cls = this.table[node.name];
    if (!cls) throw fail("مش لاقي الكلاس " + node.name, node.line);
    var args = [];
    for (var i = 0; i < node.args.length; i++) args.push(this.eval(node.args[i], env));
    var inst = this.instantiate(cls, args, false);
    return inst;
  };

  Runtime.prototype.instantiate = function (cls, args, scriptMode) {
    var chain = this.chainOf(cls);
    var objEnv = new Env(this.global);
    var inst = { t: "object", className: cls.name, env: objEnv, chain: chain };
    objEnv.vars["this"] = inst;

    var fields = [];
    var props = [];
    var methods = Object.create(null);
    var baseMethods = Object.create(null);
    for (var c = 0; c < chain.length; c++) {
      var cl = chain[c];
      for (var fi = 0; fi < cl.fields.length; fi++) {
        fields = fields.filter(function (f) { return f.name !== cl.fields[fi].name; });
        fields.push(cl.fields[fi]);
      }
      for (var pi = 0; pi < cl.props.length; pi++) {
        props = props.filter(function (p) { return p.name !== cl.props[pi].name; });
        props.push(cl.props[pi]);
      }
      for (var mi = 0; mi < cl.methods.length; mi++) {
        var method = cl.methods[mi];
        if (method.ctor) continue;
        if (methods[method.name]) baseMethods[method.name] = methods[method.name];
        methods[method.name] = method;
      }
    }

    var self = this;
    Object.keys(methods).forEach(function (name) {
      objEnv.vars[name] = { t: "fn", name: name, params: methods[name].params, body: methods[name].body, env: objEnv };
    });
    Object.keys(baseMethods).forEach(function (name) {
      objEnv.vars["__base__" + name] = { t: "fn", name: name, params: baseMethods[name].params, body: baseMethods[name].body, env: objEnv };
    });

    for (var p = 0; p < props.length; p++) {
      var prop = props[p];
      var backing = prop.init ? coerceType(prop.vtype, this.eval(prop.init, objEnv), prop.line) : defaultValue(prop.vtype, prop.isArray);
      objEnv.vars[prop.name] = {
        t: "prop",
        name: prop.name,
        vtype: prop.vtype,
        getter: prop.getter,
        setter: prop.setter,
        autoGet: prop.autoGet,
        autoSet: prop.autoSet,
        backing: backing
      };
    }

    for (var f = 0; f < fields.length; f++) {
      var field = fields[f];
      var value = field.init ? this.eval(field.init, objEnv) : defaultValue(field.vtype, field.isArray);
      if (field.init && !field.isArray) value = coerceType(field.vtype, value, field.line);
      objEnv.vars[field.name] = value;
    }

    var ctor = this.findCtor(chain, args.length);
    if (ctor) this.callValue({ t: "fn", params: ctor.params, body: ctor.body, env: objEnv }, args, ctor.line);
    else if (args.length > 0 && !scriptMode) throw fail("مفيش كونستركتور بياخد " + args.length + " مدخلات", cls.line);

    return inst;
  };

  Runtime.prototype.chainOf = function (cls) {
    var chain = [];
    var seen = Object.create(null);
    var stack = [];
    var cur = cls;
    while (cur && !seen[cur.name]) {
      seen[cur.name] = 1;
      stack.push(cur);
      cur = cur.base ? this.table[cur.base] : null;
    }
    for (var i = stack.length - 1; i >= 0; i--) chain.push(stack[i]);
    return chain;
  };

  Runtime.prototype.findCtor = function (chain, arity) {
    for (var c = chain.length - 1; c >= 0; c--) {
      var methods = chain[c].methods;
      for (var i = 0; i < methods.length; i++) {
        if (methods[i].ctor && methods[i].params.length === arity) return methods[i];
      }
    }
    return null;
  };

  Runtime.prototype.playScript = function (cls) {
    var inst = this.instantiate(cls, [], true);
    var hasAwake = !!inst.env.findHolder("Awake") && inst.env.vars.Awake;
    var hasStart = !!inst.env.findHolder("Start") && inst.env.vars.Start;
    if (inst.env.vars.Awake && inst.env.vars.Awake.t === "fn") this.callValue(inst.env.vars.Awake, [], cls.line);
    if (inst.env.vars.Start && inst.env.vars.Start.t === "fn") this.callValue(inst.env.vars.Start, [], cls.line);
    if (!hasAwake && !hasStart && inst.env.vars.Update && inst.env.vars.Update.t === "fn") {
      this.callValue(inst.env.vars.Update, [], cls.line);
    }
  };

  Runtime.prototype.runStmts = function (stmts) {
    for (var i = 0; i < stmts.length; i++) {
      if (stmts[i].type === "class") this.table[stmts[i].name] = stmts[i];
    }
    var classes = [];
    var rest = [];
    for (var j = 0; j < stmts.length; j++) {
      if (stmts[j].type === "class") classes.push(stmts[j]);
      else rest.push(stmts[j]);
    }
    var executable = [];
    for (var r = 0; r < rest.length; r++) {
      if (rest[r].type === "enum" || rest[r].type === "method") continue;
      if (rest[r].type === "block") executable.push(rest[r]);
      else executable.push(rest[r]);
    }
    var onlyDecls = true;
    for (var e = 0; e < executable.length; e++) {
      if (!(executable[e].type === "enum")) onlyDecls = false;
    }
    if (classes.length && onlyDecls) {
      for (var n = 0; n < rest.length; n++) {
        if (rest[n].type === "enum") this.exec(rest[n], this.global);
      }
      this.playScript(classes[classes.length - 1]);
      return;
    }
    for (var k = 0; k < rest.length; k++) {
      if (rest[k].type === "enum" || rest[k].type === "method") this.exec(rest[k], this.global);
    }
    for (var q = 0; q < rest.length; q++) {
      if (rest[q].type === "enum" || rest[q].type === "method" || rest[q].type === "class") continue;
      this.exec(rest[q], this.global);
    }
  };

  function run(code) {
    var logs = [];
    if (!code || !String(code).trim()) {
      return { ok: false, error: "اكتب كود الأول.", logs: logs };
    }
    var stmts;
    try {
      stmts = new Parser(tokenize(String(code))).parseProgram();
    } catch (e) {
      return { ok: false, error: (e.userMessage || e.message) + (e.line ? " — سطر " + e.line : ""), logs: logs };
    }
    var rt = new Runtime(logs);
    try {
      rt.runStmts(stmts);
    } catch (e) {
      return { ok: false, error: (e.userMessage || e.message || "حصل خطأ") + (e.line ? " — سطر " + e.line : ""), logs: logs };
    }
    if (!logs.length) logs.push({ kind: "muted", text: "الكود خلّص من غير Debug.Log" });
    return { ok: true, error: "", logs: logs };
  }

  return { run: run };
});
