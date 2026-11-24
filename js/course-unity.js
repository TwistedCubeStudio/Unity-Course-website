window.UNITY_TRACK = {
  id: "unity",
  title: "أساسيات Unity",
  short: "Unity",
  blurb: "الأسماء اللي على الشاشة: Hierarchy و Scene و Game و Inspector والمكوّنات.",
  groups: [
    {
      title: "شبابيك المحرر",
      lessons: [
        {
          id: "overview",
          title: "خريطة المحرر",
          w3: "Unity Editor",
          minutes: 7,
          goals: ["نسمي الشبابيك الأساسية", "نفرق مكان الشغل عن مكان اللعب", "نعرف إن الترتيب يتغير ويتظبط"],
          blocks: [
            { type: "p", text: "أول ما المشروع يفتح، الشاشة متقسمة شبابيك. الأسماء دي هتتقال كل حصة، فالمدرس يقف على كل واحدة بإيده قبل أي سكريبت." },
            { type: "mock", variant: "layout", focus: "", caption: "الترتيب الافتراضي قريب من كده. لو شباك اختفى: Window من القائمة العلوية واختار اسمه." },
            { type: "table", heads: ["الشباك", "بيعمل إيه"], rows: [["Hierarchy", "قائمة كائنات المشهد المفتوح"], ["Scene", "مكان ما بنحط ونلف الكائنات وإحنا بنبني"], ["Game", "اللي الكاميرا هتوريه للاعب"], ["Inspector", "تفاصيل الكائن اللي متعلم عليه"], ["Project", "ملفات اللعبة: مشاهد، سكربتات، خامات"], ["Console", "رسائل Debug والأخطاء"]] },
            { type: "note", text: "لو شكل الوحدة عند حد بايظ، من القائمة: Window ثم Layouts ثم Default. متخافوش، الملفات متتمسحش." },
            { type: "ask", text: "مين فينا يلاقي Hierarchy بإيده من غير ما يقرأ الاسم؟" }
          ],
          quiz: [
            { q: "قائمة كائنات المشهد اسمها؟", choices: ["Inspector", "Hierarchy", "Console", "Project"], a: 1, why: "Hierarchy فيها كل GameObject في المشهد المفتوح." },
            { q: "اللي اللاعب هيشوفه وقت اللعب أقرب لـ؟", choices: ["Scene", "Game", "Project", "Hierarchy"], a: 1, why: "Game بيعرض كاميرا اللعبة." },
            { q: "ملفات السكربتات بنلاقيها في؟", choices: ["Project", "Console", "Game", "شريط Play بس"], a: 0, why: "Project هو مجلد Assets بتاع المشروع." }
          ]
        },
        {
          id: "hierarchy",
          title: "Hierarchy",
          w3: "Hierarchy",
          minutes: 8,
          goals: ["كل سطر كائن في المشهد", "الأب والابن", "الإخفاء مش المسح"],
          blocks: [
            { type: "p", text: "Hierarchy قائمة كل الكائنات الموجودة في المشهد المفتوح دلوقتي. مش ملفات على الجهاز. لو قفلت المشهد من غير حفظ، الترتيب ده يضيع." },
            { type: "mock", variant: "editor", focus: "hierarchy", caption: "Player أب، و Visual ابن. تحريك الأب بيحرك الابن معاه.", hierarchy: [
              { name: "Main Camera", kind: "camera" },
              { name: "Directional Light", kind: "light" },
              { name: "Player", kind: "capsule", selected: true, children: [{ name: "Visual", kind: "capsule" }] },
              { name: "Ground", kind: "cube" },
              { name: "Coin", kind: "sphere" }
            ], inspector: { name: "Player", tag: "Untagged", components: [{ title: "Transform", rows: [["Position", "0, 1, 0"]] }] } },
            { type: "ul", items: ["سحب كائن فوق كائن تاني يخليه ابنه.", "السهم جنب الأب يفتح ويقلفل العيال.", "علامة العين بتخبي الكائن في Scene من غير ما تمسحه.", "Delete بيمسح الكائن من المشهد، مش الملف من Project."] },
            { type: "warn", text: "مسح Main Camera بالغلط يخلي Game أسود. لو حصل، اعملوا GameObject ثم Camera، أو ارجعوا Ctrl+Z." },
            { type: "ask", text: "لو العملة ابن للاعب، وهزب اللاعب، العملة هتمشي معاه؟" }
          ],
          quiz: [
            { q: "Hierarchy بتعرض؟", choices: ["ملفات القرص كلها", "كائنات المشهد المفتوح", "أخطاء الكود بس", "طبقات الفوتوشوب"], a: 1, why: "دي شجرة المشهد الحالي." },
            { q: "سحب Coin فوق Player يعمل؟", choices: ["يمسح الاتنين", "يخلي Coin ابن Player", "يحفظ المشروع", "يفتح Console"], a: 1, why: "الكائن المسحوب بيبقى Child." },
            { q: "علامة العين بتعمل إيه؟", choices: ["تمسح الكائن نهائي", "تخبيه من غير حذف", "تعمله Prefab", "تطبع Debug"], a: 1, why: "الإخفاء عرض، والكائن لسه موجود." }
          ]
        },
        {
          id: "scene",
          title: "Scene",
          w3: "Scene View",
          minutes: 8,
          goals: ["نبني المرحلة من Scene", "نتحرك بالماوس في الفراغ", "أدوات التحريك واللف والحجم"],
          blocks: [
            { type: "p", text: "Scene مش شكل اللعبة النهائي. دي طاولة الشغل. بنحرك فيها الكاميرا بتاعة المحرر عشان نشوف المرحلة من أي زاوية، من غير ما نغير كاميرا اللاعب." },
            { type: "mock", variant: "editor", focus: "scene", caption: "الشبكة دي Scene. المكعب والكرات لسه بيتعملوا، ومش شرط ده يكون كادر اللاعب.", hierarchy: [
              { name: "Main Camera", kind: "camera" },
              { name: "Player", kind: "capsule", selected: true },
              { name: "Ground", kind: "cube" }
            ], inspector: { name: "Player", tag: "Untagged", components: [{ title: "Transform", rows: [["Position", "0, 1, 0"], ["Rotation", "0, 0, 0"], ["Scale", "1, 1, 1"]] }] } },
            { type: "table", heads: ["الحركة", "إزاي"], rows: [["لف النظر", "اضغط الزرار اليمين وحرك"], ["طيران جوه المشهد", "وأنت ضاغط يمين استخدم WASD"], ["لف حوالين الهدف", "Alt مع الزرار الشمال"], ["مسك وتحريك العرض", "زرار الماوس الأوسط"], ["تقريب وتبعيد", "عجلة الماوس"], ["التركيز على المختار", "زرار F"], ["تحريك", "W"], ["لف", "E"], ["حجم", "R"]] },
            { type: "warn", text: "لو الكائن طار بره الشاشة، علّم عليه في Hierarchy ودوس F. متفضلوش تقربوا بالعجلة وأنتوا تايهين." },
            { type: "note", text: "الأسهم الملونة على الكائن اسمها Gizmo. الأحمر X، والأخضر Y لفوق، والأزرق Z لعمق المشهد." }
          ],
          quiz: [
            { q: "Scene بتستخدم في؟", choices: ["مشاهدة اللعبة بس زي اللاعب", "بناء وتحريك الكائنات", "كتابة الكود بس", "قراءة الأخطاء"], a: 1, why: "دي نافذة التحرير." },
            { q: "اختصار أداة التحريك؟", choices: ["W", "E", "R", "F"], a: 0, why: "W تحريك، E لف، R حجم، F يركز على المختار." },
            { q: "السهم الأخضر غالبًا محور؟", choices: ["X", "Y", "Z", "W"], a: 1, why: "الأخضر هو Y، والاتجاه العمودي في المشهد الافتراضي." }
          ]
        },
        {
          id: "gameview",
          title: "Game",
          w3: "Game View",
          minutes: 7,
          goals: ["Game هي عين اللاعب", "Play بيشغّل وما بيحفظش التعديل", "نختار نسبة الشاشة"],
          blocks: [
            { type: "p", text: "Game بتعرض اللي كاميرا Main Camera شايفاه. لو وقفت في Scene في حتة حلوة، ده مش معناه إن اللاعب هيشوفها. اللاعب يشوف الكاميرا بس." },
            { type: "mock", variant: "editor", focus: "game", showGame: true, caption: "الخلفية هنا سماء وأرض، من غير شبكة التحرير. Score مثال على واجهة هتيجي في أول لعبة.", hierarchy: [
              { name: "Main Camera", kind: "camera", selected: true },
              { name: "Player", kind: "capsule" },
              { name: "Coin", kind: "sphere" }
            ], inspector: { name: "Main Camera", tag: "MainCamera", components: [{ title: "Camera", rows: [["Clear Flags", "Skybox"], ["Field of View", "60"]] }] } },
            { type: "ul", items: ["زرار Play المثلث فوق في النص بيشغّل اللعبة.", "Stop المربع بيوقف ويرجع المشهد زي ما كان قبل Play.", "قائمة النسبة فوق Game، اختاروا 16:9 عشان الكل يشوف نفس الكادر.", "Stats بتوريك عدد الفريمات لو الصورة بتقطّع."] },
            { type: "warn", text: "أي تحريك أو تعديل وأنتوا ضاغطين Play هيتمسح لما تدوسوا Stop. لو عايزين التعديل يفضل، وقفوا اللعب الأول." },
            { type: "ask", text: "ليهم غيّروا مكان عملة والـ Play لسه شغال، وبعدين وقفوا. العملة هترجع ولا لأ؟" }
          ],
          quiz: [
            { q: "Game بتعرض صورة مين؟", choices: ["كاميرا المحرر في Scene", "كاميرا اللعبة", "ملفات Project", "الكونسول"], a: 1, why: "دي عين اللاعب." },
            { q: "تعديل أثناء Play؟", choices: ["بيتحفظ لوحده", "بيرجع زي ما كان بعد Stop", "بيمسح المشروع", "بيعمل سكريبت"], a: 1, why: "وضع التشغيل تجربة مؤقتة." },
            { q: "Play موجود فين؟", choices: ["تحت Project", "أزرار التشغيل فوق في النص", "جوه ملف cs", "في Task Manager"], a: 1, why: "المثلث فوق شريط المحرر." }
          ]
        },
        {
          id: "inspector",
          title: "Inspector",
          w3: "Inspector",
          minutes: 8,
          goals: ["تفاصيل الكائن المختار", "الاسم والوسم والمكوّنات", "القفل اللي بيوقف التحديث"],
          blocks: [
            { type: "p", text: "Inspector بيتغير كل ما تعلّم على كائن. فوق فيه الاسم، ومربع التفعيل، والـ Tag، والـ Layer. تحتهم المكوّنات. Transform موجود دايمًا." },
            { type: "mock", variant: "editor", focus: "inspector", caption: "الكائن متعلم عليه Player. أي public في السكريبت هيظهر هنا تحت المكوّن.", hierarchy: [
              { name: "Player", kind: "capsule", selected: true },
              { name: "Ground", kind: "cube" }
            ], inspector: { name: "Player", tag: "Player", components: [
              { title: "Transform", rows: [["Position", "0, 1, 0"], ["Rotation", "0, 0, 0"], ["Scale", "1, 1, 1"]] },
              { title: "Player Move (Script)", rows: [["Speed", "6"]] }
            ] } },
            { type: "ul", items: ["المربع جنب الاسم يطفّي الكائن كله.", "المربع جنب المكوّن يطفّي المكوّن بس.", "Add Component تحت بيضيف سلوك جديد أو سكريبت.", "علامة الترس جنب المكوّن فيها Reset.", "القفل فوق Inspector يثبّت العرض على كائن حتى لو علّمت على غيره."] },
            { type: "warn", text: "لو بتختاروا كائنات والمفتش مش بيتغير، بصوا على قفل صغير فوق اليمين. فكوه." },
            { type: "note", text: "Tag مش Layer. الوسم بنستخدمه في الكود عشان نعرف إن اللي لمس العملة هو اللاعب. هنعمله في درس اللعبة." }
          ],
          quiz: [
            { q: "Inspector بيعرض؟", choices: ["كل ملفات الجهاز", "تفاصيل الكائن المختار", "كود المحرك C++", "الإنترنت"], a: 1, why: "هو لوحة خصائص الاختيار الحالي." },
            { q: "المكوّن اللي دايمًا موجود؟", choices: ["Rigidbody", "Transform", "Audio", "Canvas"], a: 1, why: "كل GameObject له Transform ومش بيتشال." },
            { q: "قفل Inspector بيعمل إيه؟", choices: ["بيحفظ اللعبة", "بيثبت العرض ومتغيرش مع الاختيار", "بيمسح الكائن", "بيقفل Unity"], a: 1, why: "مفيد لما ننقل مرجع، وملخبط لو نسيناه مقفول." }
          ]
        },
        {
          id: "project",
          title: "Project",
          w3: "Project",
          minutes: 7,
          goals: ["Assets هي ملفات اللعبة", "ننشئ فولدرات للمشاهد والسكربتات", "منتغيرش الملفات من بره Unity"],
          blocks: [
            { type: "p", text: "Project هو درج الملفات. الحاجة اللي مش هنا مش جزء من اللعبة، حتى لو موجودة في المشهد بالغلط كمرجع مكسور. المجلد الحقيقي على الجهاز اسمه Assets جوه مجلد المشروع." },
            { type: "mock", variant: "project", caption: "رتّبوا من أول يوم. مشروع من غير فولدرات بيتبهدل في الحصة التالتة.", lines: [
              "Assets",
              "  Materials",
              "    CoinMat",
              "  Scenes",
              "    SampleScene",
              "  Scripts",
              "    PlayerMove",
              "    Coin",
              "    GameManager"
            ] },
            { type: "ul", items: ["كليك يمين جوه Assets ثم Create ثم Folder.", "كليك يمين ثم Create ثم C# Script.", "اسحبوا ملف من بره جوه Project لو هتستوردوا صورة أو صوت.", "خانة البحث فوق Project بتلاقي ملف بالاسم."] },
            { type: "warn", text: "متعيدوش تسمية السكربتات من مجلد Windows. غيّروا الاسم من Unity. جنب كل أصل ملف .meta، لو اتمسح اللينكات بين المشهد والملفات بتتلخبط." },
            { type: "note", text: "المشهد لازم يتحفظ: File ثم Save أو Ctrl+S. من غير حفظ، Play مش هيلاقي آخر تعديل بعد ما تقفلوا." }
          ],
          quiz: [
            { q: "ملفات اللعبة بتتعيش في؟", choices: ["Hierarchy", "مجلد Assets ظاهر في Project", "Console", "Game"], a: 1, why: "Project مرآة لمجلد Assets." },
            { q: "تغيير اسم سكريبت من بره Unity؟", choices: ["أفضل طريقة", "ممكن يلخبط الربط مع الكلاس والميتاداتا", "بيعمل Prefab لوحده", "مالوش أثر"], a: 1, why: "التسمية من جوه المحرر بتحافظ على الإشارات." },
            { q: "Ctrl+S في Unity؟", choices: ["تشغيل", "حفظ المشهد", "مسح Console", "قفل Inspector"], a: 1, why: "احفظوا قبل ما تقفلوا أو قبل تجربة كبيرة." }
          ]
        },
        {
          id: "console",
          title: "Console",
          w3: "Console",
          minutes: 7,
          goals: ["نقرأ Debug.Log", "نفرق الأبيض والأصفر والأحمر", "نوصل للسطر بالدبل كليك"],
          blocks: [
            { type: "p", text: "Console مش نافذة زيادة. دي طريقتنا نسأل اللعبة هي بتفكر في إيه. بيضاء معلومة، صفرا تحذير، حمرا خطأ لازم يتظبط." },
            { type: "mock", variant: "console", caption: "الأحمر يوقف المنطق. الأصفر تحذير. الأبيض رسالة إحنا طلبناها.", lines: [
              { level: "info", text: "Player ظهر" },
              { level: "warn", text: "السرعة قيمتها غريبة" },
              { level: "error", text: "NullReferenceException: Object reference not set" }
            ] },
            { type: "code", title: "اطبع حاجة باينة", run: true, code: "Debug.Log(\"Player ظهر\");\nDebug.Log(3);\n" },
            { type: "ul", items: ["Clear بيمسح القائمة، مش بيصلح الخطأ.", "Collapse بيجمع الرسائل المكررة. مفيد لو Update بتطبع كل فريم.", "دبل كليك على الخطأ الأحمر بيفتح السكريبت عند السطر.", "لو الرسالة بتتكرر مئات المرات، شيّل Debug.Log من جوه Update بعد ما تفهموا المشكلة."] },
            { type: "ask", text: "ليه الطباعة جوه Update بتملأ Console بسرعة؟" }
          ],
          quiz: [
            { q: "الرسالة الحمرا معناها؟", choices: ["كل حاجة تمام", "في خطأ لازم يتراجع", "تعليق في الكود", "الكائن اتخبى بالعين"], a: 1, why: "الأخطاء الحمرا بتمنع السلوك السليم." },
            { q: "دبل كليك على الخطأ؟", choices: ["بيمسح المشروع", "بيفتح السطر في السكريبت", "بيعمل Play", "بيقفل Hierarchy"], a: 1, why: "اختصار يوصل لمكان المشكلة." },
            { q: "Clear بتعمل إيه؟", choices: ["بتصلح الكود", "بتمسح الرسائل المعروضة", "بتحفظ المشهد", "بتعمل سكريبت"], a: 1, why: "تنظيف شاشة بس." }
          ]
        }
      ]
    },
    {
      title: "الكائن والمكوّن",
      lessons: [
        {
          id: "gameobject",
          title: "GameObject",
          w3: "GameObject",
          minutes: 7,
          goals: ["أي حاجة في المشهد GameObject", "الكائن الفاضي مدير من غير شكل", "التفعيل غير المسح"],
          blocks: [
            { type: "p", text: "اللاعب، الأرض، الكاميرا، النور، وحتى مدير النقاط اللي مالوش شكل، كلهم GameObject. الكائن نفسه علبة. اللي جواه من سلوك وشكل اسمه Components." },
            { type: "ul", items: ["GameObject ثم Create Empty: علبة فاضية، هنحط عليها مدير النقاط.", "3D Object ثم Plane أو Capsule أو Sphere: علبة ومعاها شكل جاهز.", "المربع جنب الاسم في Inspector يوقف الكائن من غير حذف.", "الاسم في أعلى Inspector هو نفسه اللي في Hierarchy. سمّوا الأسماء بوضوح: Player مش Capsule."] },
            { type: "note", text: "الكاميرا والنور الافتراضيين كائنات هم كمان. سيبوهم. من غير كاميرا Game يبقى أسود، ومن غير نور المجسمات تبقى ضلمة." },
            { type: "ask", text: "ليه نعمل كائن فاضي للنقاط بدل ما نحط السكريبت على الأرض؟" }
          ],
          quiz: [
            { q: "GameObject هو؟", choices: ["ملف صورة", "علبة في المشهد عليها مكوّنات", "سطر في Console", "نوع int"], a: 1, why: "الكائن بيجمع المكوّنات في حتة واحدة." },
            { q: "Create Empty بينشئ؟", choices: ["أرض فيها فيزيا", "كائن من غير شكل", "سكريبت جاهز", "مادة لونها أصفر"], a: 1, why: "علبة فاضية ليها Transform بس." },
            { q: "إيقاف المربع جنب الاسم؟", choices: ["يمسح الملف من Assets", "يعطّل الكائن وهو لسه في المشهد", "يحفظ اللعبة", "يغير لون Scene"], a: 1, why: "التعطيل مؤقت وقابل يترجع." }
          ]
        },
        {
          id: "component",
          title: "Component",
          w3: "Components",
          minutes: 8,
          goals: ["المكوّن سلوك أو بيانات على الكائن", "السكريبت مكوّن", "نجمع أكتر من مكوّن على نفس العلبة"],
          blocks: [
            { type: "p", text: "الكائن من غير مكوّنات ما عندوش شخصية. Transform مكانه، والـ Mesh شكله، والـ Collider جسمه في اللمس، والسكريبت عقله. بنضيف من زرار Add Component." },
            { type: "mock", variant: "editor", focus: "inspector", caption: "نفس اللاعب: مكان، جسم، فيزيا، وعقل. أربعة مكوّنات على علبة واحدة.", hierarchy: [
              { name: "Player", kind: "capsule", selected: true }
            ], inspector: { name: "Player", tag: "Player", components: [
              { title: "Transform", rows: [["Position", "0, 1, 0"]] },
              { title: "Capsule Collider", rows: [["Is Trigger", "off"]] },
              { title: "Rigidbody", rows: [["Is Kinematic", "on"], ["Use Gravity", "off"]] },
              { title: "Player Move (Script)", rows: [["Speed", "6"]] }
            ] } },
            { type: "table", heads: ["مكوّن", "فايدته"], rows: [["Transform", "مكان ولف وحجم"], ["Mesh Renderer", "يرسم الشكل"], ["Collider", "حدود اللمس"], ["Rigidbody", "يخليه يشارك في الفيزياء وأحداث اللمس"], ["Script", "الكود بتاعنا"]] },
            { type: "p", text: "جوه الكود، لما نبقى محتاجين مكوّن على نفس الكائن نطلبه بالاسم. السطر ده بنكتبه في Unity، ومش جزء من تجربة المتصفح:" },
            { type: "code", title: "من نفس الكائن", caption: "انسخوه جوه كلاس MonoBehaviour لما تحتاجوه. GetComponent هات المكوّن من العلبة اللي عليها السكريبت.", code: "Rigidbody body = GetComponent<Rigidbody>();\nif (body != null)\n{\n    body.isKinematic = true;\n}\n" },
            { type: "warn", text: "لو GetComponent رجّعت فاضي، يبقى المكوّن مش متضاف على الكائن. هتشوفوا NullReference لما تستخدموا الناتج." }
          ],
          quiz: [
            { q: "السكريبت في Unity يعتبر؟", choices: ["مشهد", "مكوّن على GameObject", "ملف meta بس", "طبقة Layer"], a: 1, why: "أي كلاس MonoBehaviour بيتضاف كمكون." },
            { q: "Collider فايدته؟", choices: ["يلون الكائن", "يحدد جسم اللمس", "يحفظ المشروع", "يكتب تعليق"], a: 1, why: "من غيره الكائن يتداخل من غير أحداث لمس." },
            { q: "GetComponent بتجيب المكوّن منين؟", choices: ["من مشهد تاني دايمًا", "من نفس الكائن اللي عليه السكريبت", "من الإنترنت", "من Console"], a: 1, why: "بتدور على العلبة الحالية." }
          ]
        },
        {
          id: "transform",
          title: "Transform",
          w3: "Transform",
          minutes: 8,
          goals: ["Position و Rotation و Scale", "فرق المحلي عن العالم", "متستخدمش Scale كسرعة"],
          blocks: [
            { type: "p", text: "Transform موجود على كل كائن. Position مكانه، Rotation لفه، Scale حجمه. الأرقام في Inspector بالوحدات بتاعة Unity، مش بالسنتيمتر." },
            { type: "table", heads: ["المحور", "اللون", "الاتجاه الافتراضي"], rows: [["X", "أحمر", "يمين وشمال"], ["Y", "أخضر", "فوق وتحت"], ["Z", "أزرق", "قدام وورا"]] },
            { type: "p", text: "لو الكائن ابن، الأرقام في Inspector بتبقى Local: يعني بالنسبة لأبوه مش بالنسبة للعالم. أب اتحرك، الابن يتحرك معاه حتى لو رقمه المحلي ما اتغيرش." },
            { type: "ul", items: ["كبسولة اللاعب ارتفاعها ٢، فلو الأرض عند Y = 0 حطوا اللاعب عند Y = 1 عشان يقف فوقها.", "Scale 1,1,1 هو الحجم الأصلي. كبّروا الأرض من Scale، لكن سرعة الجري تبقى متغير في السكريبت.", "اللف في Inspector سهل. في الكود هنستخدم Rotate ومش هنشرح الكواتيرنيون في الكورس ده."] },
            { type: "code", title: "فكرة الحركة بالأرقام", run: true, caption: "دي خطوة واحدة. في اللعبة هنكررها كل فريم جوه Update.", code: "float speed = 6f;\nfloat deltaTime = 0.02f;\nVector3 move = new Vector3(1f, 0f, 0f);\nVector3 step = move * speed * deltaTime;\nDebug.Log(step);\n" },
            { type: "ask", text: "ليه ضربنا في deltaTime بدل ما نحرك بمقدار ثابت كل فريم؟" }
          ],
          quiz: [
            { q: "المحور الأخضر هو؟", choices: ["X", "Y", "Z", "W"], a: 1, why: "Y العمودي في الإعداد الافتراضي." },
            { q: "Scale الصح لسرعة الجري؟", choices: ["نكبر Scale كل فريم", "متغير speed في السكريبت", "نصغّر الكاميرا", "نغير اسم الكائن"], a: 1, why: "Scale حجم الشكل، والسرعة منطق." },
            { q: "Position المحلي بيتقاس بالنسبة لـ؟", choices: ["الأب", "ملف Project", "لون المادة", "عدد الأسطر"], a: 0, why: "Local يعني إحداثيات جوه الأب." }
          ]
        },
        {
          id: "prefab",
          title: "Prefab",
          w3: "Prefabs",
          minutes: 8,
          goals: ["نحوّل كائن لأصل نعيد استخدامه", "نعدّل الأصل فيتحدّث الكل", "نفرق الأصل عن النسخة في المشهد"],
          blocks: [
            { type: "p", text: "العملة الواحدة اللي ظبطناها شكل وخامة وسكريبت، مش هنعملها خمسة من الصفر. نسحبها من Hierarchy لجوه Project، فتبقى Prefab: قالب أزرق نطلّع منه نسخ." },
            { type: "steps", items: [
              { title: "اظبطوا كائن واحد", body: "خلّصوا شكل العملة والسكريبت والمكوّنات وهي لسه في المشهد." },
              { title: "اسحبوها على Project", body: "سيبوها جوه فولدر Prefabs. اسمها في Hierarchy هيبقى أزرق." },
              { title: "اطلعوا نسخ", body: "اسحبوا الأصل من Project للمشهد تاني، أو عملوا Duplicate للنسخة." },
              { title: "عدّلوا الأصل", body: "دبل كليك على الأصل في Project. أي تغيير في السكريبت أو الخامة يلحق كل النسخ اللي مالهاش تعديل خاص." }
            ] },
            { type: "warn", text: "لو غيّرتوا لون نسخة واحدة في المشهد، النسخة دي بقى عليها Override. تغيير الأصل ممكن ما يغيّرش الجزء اللي اتظبط على النسخة لوحدها." },
            { type: "note", text: "المكان مختلف من نسخة للتانية وده طبيعي. القالب موحّد، والمكان بتاع كل عملة في المرحلة خاص بيها." },
            { type: "ask", text: "لو عندنا ٢٠ عملة وعايزين نزوّد سرعة اللف، نعدّل نسخة ولا الأصل؟" }
          ],
          quiz: [
            { q: "Prefab هو؟", choices: ["خطأ في Console", "قالب كائن نعيد استخدامه", "نوع متغير", "كاميرا"], a: 1, why: "أصل في Project نطلّع منه نسخ في المشاهد." },
            { q: "الاسم الأزرق في Hierarchy يعني؟", choices: ["الكائن فيه خطأ", "الكائن نسخة من Prefab", "الكائن مخفي", "الكائن كاميرا"], a: 1, why: "الأزرق علامة ارتباط بالأصل." },
            { q: "عشان كل العملات تتغير مع بعض نعدّل؟", choices: ["نسخة واحدة بس في المشهد دايمًا", "الأصل Prefab", "ملف meta بإيدينا", "نافذة Game"], a: 1, why: "تعديل الأصل بيوصل للنسخ اللي ما عليهاش استثناء." }
          ]
        }
      ]
    }
  ]
};
