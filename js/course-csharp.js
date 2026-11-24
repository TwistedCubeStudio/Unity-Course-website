window.CSHARP_TRACK = {
  id: "csharp",
  title: "C# لـ Unity",
  short: "C#",
  blurb: "دروس C# متظبطة على سكربتات Unity: Debug.Log، float، و MonoBehaviour.",
  groups: [
    {
      title: "البداية",
      lessons: [
        {
          id: "intro",
          title: "مقدمة: C# جوه Unity",
          w3: "C# Intro",
          minutes: 6,
          goals: ["C# هي لغة السكربت في Unity", "السكريبت بيتعلّق على كائن في المشهد", "السطر اللي هيطبع أول رسالة"],
          blocks: [
            { type: "p", text: "C# هي اللغة اللي بنكتب بيها أوامر اللعبة جوه Unity. أي حركة، نقاط، باب بيتفتح، أو عدو بيموت، بنكتبه في سكريبت C#." },
            { type: "p", text: "السكريبت بيتعلّق على كائن في المشهد. Unity هو اللي بينادي الدوال: Start مرة في البداية، و Update كل فريم. أول رسالة بنشوفها بنكتبها بـ Debug.Log، وتظهر في نافذة Console." },
            { type: "code", title: "مثال", run: true, caption: "حط السكريبت على أي كائن، دوس Play، الرسالة هتظهر في Console.", code: "using UnityEngine;\n\npublic class HelloUnity : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"أهلا بـ Unity\");\n    }\n}\n" },
            { type: "ask", text: "السكريبت لوحده في المجلد هيشتغل، ولا لازم يتعلّق على كائن؟" }
          ],
          quiz: [
            { q: "إيه لغة السكربت اللي بنكتب بيها منطق اللعبة في Unity؟", choices: ["HTML", "C#", "Python", "CSS"], a: 1, why: "Unity بيستخدم C# للسكريبتات اللي بتتعلّق على الكائنات." },
            { q: "أول رسالة في السكريبت بنطبعها بإيه؟", choices: ["Debug.Log", "print.page", "Scene.Write", "Game.Print"], a: 0, why: "Debug.Log بيبعت الرسالة لنافذة Console جوه المحرر." },
            { q: "السكريبت في Unity بيشتغل إزاي؟", choices: ["ملف لوحده من غير مشهد", "لازم يتعلّق على GameObject", "بيتكتب في ملف CSS", "بيشتغل من غير كلاس"], a: 1, why: "Unity بينادي Start و Update لما السكريبت يكون مكوّن على كائن." }
          ]
        },
        {
          id: "syntax",
          title: "شكل السكريبت",
          w3: "C# Syntax",
          minutes: 7,
          goals: ["شكل الكلاس والأقواس", "الفاصلة المنقوطة", "إن الحروف الكبيرة والصغيرة مش زي بعض"],
          blocks: [
            { type: "p", text: "كل سكريبت فيه using عشان نجيب أدوات Unity، وبعدين كلاس عام اسمه نفس اسم الملف، ووراث MonoBehaviour. جوه الكلاس بنحط المتغيرات والدوال." },
            { type: "ul", items: ["القوس { } بيجمع أسطر مع بعض.", "آخر الأمر العادي عليه ;", "score و Score اسمين مختلفين.", "اسم الكلاس لازم يطابق اسم الملف."] },
            { type: "code", title: "مثال", run: true, code: "using UnityEngine;\n\npublic class SyntaxDemo : MonoBehaviour\n{\n    void Start()\n    {\n        int score = 10;\n        Debug.Log(score);\n    }\n}\n" },
            { type: "warn", text: "لو سميت الملف PlayerMove والكلاس جواه PlayerMovement، Unity مش هيشغّل السكريبت. الاسمين لازم يبقوا واحد." }
          ],
          quiz: [
            { q: "إيه لازم في آخر أمر زي int score = 10 ؟", choices: ["نقطة .", "فاصلة منقوطة ;", "علامة استفهام", "قسطتين"], a: 1, why: "الأمر العادي في C# بيخلص بفاصلة منقوطة." },
            { q: "score و Score في C# يعتبروا؟", choices: ["نفس المتغير", "اسمين مختلفين", "تعليق", "نوع بيانات"], a: 1, why: "C# حساسة لحالة الحروف." },
            { q: "اسم الكلاس واسم الملف لازم؟", choices: ["يبقوا مختلفين", "يبقوا متطابقين", "يبقوا بالعربي", "يبقوا من غير حروف"], a: 1, why: "Unity بتربط الملف بالكلاس لما الاسم واحد." }
          ]
        },
        {
          id: "output",
          title: "Debug.Log",
          w3: "C# Output",
          minutes: 6,
          goals: ["نطبع نص ورقم", "نلاقي الرسالة في Console", "نستخدم الطباعة عشان نفهم الكود"],
          blocks: [
            { type: "p", text: "Debug.Log بيبعت الرسالة لنافذة Console. دي أهم أداة وأنت بتتعلم: لو مش عارف الكود وصل فين، اطبع." },
            { type: "code", title: "مثال", run: true, caption: "كل Debug.Log سطر لوحده في Console.", code: "Debug.Log(\"اللاعب ظهر\");\nDebug.Log(100);\n" },
            { type: "note", text: "تقدر تطبع نص ورقم مع بعض بعلامة +: Debug.Log(\"النقاط: \" + 100);" },
            { type: "ask", text: "لو Play شغال ومفيش ولا رسالة، إيه أول حاجة تدوروا عليها؟" }
          ],
          quiz: [
            { q: "Debug.Log بيظهر فين؟", choices: ["في نافذة Scene", "في نافذة Console", "في ملف خارجي بس", "على اللاعب نفسه"], a: 1, why: "Console هي نافذة رسائل التشغيل." },
            { q: "أنهي سطر يطبع رقم؟", choices: ["Debug.Log(50);", "Log.Debug;", "print 50", "Console(50)"], a: 0, why: "المناداة الصح Debug.Log وبعديها قوسين." },
            { q: "ليه بنطبع وأحنا بنكتب لعبة؟", choices: ["عشان نلون المشهد", "عشان نتأكد إن الكود وصل للقيمة الصح", "عشان نمسح الكائن", "عشان نعمل Prefab"], a: 1, why: "الطباعة بتوريك قيمة المتغير لحظة التنفيذ." }
          ]
        },
        {
          id: "comments",
          title: "التعليقات",
          w3: "C# Comments",
          minutes: 5,
          goals: ["تعليق سطر بـ //", "تعليق أكتر من سطر", "إن التعليق مش بيتنفذ"],
          blocks: [
            { type: "p", text: "التعليق ملاحظة للإنسان. الكمبيوتر بيتخطاه. نستخدمه عشان نشرح ليه السرعة ٦ مش عشان نعيد كتابة الكود بكلمات." },
            { type: "code", title: "مثال", run: true, caption: "السطر اللي عليه // مش هيطبع.", code: "int lives = 3; // محاولات اللاعب\n// Debug.Log(\"مش هيظهر\");\nDebug.Log(lives);\n" },
            { type: "p", text: "لو عايز تقفل أكتر من سطر مؤقتًا، حطهم بين /* و */. متسيبش تعليق مفتوح من غير قفل." },
            { type: "warn", text: "متكتبوش الباسورد أو أي سر في تعليق جوه مشروع هيتبعت لحد." }
          ],
          quiz: [
            { q: "إزاي نعمل تعليق لسطر واحد؟", choices: ["##", "//", "<!--", "**"], a: 1, why: "سطر التعليق في C# بيبدأ بـ //." },
            { q: "التعليق بيتنفذ؟", choices: ["أيوه كل فريم", "لأ، بيتتجاهل", "بس في Play", "بس لو public"], a: 1, why: "التعليق مكتوب للبشر ومش جزء من الأوامر." },
            { q: "إزاي نعلّق أكتر من سطر؟", choices: ["بين /* و */", "بين () ", "بنحط # في الأول بس", "بنمسح الأقواس"], a: 0, why: "بلوك التعليق يبدأ بـ /* ويخلص بـ */." }
          ]
        },
        {
          id: "variables",
          title: "المتغيرات",
          w3: "C# Variables",
          minutes: 8,
          goals: ["المتغير صندوق له اسم ونوع", "نغيّر قيمته", "public يظهر في Inspector"],
          blocks: [
            { type: "p", text: "المتغير مكان بنخزن فيه قيمة وبنرجعله بالاسم. العملات، الصحة، والسرعة كلها متغيرات. النوع بيتقال أول مرة، وبعد كده نستخدم الاسم بس." },
            { type: "code", title: "مثال", run: true, code: "int coins = 0;\ncoins = coins + 1;\nDebug.Log(coins);\n" },
            { type: "p", text: "لو كتبنا المتغير public جوه الكلاس، Unity بيظهره في الـ Inspector. المدرس يغيّر الرقم من غير ما يفتح الكود، وده اللي هيحصل مع سرعة اللاعب في أول لعبة." },
            { type: "code", title: "متغير يظهر في Inspector", run: true, code: "using UnityEngine;\n\npublic class CoinCount : MonoBehaviour\n{\n    public int coins = 0;\n\n    void Start()\n    {\n        coins = coins + 1;\n        Debug.Log(coins);\n    }\n}\n" },
            { type: "ask", text: "لو غيّرنا coins من الـ Inspector لـ ١٠، وبعدين Start زود واحد، هيطبع كام؟" }
          ],
          quiz: [
            { q: "المتغير هو؟", choices: ["نافذة في Unity", "مكان له اسم بنخزن فيه قيمة", "نوع من الكاميرا", "تعليق"], a: 1, why: "بنحط القيمة ونرجع نقراها أو نغيرها بالاسم." },
            { q: "أنهي تعريف صح؟", choices: ["coins int = 0;", "int coins = 0;", "int = coins 0;", "variable coins"], a: 1, why: "النوع الأول، وبعديه الاسم، وبعديه القيمة." },
            { q: "إمتى المتغير يظهر في Inspector؟", choices: ["لو اسمه قصير", "لو public أو عليه SerializeField", "لو جوه تعليق", "لو نوعه string بس"], a: 1, why: "Unity بيعرض الحقول المكشوفة للمصمم في المفتش." }
          ]
        },
        {
          id: "types",
          title: "أنواع البيانات",
          w3: "C# Data Types",
          minutes: 8,
          goals: ["int و float و string و bool", "ليه Unity بيفضل float", "حرف f بعد الرقم العشري"],
          blocks: [
            { type: "p", text: "النوع بيقول للصندوق يحط إيه جواه. اختيار النوع الغلط بيوقّف اللعبة أو بيقرّب الرقم غلط." },
            { type: "table", heads: ["النوع", "بيخزن", "مثال من اللعبة"], rows: [["int", "رقم صحيح", "عدد العملات"], ["float", "رقم عشري", "سرعة اللاعب"], ["string", "نص", "اسم اللاعب"], ["bool", "صح أو غلط", "هل اللاعب على الأرض؟"]] },
            { type: "code", title: "مثال", run: true, code: "int level = 1;\nfloat speed = 5.5f;\nstring playerName = \"Hero\";\nbool isGrounded = true;\nDebug.Log(level);\nDebug.Log(speed);\nDebug.Log(playerName);\nDebug.Log(isGrounded);\n" },
            { type: "warn", text: "5.5 من غير f معناها double. متغير float في Unity محتاج 5.5f. من غيرها السكريبت مش هيتعمل له Compile." },
            { type: "note", text: "Debug.Log مع bool بيطبع True أو False بحرف كبير، زي C#." }
          ],
          quiz: [
            { q: "سرعة اللاعب 6.5 تتخزن في نوع إيه؟", choices: ["int", "float", "bool", "string"], a: 1, why: "الرقم العشري في Unity نسيبه float ونحط f." },
            { q: "عدد العملات الصحيحة نوعه؟", choices: ["string", "float", "int", "bool"], a: 2, why: "int للأرقام الصحيحة من غير كسور." },
            { q: "isGrounded المناسب له يكون؟", choices: ["bool", "int", "string", "Vector3"], a: 0, why: "السؤال اللي إجابته صح أو غلط نوعه bool." }
          ]
        },
        {
          id: "casting",
          title: "تحويل الأنواع",
          w3: "C# Type Casting",
          minutes: 7,
          goals: ["نحوّل float لـ int", "القسمة الصحيحة بتقص الكسر", "نفرق بين 5/2 و 5f/2f"],
          blocks: [
            { type: "p", text: "أحيانًا الحساب يطلع عشري وإنت عايز تعرض رقم صحيح، زي ضرر متقرب. التحويل (int) بيقطع الكسر، مش بيقرب." },
            { type: "code", title: "مثال", run: true, code: "float damage = 9.8f;\nint shown = (int)damage;\nDebug.Log(shown);\nDebug.Log(5 / 2);\nDebug.Log(5f / 2f);\n" },
            { type: "note", text: "9.8 بعد (int) تبقى 9 مش 10. لو عايز تقريب استخدم Mathf.RoundToInt في درس الرياضيات." },
            { type: "warn", text: "int مقسوم على int بيقطع الكسر. 5 / 2 تساوي 2. لو عايز 2.5 خلي واحد منهم float." },
            { type: "ask", text: "لو الصحة 3.9 وعملنا (int)، اللاعب هيشوف كام؟" }
          ],
          quiz: [
            { q: "(int)3.9 يساوي؟", choices: ["4", "3", "3.9", "0"], a: 1, why: "التحويل لـ int بيقطع الكسر ومش بيقرب." },
            { q: "5 / 2 والنوعين int يساوي؟", choices: ["2.5", "2", "3", "5"], a: 1, why: "قسمة الأعداد الصحيحة بتتجاهل الكسر." },
            { q: "إزاي القسمة تطلع 2.5؟", choices: ["5 / 2", "5f / 2f", "(int)5 / 2", "5 % 2"], a: 1, why: "وجود float في القسمة بيخلي الناتج عشري." }
          ]
        },
        {
          id: "operators",
          title: "المعاملات",
          w3: "C# Operators",
          minutes: 8,
          goals: ["حساب + - * / %", "مقارنة == و >", "الفرق بين = و =="],
          blocks: [
            { type: "p", text: "= بتحط قيمة. == بتسأل هل الاتنين زي بعض. الغلط بين الاتنين من أشهر أخطاء أول شهر." },
            { type: "table", heads: ["الرمز", "معناه", "مثال"], rows: [["=", "تعيين", "health = 100"], ["==", "يساوي؟", "health == 0"], ["!=", "مش يساوي؟", "tag != \"\" "], ["% ", "باقي القسمة", "7 % 3 يساوي 1"], ["&&", "و", "له مفتاح والباب مقفول"], ["||", "أو", "لمس أرض أو مية"]] },
            { type: "code", title: "مثال", run: true, code: "int a = 10;\nint b = 3;\nDebug.Log(a + b);\nDebug.Log(a % b);\nDebug.Log(a > b);\n" },
            { type: "ask", text: "7 % 3 بتطلع كام، وإمتى الباقي يفيدنا في لعبة؟" }
          ],
          quiz: [
            { q: "أنهي رمز بيقارن إن قيمتين متساويين؟", choices: ["=", "==", "=>", "%"], a: 1, why: "== سؤال. = تعيين قيمة." },
            { q: "7 % 3 يساوي؟", choices: ["2", "1", "3", "21"], a: 1, why: "٧ فيها ٢×٣ والباقي ١." },
            { q: "&& معناها؟", choices: ["أو", "و", "عكس", "قسمة"], a: 1, why: "الشرطين لازم يبقوا صح مع &&." }
          ]
        },
        {
          id: "math",
          title: "الرياضيات و Mathf",
          w3: "C# Math",
          minutes: 7,
          goals: ["Mathf أداة الأرقام في Unity", "Clamp عشان السرعة متطلعش بره حد", "التقريب RoundToInt"],
          blocks: [
            { type: "p", text: "Mathf هي أداة الأرقام العشرية في Unity. هنستخدمها كتير مع السرعة والمسافة عشان الرقم يفضل جوه الحد اللي احنا عايزينه." },
            { type: "code", title: "مثال", run: true, caption: "Clamp بيمنع الرقم يعدّي الحد. 25 اتقصت لـ 12.", code: "float speed = Mathf.Clamp(25f, 0f, 12f);\nDebug.Log(speed);\nDebug.Log(Mathf.RoundToInt(3.6f));\nDebug.Log(Mathf.Abs(-8));\n" },
            { type: "ul", items: ["Clamp(value, min, max) يحبس الرقم بين حدين.", "Max و Min يختاروا الأكبر أو الأصغر.", "Abs يشيل السالب.", "RoundToInt يقرّب لأقرب عدد صحيح."] },
            { type: "note", text: "متستخدمش السرعة السالبة بالغلط. Clamp من صفر للحد الأقصى بيحمي التصميم." }
          ],
          quiz: [
            { q: "أداة الرياضيات الشائعة في Unity اسمها؟", choices: ["Mathf", "UnityMath", "Calc", "Number"], a: 0, why: "Mathf فيها دوال زي Clamp و Max جاهزة للـ float." },
            { q: "Mathf.Clamp(25f, 0f, 12f) يساوي؟", choices: ["25", "0", "12", "13"], a: 2, why: "25 أكبر من الحد الأقصى فالناتج 12." },
            { q: "Mathf.Abs(-8) يساوي؟", choices: ["-8", "8", "0", "16"], a: 1, why: "Abs بترجع القيمة من غير إشارة." }
          ]
        },
        {
          id: "strings",
          title: "النصوص",
          w3: "C# Strings",
          minutes: 7,
          goals: ["النص بين علامتي تنصيص", "نجمع نص ورقم بـ +", "Length بتعد الحروف"],
          blocks: [
            { type: "p", text: "string للنص: اسم اللاعب، رسالة الفوز، أو الكلام اللي على الشاشة. النص دايمًا بين \" \"." },
            { type: "code", title: "مثال", run: true, code: "string player = \"Mona\";\nDebug.Log(\"Player: \" + player);\nDebug.Log(player.Length);\nDebug.Log(player.ToUpper());\n" },
            { type: "warn", text: "خط TextMeshPro الافتراضي مش بيدعم العربي. في أول لعبة هنكتب Score بالإنجليزي عشان يظهر عند كل الطلبة. العربي على الشاشة محتاج خط فيه حروف عربية." },
            { type: "note", text: "string s = 5; غلط. إما النص يكون بين تنصيص، أو نجمعه: \"Score: \" + 5." }
          ],
          quiz: [
            { q: "أنهي سطر صح؟", choices: ["string name = Mona;", "string name = \"Mona\";", "string name = 'Mona';", "text name = Mona"], a: 1, why: "النص في string بين علامتي تنصيص مزدوجة." },
            { q: "\"Hi \" + \"Ali\" يساوي؟", choices: ["HiAli من غير مسافة في النص ده", "Hi Ali", "Hi + Ali", "خطأ"], a: 1, why: "المسافة مكتوبة جوه النص الأول قبل القفلة." },
            { q: "Length بترجع؟", choices: ["عدد الحروف", "أول حرف بس", "نوع المتغير", "لون النص"], a: 0, why: "Length خاصية فيها طول النص." }
          ]
        },
        {
          id: "booleans",
          title: "الصح والغلط",
          w3: "C# Booleans",
          minutes: 6,
          goals: ["true و false", "نسأل bool جوه if", "نجمع شرطين بـ &&"],
          blocks: [
            { type: "p", text: "bool مالوش غير قيمتين: true أو false. بنستخدمه لحالة: معاه مفتاح؟ اللعبة خلصت؟ اللاعب بيجري؟" },
            { type: "code", title: "مثال", run: true, code: "bool hasKey = true;\nbool doorLocked = true;\nif (hasKey && doorLocked)\n{\n    Debug.Log(\"الباب اتفتح\");\n}\n" },
            { type: "p", text: "علامة ! بتعكس القيمة. !hasKey معناها معاهوش مفتاح. الشرط جوه if لازم يطلع bool، مش رقم." },
            { type: "ask", text: "لو hasKey بقى false، الرسالة هتظهر؟" }
          ],
          quiz: [
            { q: "قيم bool هما؟", choices: ["0 و 1 بس كأنواع", "true و false", "yes و no", "on و start"], a: 1, why: "الكلمتين المحجوزتين true و false." },
            { q: "!true يساوي؟", choices: ["true", "false", "null", "1"], a: 1, why: "علامة التعجب بتعكس البوليان." },
            { q: "if بيقبل شرط من نوع؟", choices: ["string", "bool", "أي رقم", "Vector3"], a: 1, why: "الشرط لازم يطلع صح أو غلط." }
          ]
        }
      ]
    },
    {
      title: "القرارات والتكرار",
      lessons: [
        {
          id: "ifelse",
          title: "if و else",
          w3: "C# If...Else",
          minutes: 8,
          goals: ["نختار طريق حسب شرط", "else if لأكتر من حالة", "نستخدمها مع صحة اللاعب"],
          blocks: [
            { type: "p", text: "if بتشغّل كود لو الشرط صح. else لو الشرط غلط. else if بتسأل سؤال تاني قبل الـ else الأخير." },
            { type: "code", title: "مثال", run: true, caption: "غيّر health لـ 0 أو 80 وشغّل من زر جرّب بنفسك.", code: "int health = 20;\nif (health <= 0)\n{\n    Debug.Log(\"Game Over\");\n}\nelse if (health < 30)\n{\n    Debug.Log(\"Low Health\");\n}\nelse\n{\n    Debug.Log(\"OK\");\n}\n" },
            { type: "warn", text: "متكتبش ; بعد if (health <= 0) مباشرة. الفاصلة المنقوطة دي بتقفل الشرط من غير ما تنفّذ اللي تحته بالطريقة اللي متخيلاها." },
            { type: "ask", text: "لو health = 30، أنهي رسالة هتطلع؟ خدوا بالكم من علامة < ." }
          ],
          quiz: [
            { q: "else بتتنفّذ إمتى؟", choices: ["دايمًا", "لو شرط if طلّع false", "كل فريم", "لو في تعليق"], a: 1, why: "else هو الطريق التاني لما الشرط مش متحقق." },
            { q: "لو health = 20 والكود فوق، الرسالة؟", choices: ["Game Over", "Low Health", "OK", "مفيش طباعة"], a: 1, why: "20 مش أقل من أو يساوي صفر، لكنها أقل من 30." },
            { q: "else if بنستخدمها عشان؟", choices: ["نمسح متغير", "نفحص حالة إضافية بين if و else", "نعمل لوب", "نطبع تعليق"], a: 1, why: "بتدي فرع تاني بشرط جديد." }
          ]
        },
        {
          id: "switch",
          title: "switch",
          w3: "C# Switch",
          minutes: 7,
          goals: ["نختار من قيم معروفة", "case و break", "default للحالة غير المتوقعة"],
          blocks: [
            { type: "p", text: "لو بتختار بين أسلحة أو حالات ليها أرقام ثابتة، switch أوضح من سلسلة else if طويلة. كل case لازم يخلّص بـ break عشان التنفيذ ميكملش على اللي بعده." },
            { type: "code", title: "مثال", run: true, code: "int weapon = 2;\nswitch (weapon)\n{\n    case 1:\n        Debug.Log(\"Sword\");\n        break;\n    case 2:\n        Debug.Log(\"Bow\");\n        break;\n    default:\n        Debug.Log(\"Hands\");\n        break;\n}\n" },
            { type: "note", text: "في درس enum هنستبدل الرقم 1 و 2 بأسماء أوضح زي Sword و Bow." }
          ],
          quiz: [
            { q: "break جوه case بتعمل إيه؟", choices: ["بتقفل اللعبة", "بتخرج من switch", "بتبدأ اللوب من الأول", "بتطبع default"], a: 1, why: "من غيرها التنفيذ ينزل على الـ case اللي بعده." },
            { q: "default بتتنفّذ إمتى؟", choices: ["دايمًا الأول", "لو مفيش case مطابق", "لو في تعليق", "مع كل case"], a: 1, why: "دي الحالة الاحتياطية." },
            { q: "weapon = 2 في المثال يطبع؟", choices: ["Sword", "Bow", "Hands", "2"], a: 1, why: "case 2 مطبوع Bow." }
          ]
        },
        {
          id: "while",
          title: "while",
          w3: "C# While Loop",
          minutes: 7,
          goals: ["نكرر طالما الشرط صح", "نغيّر حاجة جوه اللوب عشان يخلّص", "نميز اللوب المفتوح"],
          blocks: [
            { type: "p", text: "while بتفضل تنفّذ الكود طالما الشرط true. لازم جوه اللوب حاجة تقرّب الشرط من النهاية، زي ما الذخيرة بتقل مع كل ضربة." },
            { type: "code", title: "مثال", run: true, code: "int ammo = 3;\nwhile (ammo > 0)\n{\n    Debug.Log(\"Shot\");\n    ammo--;\n}\nDebug.Log(\"Empty\");\n" },
            { type: "warn", text: "while (true) من غير break لوب مالوش نهاية. في التجربة الموقع هيوقف التنفيذ. في Unity اللعبة هتجمد." },
            { type: "ask", text: "لو نسينا ammo-- ، إيه اللي هيحصل؟" }
          ],
          quiz: [
            { q: "while بتكرر طالما؟", choices: ["الشرط false", "الشرط true", "مرة واحدة بس", "عدد الأسطر"], a: 1, why: "بتفضل داخلة مادام الشرط متحقق." },
            { q: "ammo-- معناها؟", choices: ["تزود واحد", "تنقص واحد", "تصفر الذخيرة مرة واحدة بس ككلمة", "تطبع ammo"], a: 1, why: "علامة -- بتنقص واحد من المتغير." },
            { q: "المثال فوق هيطبع Shot كام مرة؟", choices: ["مرة", "3", "4", "مالهاش نهاية"], a: 1, why: "الذخيرة 3 وبتقل لحد ما توصل صفر." }
          ]
        },
        {
          id: "forloop",
          title: "for",
          w3: "C# For Loop",
          minutes: 7,
          goals: ["نكرر عدد معروف", "نقرأ أجزاء for الثلاثة", "نرقّم عملات أو أعداء"],
          blocks: [
            { type: "p", text: "for لما نعرف هنكرر كام مرة. جوه القوسين تلات حاجات: بداية العداد، شرط الاستمرار، وتحديث العداد." },
            { type: "code", title: "مثال", run: true, caption: "العداد بيبدأ من صفر. أربعة عملات أرقامها 0 1 2 3.", code: "for (int i = 0; i < 4; i++)\n{\n    Debug.Log(\"Coin \" + i);\n}\n" },
            { type: "ul", items: ["int i = 0 مرة واحدة في الأول.", "i < 4 بتتفحص قبل كل لفة.", "i++ بتتنفّذ بعد كل لفة."] },
            { type: "note", text: "في المصفوفات العداد بيبدأ من 0 لأن أول خانة رقمها 0." }
          ],
          quiz: [
            { q: "for (int i = 0; i < 4; i++) هتلف كام مرة؟", choices: ["3", "4", "5", "0"], a: 1, why: "i قيمها 0 و 1 و 2 و 3." },
            { q: "i++ بتحصل إمتى؟", choices: ["قبل ما اللوب يبدأ خالص ومرة واحدة", "بعد كل لفة", "بدل الشرط", "جوه التعليق"], a: 1, why: "ده جزء التحديث في آخر كل دورة." },
            { q: "ليه بنبدأ i من 0 كتير؟", choices: ["عشان أول خانة في المصفوفة رقمها 0", "عشان 0 أسرع في الرسم", "عشان Inspector", "عشان التعليق"], a: 0, why: "الفهارس في C# بتبدأ من صفر." }
          ]
        },
        {
          id: "break",
          title: "break و continue",
          w3: "C# Break and Continue",
          minutes: 6,
          goals: ["break تخرج من اللوب", "continue تتخطى اللفة دي", "نستخدمهم بحساب"],
          blocks: [
            { type: "p", text: "continue بتقول: سيبي اللفة دي وكمّلي اللي بعدها. break بتقول: اخرجي من اللوب كله." },
            { type: "code", title: "مثال", run: true, caption: "3 هتتقصى، و 5 هتوقف اللوب قبل الطباعة.", code: "for (int i = 1; i <= 5; i++)\n{\n    if (i == 3) continue;\n    if (i == 5) break;\n    Debug.Log(i);\n}\n" },
            { type: "ask", text: "إيه الأرقام اللي هتتطبع؟ قولوها قبل ما تبصوا على Console." }
          ],
          quiz: [
            { q: "continue بتعمل إيه؟", choices: ["بتقفل Unity", "بتتخطى باقي اللفة الحالية", "بتعيد تشغيل الكمبيوتر", "بتمسح المصفوفة"], a: 1, why: "بتقفز لتحديث العداد واللفة الجاية." },
            { q: "break في لوب بتعمل إيه؟", choices: ["بتخرج من اللوب", "بتطبع i", "بتكمل كل اللفات", "بتعمل case"], a: 0, why: "تنفيذ اللوب يقف عند break." },
            { q: "المثال يطبع؟", choices: ["1 2 3 4 5", "1 2 4", "3 5", "1 2 4 5"], a: 1, why: "3 اتقصت بـ continue، و 5 وقفت اللوب قبل Debug.Log." }
          ]
        }
      ]
    },
    {
      title: "الدوال والبيانات",
      lessons: [
        {
          id: "arrays",
          title: "المصفوفات",
          w3: "C# Arrays",
          minutes: 8,
          goals: ["نخزن أكتر من قيمة في اسم واحد", "الفهرس يبدأ من 0", "Length فيها العدد"],
          blocks: [
            { type: "p", text: "المصفوفة صف خانات من نفس النوع. تنفع لثلاث نقط ضعف، أو أماكن ظهور الأعداء. طولها بيتحدد وما بيتغيرش بعد كده. لو عايز تضيف وتمسح، الدرس الجاي List." },
            { type: "code", title: "مثال", run: true, code: "int[] scores = { 10, 40, 25 };\nDebug.Log(scores[1]);\nscores[1] = 50;\nDebug.Log(scores[1]);\nDebug.Log(scores.Length);\n" },
            { type: "warn", text: "scores[3] في مصفوفة طولها 3 خطأ، لأن الخانات 0 و 1 و 2 بس. في Unity الخطأ IndexOutOfRangeException." },
            { type: "p", text: "foreach بتعدي على كل خانة من غير ما تكتب الفهرس:" },
            { type: "code", title: "foreach", run: true, code: "int[] scores = { 10, 40, 25 };\nforeach (int score in scores)\n{\n    Debug.Log(score);\n}\n" }
          ],
          quiz: [
            { q: "أول خانة في المصفوفة رقمها؟", choices: ["0", "1", "Length", "-1"], a: 0, why: "الفهارس بتبدأ من صفر." },
            { q: "scores = {10, 40, 25} فـ scores[1] يساوي؟", choices: ["10", "40", "25", "3"], a: 1, why: "0 هي 10، و 1 هي 40." },
            { q: "Length بترجع؟", choices: ["آخر قيمة", "عدد الخانات", "اسم المصفوفة", "نوعها"], a: 1, why: "Length فيها حجم المصفوفة." }
          ]
        },
        {
          id: "lists",
          title: "List",
          w3: "C# Lists",
          minutes: 8,
          goals: ["List طولها مرن", "Add و Count", "السطر using بتاعها"],
          blocks: [
            { type: "p", text: "المصفوفة طولها ثابت. في Unity هنضيف ونمسح عملات وأعداء طول وقت اللعب، فـ List أنسب. محتاجة سطر using System.Collections.Generic;" },
            { type: "code", title: "مثال يشتغل هنا", run: true, code: "List<string> bag = new List<string>();\nbag.Add(\"Potion\");\nbag.Add(\"Key\");\nDebug.Log(bag.Count);\nDebug.Log(bag[0]);\n" },
            { type: "code", title: "شكله في ملف Unity", caption: "انسخوه في سكريبت. التجربة فوق من غير using لأن المحاكي مش محتاج السطر ده.", code: "using System.Collections.Generic;\nusing UnityEngine;\n\npublic class Inventory : MonoBehaviour\n{\n    public List<string> bag = new List<string>();\n\n    void Start()\n    {\n        bag.Add(\"Potion\");\n        Debug.Log(bag.Count);\n    }\n}\n" },
            { type: "note", text: "Count في List زي Length في المصفوفة، بس الاسم Count." }
          ],
          quiz: [
            { q: "فرق List عن المصفوفة؟", choices: ["List متقدرش تضيف عليها", "List تقدر تضيف وتمسح", "List للأرقام بس", "List مش موجودة في Unity"], a: 1, why: "Add بتزوّد عنصر والطول بيكبر." },
            { q: "سطر using بتاع List؟", choices: ["using UnityEngine.UI;", "using System.Collections.Generic;", "using System.Math;", "using Unity.List;"], a: 1, why: "List موجودة في System.Collections.Generic." },
            { q: "عدد عناصر List نقرأه من؟", choices: ["Length", "Count", "Size()", "Number"], a: 1, why: "الخاصية اسمها Count." }
          ]
        },
        {
          id: "methods",
          title: "الدوال",
          w3: "C# Methods",
          minutes: 8,
          goals: ["الدالة مجموعة أوامر باسم", "void معناها مفيش راجع", "Start و Update دول دوال Unity بيناديها"],
          blocks: [
            { type: "p", text: "الدالة بتلم أوامر بنعيد استخدامها. بدل ما نكتب نفس حساب الضرر في تلات حتت، نكتب دالة ونناديها." },
            { type: "code", title: "مثال", run: true, code: "void SayReady()\n{\n    Debug.Log(\"Ready\");\n}\n\nSayReady();\nSayReady();\n" },
            { type: "p", text: "void يعني الدالة مش بترجّع قيمة. Start و Update مكتوبين void لأن Unity بيناديهم ومش مستني منهم رقم. لو الدالة بتحسب وترجّع، نكتب النوع بدل void ونحط return." },
            { type: "ask", text: "ليه SayReady اتكتبت مرة واتنفذت مرتين؟" }
          ],
          quiz: [
            { q: "void معناها؟", choices: ["الدالة بترجّع int", "الدالة مش بترجّع قيمة", "الدالة تعليق", "الدالة مصفوفة"], a: 1, why: "void يعني مفيش return لقيمة." },
            { q: "إزاي ننادي دالة اسمها SayReady؟", choices: ["call SayReady", "SayReady();", "new SayReady", "void SayReady"], a: 1, why: "الاسم وبعديه قوسين وفاصلة منقوطة." },
            { q: "Start في Unity؟", choices: ["متغير", "دالة Unity بيناديها مرة قبل اللعب", "نافذة", "نوع بيانات"], a: 1, why: "Start دالة بتتنفّذ مرة في بداية تشغيل الكائن." }
          ]
        },
        {
          id: "parameters",
          title: "مدخلات الدالة والقيمة الراجعة",
          w3: "C# Parameters",
          minutes: 8,
          goals: ["نبعت أرقام للدالة", "return ترجّع الناتج", "نستخدم الناتج في متغير"],
          blocks: [
            { type: "p", text: "المدخلات هي القيم اللي الدالة بتستقبلها بين القوسين. return بتطلّع الناتج للي ناداها. النوع المكتوب قبل اسم الدالة هو نوع الناتج." },
            { type: "code", title: "مثال", run: true, code: "int TakeDamage(int health, int amount)\n{\n    return health - amount;\n}\n\nint left = TakeDamage(100, 30);\nDebug.Log(left);\n" },
            { type: "note", text: "الأسماء health و amount جوه الدالة مش لازم تبقى نفس أسماء المتغيرات بره. المهم الترتيب والنوع." },
            { type: "ask", text: "TakeDamage(100, 30) بترجّع كام؟" }
          ],
          quiz: [
            { q: "return بتعمل إيه؟", choices: ["بتطبع في Scene", "بترجّع قيمة للي نادى الدالة", "بتقفل Unity", "بتعمل لوب"], a: 1, why: "القيمة بعد return هي ناتج الدالة." },
            { q: "TakeDamage(80, 15) تساوي؟", choices: ["95", "65", "15", "80"], a: 1, why: "80 - 15 = 65." },
            { q: "int قبل اسم الدالة يعني؟", choices: ["الناتج رقم صحيح", "الدالة void", "المدخل نص", "الدالة private"], a: 0, why: "نوع الإرجاع بيتكتب قبل الاسم." }
          ]
        },
        {
          id: "overloading",
          title: "نفس الاسم بمدخلات مختلفة",
          w3: "C# Method Overloading",
          minutes: 6,
          goals: ["أكتر من دالة بنفس الاسم", "الفرق في عدد المدخلات أو أنواعها", "Unity تختار النسخة المناسبة"],
          blocks: [
            { type: "p", text: "نقدر نكتب نفس اسم الدالة أكتر من مرة لو المدخلات مختلفة. وقت النداء، C# تشوف أنت باعت كام قيمة وتختار النسخة." },
            { type: "code", title: "مثال", run: true, code: "int Add(int a, int b)\n{\n    return a + b;\n}\n\nint Add(int a, int b, int c)\n{\n    return a + b + c;\n}\n\nDebug.Log(Add(2, 5));\nDebug.Log(Add(2, 5, 1));\n" },
            { type: "note", text: "Debug.Log نفسها عاملة كده: تقدر تبعت لها نص أو رقم، وهي نسخ كتير من نفس الاسم." }
          ],
          quiz: [
            { q: "Overloading يعني؟", choices: ["مسح الدالة", "نفس الاسم بنسخ مدخلات مختلفة", "تعليق طويل", "تحويل int لـ string"], a: 1, why: "الاسم واحد والبصمة مختلفة." },
            { q: "Add(2, 5) هتختار أنهي نسخة؟", choices: ["اللي بتاخد ٣ مدخلات", "اللي بتاخد مدخلين", "الاتنين", "ولا واحدة"], a: 1, why: "عدد القيم المبعتة ٢." },
            { q: "نقدر نعمل نسختين بنفس الاسم ونفس المدخلات بالظبط؟", choices: ["أيوه", "لأ، C# مش هتعرف تفرق", "بس في Update", "بس لو public"], a: 1, why: "لازم يكون في فرق في المدخلات." }
          ]
        }
      ]
    },
    {
      title: "الكائنات",
      lessons: [
        {
          id: "oop",
          title: "فكرة الكائن",
          w3: "C# OOP",
          minutes: 8,
          goals: ["الكلاس قالب", "الكائن نسخة من القالب", "البيانات والدوال يعيشوا مع بعض"],
          blocks: [
            { type: "p", text: "البرمجة بالكائنات يعني: العدو مش بس رقم صحة سايب. العدو كائن فيه صحته ودالة الضرب مع بعض. الكلاس هو الرسم، و new بتعمل نسخة حقيقية." },
            { type: "code", title: "مثال", run: true, code: "public class Enemy\n{\n    public int health = 30;\n\n    public void Hit(int amount)\n    {\n        health = health - amount;\n    }\n}\n\nEnemy goblin = new Enemy();\ngoblin.Hit(10);\nDebug.Log(goblin.health);\n" },
            { type: "p", text: "goblin نسخة. نقدر نعمل goblin تاني من غير ما الأول يتغير. في Unity، كل كائن في Hierarchy عليه سكريبت هو برضه نسخة من الكلاس، و Unity بتعمل النسخة لما المشهد يشتغل. مش دايمًا هنكتب new لإسكريبت MonoBehaviour بإيدينا." },
            { type: "ask", text: "لو عملنا Enemy تاني ومناديناش Hit، صحته هتبقى كام؟" }
          ],
          quiz: [
            { q: "الكلاس هو؟", choices: ["نسخة واحدة بس في اللعبة", "قالب نعمل منه كائنات", "نافذة Console", "نوع float"], a: 1, why: "الكلاس يوصف الشكل، والكائن نسخة منه." },
            { q: "new Enemy() بتعمل إيه؟", choices: ["بتمسح الكلاس", "بتعمل نسخة جديدة", "بتطبع health", "بتقفل المشهد"], a: 1, why: "new بتنشئ كائن من القالب." },
            { q: "بعد Hit(10) والصحة بدأت 30، الناتج؟", choices: ["40", "20", "10", "30"], a: 1, why: "30 - 10 = 20." }
          ]
        },
        {
          id: "classes",
          title: "كلاس Unity و MonoBehaviour",
          w3: "C# Classes",
          minutes: 9,
          goals: ["شكل سكريبت Unity", "Start مرة و Update كل فريم", "السكريبت مكوّن لازم يتعلّق"],
          blocks: [
            { type: "p", text: "سكريبت اللعب كلاس بيرث MonoBehaviour. الوراثة دي بتدي Unity إذن إنه يحط السكريبت مكوّن على GameObject وينادي دوال معروفة." },
            { type: "table", heads: ["الدالة", "بتيجي إمتى"], rows: [["Awake", "أول ما الكائن يتحمل، حتى قبل Start"], ["Start", "مرة واحدة قبل أول Update، لو المكوّن شغال"], ["Update", "كل فريم، هنا الحركة والقراءة من الكيبورد"]] },
            { type: "code", title: "مثال", run: true, caption: "المحاكي بينادي Awake ثم Start، ومش بيكرر Update لو Start موجودة.", code: "using UnityEngine;\n\npublic class PlayerStats : MonoBehaviour\n{\n    public int health = 100;\n\n    void Awake()\n    {\n        Debug.Log(\"Awake\");\n    }\n\n    void Start()\n    {\n        Debug.Log(health);\n    }\n}\n" },
            { type: "warn", text: "لو نسيت تسحب السكريبت على الكائن، الكلاس موجود في Project بس مش هيشتغل. لازم يبقى مكوّن ظاهر في Inspector." },
            { type: "note", text: "متكتبش حركة اللاعب في Start. Start بتحصل مرة، فهيمشي خطوة ويوقف. الحركة مكانها Update." }
          ],
          quiz: [
            { q: "Update بتتنفّذ؟", choices: ["مرة واحدة", "كل فريم", "لما تقفل اللعبة بس", "لما تعمل حفظ"], a: 1, why: "Unity بتنادي Update في كل إطار." },
            { q: "ترتيب البداية غالبًا؟", choices: ["Update ثم Awake", "Awake ثم Start", "Start ثم Awake", "Inspector ثم Project"], a: 1, why: "Awake أولًا، وبعدين Start قبل حلقات Update." },
            { q: "عشان السكريبت يشتغل لازم؟", choices: ["يتساب في مجلد Downloads", "يتحط مكوّن على GameObject", "يتقفل الملف بس", "يبقى من غير كلاس"], a: 1, why: "MonoBehaviour بيعيش كمكون على كائن." }
          ]
        },
        {
          id: "constructors",
          title: "الكونستركتور و Awake",
          w3: "C# Constructors",
          minutes: 8,
          goals: ["الكونستركتور بيطبطب الكائن أول ما يتعمل", "new بتناديه", "MonoBehaviour نجهزه في Awake مش في كونستركتور"],
          blocks: [
            { type: "p", text: "الكونستركتور دالة اسمها نفس اسم الكلاس. بتنتنفّذ لما نقول new. بنستخدمه في كلاسات البيانات العادية زي سلاح أو عنصر شنطة." },
            { type: "code", title: "كلاس بيانات", run: true, code: "public class Potion\n{\n    public int heal;\n\n    public Potion(int healAmount)\n    {\n        this.heal = healAmount;\n    }\n}\n\nPotion potion = new Potion(25);\nDebug.Log(potion.heal);\n" },
            { type: "p", text: "سكريبت MonoBehaviour متعملوش new بإيديكوا، ومتحطوش منطق اللعبة في كونستركتور. Unity بتعمل النسخة بطريقتها، ومرجع Inspector ممكن يكون لسه فاضي. جهزوا المراجع في Awake، وابدأوا اللعب في Start." },
            { type: "warn", text: "this.heal = healAmount بتميّز حقل الكلاس عن اسم المدخل. من غيرها المتغير يفضل يشير لنفسه والرقم مش هيتخزن." }
          ],
          quiz: [
            { q: "الكونستركتور اسمه؟", choices: ["دايمًا Start", "نفس اسم الكلاس", "دايمًا Update", "Awake بس"], a: 1, why: "Potion لها كونستركتور اسمه Potion." },
            { q: "new Potion(25) بتعمل إيه؟", choices: ["بتنادي الكونستركتور بالقيمة 25", "بتفتح Scene", "بتمسح heal", "بتطبع من غير كائن"], a: 0, why: "القيمة بين القوسين بتتبعت للكونستركتور." },
            { q: "منطق MonoBehaviour في أول التحميل نحطه في؟", choices: ["كونستركتور", "Awake أو Start", "تعليق", "اسم الملف"], a: 1, why: "Unity بتضمن نداء Awake و Start على المكوّن." }
          ]
        },
        {
          id: "modifiers",
          title: "public و private و SerializeField",
          w3: "C# Access Modifiers",
          minutes: 8,
          goals: ["public يظهر ويتقرا من بره", "private محبوس جوه الكلاس", "SerializeField يعرض الخاص في Inspector"],
          blocks: [
            { type: "p", text: "مش كل رقم لازم يبقى مكشوف. public معناه سكريبت تاني يقدر يوصل له، و Unity كمان يعرضه في Inspector. private معناه استخدام داخلي بس، ومش يظهر في Inspector." },
            { type: "code", title: "مثال", run: true, code: "using UnityEngine;\n\npublic class Chest : MonoBehaviour\n{\n    public int gold = 10;\n    [SerializeField] int secret = 7;\n\n    void Start()\n    {\n        Debug.Log(gold);\n        Debug.Log(secret);\n    }\n}\n" },
            { type: "p", text: "secret هنا private لأن مفيش كلمة public، لكن [SerializeField] بيخليه يظهر في Inspector عشان المصمم يعدّله من غير ما باقي السكربتات تعبث بيه." },
            { type: "note", text: "قاعدة الكورس: اللي المصمم محتاج يظبطه يتعرض في Inspector. اللي حساب داخلي يفضل private." },
            { type: "ask", text: "ليه منخليش كل المتغيرات public وخلاص؟" }
          ],
          quiz: [
            { q: "private معناه؟", choices: ["يظهر دايمًا في Inspector", "الاستخدام جوه الكلاس", "يتطبع كل فريم", "يبقى string"], a: 1, why: "الحماية بتمنع السكربتات التانية تغيره بالغلط." },
            { q: "[SerializeField] بتعمل إيه؟", choices: ["تخبي public", "تعرض الحقل في Inspector حتى لو private", "تمسح المتغير", "تعمل Prefab"], a: 1, why: "دي طريقة Unity عشان المصمم يشوف الحقل من غير ما نكسر private." },
            { q: "public int gold غالبًا؟", choices: ["مش هيتخزن", "هيظهر في Inspector", "هيبقى تعليق", "هيمنع Play"], a: 1, why: "الحقول العامة على MonoBehaviour بتتعرض في المفتش." }
          ]
        },
        {
          id: "properties",
          title: "الخصائص",
          w3: "C# Properties",
          minutes: 8,
          goals: ["get تقرأ و set تكتب", "نمنع قيمة غلط زي صحة سالبة", "الشكل الأنضف من دالتين Get و Set"],
          blocks: [
            { type: "p", text: "الخاصية شكلها متغير وأنت بتستخدمها، لكن وراها كود. get بترجّع القيمة، و set بتستقبل القيمة الجديدة في اسم جاهز اسمه value." },
            { type: "code", title: "مثال", run: true, caption: "المحاولة السالبة بقت 0 بسبب الشرط جوه set.", code: "using UnityEngine;\n\npublic class Door : MonoBehaviour\n{\n    int keys = 0;\n\n    public int Keys\n    {\n        get { return keys; }\n        set\n        {\n            if (value < 0) keys = 0;\n            else keys = value;\n        }\n    }\n\n    void Start()\n    {\n        Keys = -2;\n        Debug.Log(Keys);\n        Keys = 3;\n        Debug.Log(Keys);\n    }\n}\n" },
            { type: "p", text: "في اختصار لو مفيش شرط: public int Keys { get; set; } ده بيعمل متغير مخفي لوحده. في الكورس هنفضل نكتب get و set لما يكون في قاعدة، زي إن المفاتيح متبقاش سالبة." }
          ],
          quiz: [
            { q: "value جوه set هي؟", choices: ["اسم الكلاس", "القيمة الجديدة اللي بتحاول تتعيّن", "عدد الأسطر", "اسم الملف"], a: 1, why: "C# بتحط القيمة القادمة في value." },
            { q: "في المثال، Keys = -2 هتخلي Keys كام؟", choices: ["-2", "0", "2", "3"], a: 1, why: "set بيرفض السالب ويحط صفر." },
            { q: "get بتستخدم عشان؟", choices: ["نمسح الكائن", "نقرأ القيمة", "نعمل لوب", "نطبع تعليق"], a: 1, why: "get هي بوابة القراءة." }
          ]
        },
        {
          id: "inheritance",
          title: "الوراثة",
          w3: "C# Inheritance",
          minutes: 8,
          goals: ["كلاس ياخد حقول ودوال كلاس تاني", "العلامة : ", "Boss يرث Enemy ويضيف"],
          blocks: [
            { type: "p", text: "الوراثة يعني كلاس يبني على كلاس موجود. العدو العادي عنده صحة وضرب. الزعيم عدو كمان، فمش هننسخ الكود. هنكتب Boss : Enemy." },
            { type: "code", title: "مثال", run: true, code: "using UnityEngine;\n\npublic class Enemy : MonoBehaviour\n{\n    public int health = 40;\n\n    public void TakeDamage(int amount)\n    {\n        health = health - amount;\n    }\n}\n\npublic class Boss : Enemy\n{\n    void Start()\n    {\n        TakeDamage(15);\n        Debug.Log(health);\n    }\n}\n" },
            { type: "note", text: "في Unity، السكريبت اللي بتحطه على الكائن هو Boss. هو شايل صحة Enemy ودالة TakeDamage من غير ما نعيد كتابتهم. ملف Enemy لازم يكون موجود في المشروع برضه." },
            { type: "warn", text: "متورّثوش سلسلة طويلة أول شهر. Enemy ثم Boss كفاية. الوراثة الزيادة بتخبي الكود." }
          ],
          quiz: [
            { q: "Boss : Enemy معناها؟", choices: ["Boss نسخة من نافذة", "Boss يرث Enemy", "Enemy يرث Boss", "الاتنين نفس الملف"], a: 1, why: "اللي بعد النقطتين هو الأب." },
            { q: "في المثال بعد TakeDamage(15) الصحة؟", choices: ["55", "25", "15", "40"], a: 1, why: "40 - 15 = 25." },
            { q: "ليه الوراثة مفيدة هنا؟", choices: ["عشان مننسخش كود العدو في الزعيم", "عشان نلغي Start", "عشان نمسح Inspector", "عشان نغيّر اسم الملف"], a: 0, why: "الزعيم بياخد سلوك العدو ويبني عليه." }
          ]
        },
        {
          id: "polymorphism",
          title: "تعدد الأشكال",
          w3: "C# Polymorphism",
          minutes: 8,
          goals: ["الابن يبدّل دالة الأب", "virtual و override", "base تنادي نسخة الأب"],
          blocks: [
            { type: "p", text: "نفس اسم الدالة، وسلوك مختلف حسب نوع الكائن. العدو يقول Enemy، والزعيم يقول Boss، ولسه نقدر ننادي نسخة الأب لو محتاجين." },
            { type: "code", title: "مثال", run: true, code: "using UnityEngine;\n\npublic class Enemy : MonoBehaviour\n{\n    public virtual void Speak()\n    {\n        Debug.Log(\"Enemy\");\n    }\n}\n\npublic class Boss : Enemy\n{\n    public override void Speak()\n    {\n        Debug.Log(\"Boss\");\n        base.Speak();\n    }\n\n    void Start()\n    {\n        Speak();\n    }\n}\n" },
            { type: "ul", items: ["virtual على دالة الأب: مسموح للابن يبدلها.", "override على دالة الابن: دي النسخة الجديدة.", "base.Speak() بتنادي كلام الأب من جوه الابن."] },
            { type: "ask", text: "لو شلنا base.Speak() ، إيه اللي هيختفي من Console؟" }
          ],
          quiz: [
            { q: "override بتتحط على؟", choices: ["دالة الابن اللي بتبدّل دالة virtual", "أي متغير", "اسم الملف", "تعليق"], a: 0, why: "override تقول: النسخة دي تحل محل نسخة الأب." },
            { q: "base.Speak() بتنادي؟", choices: ["نسخة الأب", "Update", "الكونستركتور دايمًا", "Console.Clear"], a: 0, why: "base بترجع لدالة الأب." },
            { q: "virtual معناها؟", choices: ["الدالة متتغيّرش", "الأب سامح الابن يبدل الدالة", "الدالة private", "الدالة مصفوفة"], a: 1, why: "من غير virtual، override مش هتتكتب في C#." }
          ]
        },
        {
          id: "enums",
          title: "enum",
          w3: "C# Enums",
          minutes: 7,
          goals: ["أسماء ثابتة بدل أرقام سحرية", "نقارن الحالة بالاسم", "نستخدمها لحالة اللعبة أو السلاح"],
          blocks: [
            { type: "p", text: "بدل ما السلاح رقم 1 و 2 و 3 وتتوهوا، enum بتدي كل حالة اسم. الكود يتقرا، والغلط في الرقم العشوائي يقل." },
            { type: "code", title: "مثال", run: true, code: "public enum GameState\n{\n    Menu,\n    Playing,\n    GameOver\n}\n\npublic class GameFlow : MonoBehaviour\n{\n    GameState state = GameState.Playing;\n\n    void Start()\n    {\n        if (state == GameState.Playing)\n        {\n            Debug.Log(\"اللعبة شغالة\");\n        }\n    }\n}\n" },
            { type: "note", text: "enum ينفع كمان لنوع السلاح: Sword, Bow, Staff. switch بعد كده يبقى على الأسماء مش على أرقام." },
            { type: "p", text: "في Inspector، المتغير اللي نوعه enum بيظهر قائمة منسدلة. المصمم يختار Playing من غير ما يكتب رقم." }
          ],
          quiz: [
            { q: "enum بتستخدم عشان؟", choices: ["نخزن نص طويل حر", "نسمي مجموعة حالات ثابتة", "نعمل لوب", "نطبع تعليق"], a: 1, why: "كل عنصر اسم واضح من مجموعة معروفة." },
            { q: "GameState.Playing هي؟", choices: ["دالة", "قيمة من enum", "نافذة", "مصفوفة"], a: 1, why: "بنوصل للقيمة عن طريق اسم الـ enum ثم النقطة." },
            { q: "بدل weapon = 2 الأفضل في الكورس؟", choices: ["سيب الرقم", "enum بأسماء الأسلحة", "نمسح المتغير", "نحوّله string فاضي"], a: 1, why: "الاسم بيمنع لخبطة الأرقام." }
          ]
        },
        {
          id: "errors",
          title: "الأخطاء و NullReference",
          w3: "C# Exceptions",
          minutes: 8,
          goals: ["نفرق خطأ الكتابة عن خطأ التشغيل", "نقرأ NullReference", "ندوس على الخطأ يفتح السطر"],
          blocks: [
            { type: "p", text: "في نوعين هتشوفوهم طول الكورس. خطأ أحمر قبل Play: الكود مش مكتوب صح، زي فاصلة ناقصة، واللعبة مش هتشتغل. وخطأ وقت اللعب: الكود اتكتب صح بس استخدم حاجة فاضية." },
            { type: "code", title: "غلطة متعمدة", run: true, caption: "ده شكل الفكرة. في Unity الرسالة الحمرا اسمها NullReferenceException.", code: "string playerName = null;\nDebug.Log(playerName.Length);\n" },
            { type: "p", text: "null يعني فاضي، مفيش كائن. Length محتاجة نص موجود. أشهر نسخة في Unity: نسيت تسحب Score Text جوه الخانة في Inspector، وبعدين الكود يقول scoreText.text والنص فاضي." },
            { type: "ul", items: ["اقرأ آخر سطر أحمر في Console، مش أول تحذير أصفر.", "دبل كليك على الخطأ بيفتح الملف عند السطر.", "لو الرسالة NullReference، دور على مرجع Inspector فاضي أو كائن اتمسح.", "التحذير الأصفر مش دايمًا بيوقف اللعبة. الأحمر بيوقف المنطق."] },
            { type: "ask", text: "لو Play رفض يشتغل أصلًا، غالبًا الخطأ ترجمة ولا خطأ null وقت التشغيل؟" }
          ],
          quiz: [
            { q: "NullReferenceException معناها غالبًا؟", choices: ["الفاصلة المنقوطة ناقصة", "الكود استخدم مرجع فاضي", "المشهد كبير", "الخط عربي"], a: 1, why: "بتطلب حاجة من متغير لسه null." },
            { q: "خطأ الفاصلة الناقصة بيظهر؟", choices: ["بعد ما اللعبة تخلّص بس", "قبل التشغيل، والكود مش هيتعمل", "في نافذة Scene بس", "مش بيظهر"], a: 1, why: "ده خطأ ترجمة، Unity مش هتعمل Play نسخ سليم." },
            { q: "دبل كليك على سطر الخطأ بيعمل إيه؟", choices: ["بيمسح المشروع", "بيفتح السكريبت عند السطر", "بيعمل Prefab", "بيقفل Console"], a: 1, why: "دي أسرع طريقة توصل للسطر المسؤول." }
          ]
        }
      ]
    }
  ]
};
