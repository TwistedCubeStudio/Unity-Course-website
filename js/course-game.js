window.GAME_TRACK = {
  id: "game",
  title: "أول لعبة",
  short: "اللعبة",
  blurb: "نجمع عملات بالعربي خطوة بخطوة: مشهد، حركة، لمس، ونقاط.",
  groups: [
    {
      title: "اجمع العملات",
      lessons: [
        {
          id: "idea",
          title: "فكرة اللعبة",
          w3: "First Game",
          minutes: 6,
          goals: ["نعرف اللاعب هيعمل إيه", "نحدد شرط الفوز", "نسمي الملفات قبل ما نفتح Unity"],
          blocks: [
            { type: "p", text: "اللعبة الأولى صغيرة عن قصد. لاعب يتحرك بأسهم الكيبورة، يلمّس عملات، كل عملة تختفي، والعداد يزيد. عند ٥ عملات تظهر You Win. الهدف إن القاعة تمشي المسار كله من غير أنظمة زيادة." },
            { type: "mock", variant: "editor", showGame: true, focus: "game", caption: "شكل Game المستهدف. الكاميرا من فوق شوية، والأرض واسعة، والعملات حوالي اللاعب.", hierarchy: [
              { name: "Main Camera", kind: "camera" },
              { name: "Directional Light", kind: "light" },
              { name: "GameManager", kind: "empty" },
              { name: "Player", kind: "capsule", selected: true },
              { name: "Ground", kind: "cube" },
              { name: "Coin", kind: "sphere" },
              { name: "Canvas", kind: "canvas", children: [{ name: "ScoreText", kind: "canvas" }] }
            ], inspector: { name: "Player", tag: "Player", components: [{ title: "Player Move", rows: [["Speed", "6"]] }] } },
            { type: "table", heads: ["الملف", "يتحط على"], rows: [["PlayerMove", "Player"], ["CameraFollow", "Main Camera"], ["Coin", "كل عملة"], ["GameManager", "كائن فاضي اسمه GameManager"]] },
            { type: "p", text: "هنكتب Score: 0 بالإنجليزي على الشاشة. الخط الافتراضي في Unity مش بيرسم عربي، ولو كتبنا عربي هتطلع مربعات والطلبة هيفتكروا السكريبت بايظ." },
            { type: "checks", items: ["فهمنا إن الفوز عند ٥ عملات", "عرفنا أسماء السكربتات الأربعة", "متفقناش نكتب العربي على Canvas في اللعبة دي"] },
            { type: "ask", text: "إيه اللي المفروض يحصل لو اللاعب لمس عملة؟ قولوا التلات حاجات." }
          ],
          quiz: [
            { q: "شرط الفوز في اللعبة دي؟", choices: ["الوقت يخلص", "نجمع ٥ عملات", "نوقع من الأرض", "نقفل Inspector"], a: 1, why: "العداد يوصل للهدف اللي هو ٥." },
            { q: "سكريبت الحركة يتحط على؟", choices: ["الأرض", "Player", "كل عملة", "ملف Project لوحده"], a: 1, why: "PlayerMove مكوّن على اللاعب." },
            { q: "ليه النص على الشاشة بالإنجليزي؟", choices: ["C# مش بتقبل عربي في الكود", "الخط الافتراضي مش بيرسم الحروف العربية", "Inspector بيمنع العربي", "العملة لازم تبقى إنجليزي"], a: 1, why: "الكود نفسه يستحمل عربي في النصوص، العرض محتاج خط فيه الحروف." }
          ]
        },
        {
          id: "scene-setup",
          title: "بناء المشهد",
          w3: "Scene Setup",
          minutes: 12,
          goals: ["نعمل أرض ولاعب وكاميرا", "نسمّي الكائنات", "نقف اللاعب فوق الأرض"],
          blocks: [
            { type: "p", text: "افتحوا مشهد SampleScene أو اعملوا مشهد جديد 3D. سيبوا Directional Light. هنبني تلات حاجات بس دلوقتي: أرض، لاعب، وكاميرا متظبطة." },
            { type: "steps", items: [
              { title: "الأرض", body: "GameObject ثم 3D Object ثم Plane. سمّوها Ground. Position خليها 0 و 0 و 0. Scale خليها 2 و 1 و 2. الـ Plane أصله كبير، والمضاعفة دي بتدي ساحة مريحة." },
              { title: "اللاعب", body: "3D Object ثم Capsule. الاسم Player. Position: X 0 و Y 1 و Z 0. الكبسولة ارتفاعها ٢، فمركزها على ارتفاع ١ يخليها واقفة على الأرض مش غاطسة." },
              { title: "الكاميرا", body: "علّموا Main Camera. Position: X 0 و Y 8 و Z سالب 8. Rotation: X 40 و Y 0 و Z 0. بصوا على Game. المفروض تشوفوا اللاعب والأرض." },
              { title: "الحفظ", body: "File ثم Save. لو حابين انقلوا المشهد لفولدر Scenes جوه Project بالسحب من جوه Unity." }
            ] },
            { type: "mock", variant: "editor", focus: "scene", caption: "بعد الخطوة دي لسه مفيش حركة. بس اللاعب واقف في النص والكادر باين في Game.", hierarchy: [
              { name: "Main Camera", kind: "camera" },
              { name: "Directional Light", kind: "light" },
              { name: "Player", kind: "capsule", selected: true },
              { name: "Ground", kind: "cube" }
            ], inspector: { name: "Player", tag: "Untagged", components: [
              { title: "Transform", rows: [["Position", "0, 1, 0"], ["Rotation", "0, 0, 0"], ["Scale", "1, 1, 1"]] },
              { title: "Capsule Collider", rows: [["Is Trigger", "off"]] }
            ] } },
            { type: "checks", items: ["Ground متسمية ومكانها صفر", "Player على Y = 1", "Game باين فيه اللاعب", "المشهد محفوظ"] },
            { type: "warn", text: "متلعبوش Play وتظبطوا الأرقام. وقفوا التشغيل، عدّلوا، وبعدين جربوا تاني." },
            { type: "ask", text: "ليه Y بتاعة اللاعب ١ مش صفر؟" }
          ],
          quiz: [
            { q: "ارتفاع مركز الكبسولة عشان تقف على الأرض؟", choices: ["Y = 0", "Y = 1", "Y = 10", "X = 1"], a: 1, why: "نصف ارتفاع الكبسولة الافتراضية ١." },
            { q: "الأرض بنختارها من؟", choices: ["3D Object ثم Plane", "UI ثم Text", "Create Empty بس", "Console"], a: 0, why: "Plane أرض مسطحة جاهزة." },
            { q: "قبل ما نكمل لازم؟", choices: ["نمسح الكاميرا", "نحفظ المشهد", "نطفّي النور", "نكتب enum"], a: 1, why: "Ctrl+S عشان الشغل ما يضيعش." }
          ]
        },
        {
          id: "movement",
          title: "تحريك اللاعب",
          w3: "Player Movement",
          minutes: 14,
          goals: ["نكتب PlayerMove", "نفهم Axes و deltaTime", "نخلي الكاميرا تمشي وراه"],
          blocks: [
            { type: "p", text: "الحركة مكانها Update عشان تتقرأ كل فريم. Input.GetAxis بترجع رقم بين -1 و 1. Horizontal يمين وشمال، Vertical قدام وورا على محور Z." },
            { type: "steps", items: [
              { title: "اعملوا السكريبت", body: "في Project اعملوا فولدر Scripts. كليك يمين Create ثم C# Script والاسم PlayerMove بالحرف الكبير ده بالظبط. افتحوه وامسحوا المحتوى وحطوا الكود اللي تحت." },
              { title: "اربطوه", body: "اسحبوا PlayerMove من Project على كائن Player. في Inspector لازم يظهر مكوّن فيه Speed = 6." },
              { title: "جرّبوا", body: "Play. الأسهم أو WASD بتحركوا اللاعب. لو طلع بره الكادر، كمّلوا سكريبت الكاميرا تحت من غير ما تمسح الحركة." }
            ] },
            { type: "code", title: "PlayerMove.cs", caption: "اسم الملف واسم الكلاس واحد. Space.World عشان الأسهم تفضل ثابتة حتى لو الكائن ملفوف.", code: "using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    public float speed = 6f;\n\n    void Update()\n    {\n        float x = Input.GetAxis(\"Horizontal\");\n        float z = Input.GetAxis(\"Vertical\");\n        Vector3 move = new Vector3(x, 0f, z);\n        if (move.magnitude > 1f)\n            move.Normalize();\n        transform.Translate(move * speed * Time.deltaTime, Space.World);\n    }\n}\n" },
            { type: "code", title: "خطوة واحدة بالأرقام", run: true, caption: "ده حجم الخطوة لو اللاعب ماشي يمين وفريم مدته 0.02 ثانية. في Unity Time.deltaTime بتتغير لوحدها.", code: "float speed = 6f;\nfloat deltaTime = 0.02f;\nVector3 move = new Vector3(1f, 0f, 0f);\nVector3 step = move * speed * deltaTime;\nDebug.Log(step);\n" },
            { type: "h", text: "الكاميرا تمشي معاه" },
            { type: "p", text: "الكاميرا الثابتة هتسيّب اللاعب يخرج من الصورة. سكريبت تاني على الكاميرا، ومش على اللاعب." },
            { type: "code", title: "CameraFollow.cs", caption: "بعد ما تحطوه على Main Camera، اسحبوا كائن Player في خانة Target.", code: "using UnityEngine;\n\npublic class CameraFollow : MonoBehaviour\n{\n    public Transform target;\n    public Vector3 offset = new Vector3(0f, 9f, -8f);\n\n    void LateUpdate()\n    {\n        if (target == null) return;\n        transform.position = target.position + offset;\n        transform.LookAt(target);\n    }\n}\n" },
            { type: "warn", text: "لو ظهر خطأ إن Input مش موجودة، المشروع مفعّل Input System الجديد لوحده. من Project Settings ثم Player ثم Active Input Handling اختاروا Both، ووافقوا على إعادة التشغيل." },
            { type: "checks", items: ["السكريبت على Player مش على الأرض", "Speed ظاهرة في Inspector", "الأسهم بتحرك", "Target بتاع الكاميرا متوصل باللاعب"] },
            { type: "ask", text: "ليه ضربنا الحركة في Time.deltaTime؟" }
          ],
          quiz: [
            { q: "GetAxis(\"Horizontal\") بترجع؟", choices: ["اسم اللاعب", "رقم تقريبًا من -1 لـ 1", "مكان الكاميرا", "عدد العملات"], a: 1, why: "دي قراءة محور الإدخال الأفقي." },
            { q: "الحركة اتكتبت في Update عشان؟", choices: ["تتنفّذ مرة واحدة في العمر", "تتقرأ كل فريم", "تشتغل والكائن مقفول", "تستبدل الحفظ"], a: 1, why: "الإدخال المستمر مكانه Update." },
            { q: "CameraFollow.target لازم يكون؟", choices: ["فاضي", "Transform بتاع Player", "ملف المادة", "نافذة Console"], a: 1, why: "الكاميرا محتاجة تعرف تمشي ورا مين." }
          ]
        },
        {
          id: "coins",
          title: "عملات بتلف",
          w3: "Coins",
          minutes: 12,
          goals: ["نعمل عملة ونكررها", "نلوّنها بمادة", "نلفها بالسكريبت"],
          blocks: [
            { type: "p", text: "العملة في الدرس ده كرة صفرا صغيرة. اللف بيخليها باينة. لسه اللمس مش هيختفيها، ده درس النقاط." },
            { type: "steps", items: [
              { title: "الشكل", body: "3D Object ثم Sphere. الاسم Coin. Position حوالي 2 و 0.5 و 2. Scale خليها 0.5 و 0.5 و 0.5. ارتفاع 0.5 يخليها فوق الأرض مش نصها تحت." },
              { title: "اللون", body: "في Project اعملوا فولدر Materials، وكليك يمين Create ثم Material، الاسم CoinMat. في Albedo اختاروا أصفر، واسحبوا المادة على الكرة." },
              { title: "السكريبت", body: "اعملوا Coin.cs بالكود تحت، واسحبوه على العملة. Play. الكرة تلف حوالي نفسها." },
              { title: "النسخ", body: "علّموا العملة في Hierarchy واضغطوا Ctrl+D أربع مرات. حرّكوا كل نسخة بمكان مختلف قريب من النص، عشان الكاميرا تشوفهم. احفظوا." }
            ] },
            { type: "code", title: "Coin.cs", caption: "لسه مفيش لمس. OnTriggerEnter هيتضاف في الدرس الجاي بعد ما مدير النقاط يبقى موجود.", code: "using UnityEngine;\n\npublic class Coin : MonoBehaviour\n{\n    public float spinSpeed = 180f;\n\n    void Update()\n    {\n        transform.Rotate(0f, spinSpeed * Time.deltaTime, 0f, Space.World);\n    }\n}\n" },
            { type: "note", text: "لما الدرس الجاي يخلّص، اسحبوا عملة واحدة متظبطة لفولدر Prefabs. النسخ الجاية تطلع من الأصل، ولو زودتوا spinSpeed في الأصل الكل يلحقه." },
            { type: "checks", items: ["عملة صفرا فوق الأرض", "السكريبت عليها وبتلف في Play", "٥ عملات متفرقين", "المشهد محفوظ"] },
            { type: "warn", text: "لو المادة اتعملت والاتلونش، اتأكدوا إنكم سحبتوها على الكائن في Scene أو Hierarchy مش على فولدر فاضي." }
          ],
          quiz: [
            { q: "Rotate جوه Update بتعمل إيه؟", choices: ["بتحذف العملة", "بتلفها كل فريم", "بتزود النقاط", "بتغير Tag"], a: 1, why: "اللف المستمر زي الحركة، مكانه كل فريم." },
            { q: "Material بتتعمل من؟", choices: ["Hierarchy Create", "Project ثم Create ثم Material", "Console", "Add Tag"], a: 1, why: "الخامة أصل في Project نسحبه على الكائن." },
            { q: "Ctrl+D على العملة؟", choices: ["يمسحها", "يعمل نسخة", "يحفظ المشروع باسم جديد", "يقفل Play"], a: 1, why: "Duplicate نسخة من الكائن المختار." }
          ]
        },
        {
          id: "score",
          title: "اللمس والنقاط",
          w3: "Score",
          minutes: 16,
          goals: ["Trigger يحس بالدخول", "Rigidbody عشان الحدث يشتغل", "GameManager يعدّل النص"],
          blocks: [
            { type: "p", text: "اللمس محتاج جسمين فيهم Collider، وواحد فيهم Rigidbody، والعملة تكون Is Trigger عشان اللاعب يعدّي من غير ما الكرة تدفعه. المدير هو اللي يمسك الرقم، مش كل عملة لوحدها." },
            { type: "h", text: "جهّزوا اللاعب" },
            { type: "steps", items: [
              { title: "الوسم", body: "علّموا Player. من قائمة Tag فوق Inspector اختاروا Add Tag ثم زائد، واكتبوا Player. ارجعوا للكائن Player واختاره من قائمة Tag. من غيره العملة مش هتعرفه." },
              { title: "الجسم", body: "على Player اعملوا Add Component ثم Rigidbody. شيّلوا الصح من Use Gravity، وعلّموا Is Kinematic. كده اللمس هيتحسب، والجاذبية مش هتسحبه، وحركتنا بالسكريبت هتفضل شغالة." }
            ] },
            { type: "h", text: "النص على الشاشة" },
            { type: "steps", items: [
              { title: "اعملوا الكتابة", body: "GameObject ثم UI ثم Text - TextMeshPro. لو طلع استيراد TMP Essentials دوسوا Import. هيظهر Canvas وتحته نص." },
              { title: "ظبطوا ScoreText", body: "سمّوا النص ScoreText. في Rect Transform اختاروا المرساة Top Center مع Alt عشان المكان يتظبط. Pos Y سالب 40. العرض 500 والارتفاع 80. حجم الخط 42. المحاذاة في النص. الكلام المكتوب: Score: 0. اللون أبيض." }
            ] },
            { type: "h", text: "المدير" },
            { type: "code", title: "GameManager.cs", caption: "كائن فاضي اسمه GameManager، اسحبوا السكريبت عليه، وبعدين اسحبوا ScoreText في خانة Score Text.", code: "using UnityEngine;\nusing TMPro;\n\npublic class GameManager : MonoBehaviour\n{\n    public static GameManager Instance;\n    public TMP_Text scoreText;\n    public int goal = 5;\n    int score;\n\n    void Awake()\n    {\n        Instance = this;\n    }\n\n    void Start()\n    {\n        Show();\n    }\n\n    public void AddScore(int amount)\n    {\n        score = score + amount;\n        if (score >= goal)\n            scoreText.text = \"You Win!\";\n        else\n            Show();\n    }\n\n    void Show()\n    {\n        scoreText.text = \"Score: \" + score;\n    }\n}\n" },
            { type: "h", text: "العملة تحس" },
            { type: "p", text: "على كل عملة، Sphere Collider، علّموا Is Trigger. وبعدين استبدلوا Coin.cs بالنسخة دي. لو عملتوا Prefab، عدّلوا الأصل مرة واحدة." },
            { type: "code", title: "Coin.cs بعد اللمس", code: "using UnityEngine;\n\npublic class Coin : MonoBehaviour\n{\n    public float spinSpeed = 180f;\n\n    void Update()\n    {\n        transform.Rotate(0f, spinSpeed * Time.deltaTime, 0f, Space.World);\n    }\n\n    void OnTriggerEnter(Collider other)\n    {\n        if (other.CompareTag(\"Player\"))\n        {\n            GameManager.Instance.AddScore(1);\n            Destroy(gameObject);\n        }\n    }\n}\n" },
            { type: "code", title: "منطق النقطة لوحده", run: true, caption: "غيّروا score وشوفوا إمتى رسالة الفوز. في اللعبة الزيادة بتيجي من العملة مش من هنا.", code: "int score = 4;\nint goal = 5;\nscore = score + 1;\nif (score >= goal)\n    Debug.Log(\"You Win!\");\nelse\n    Debug.Log(\"Score: \" + score);\n" },
            { type: "warn", text: "لو العملة مش بتختفي: الوسم مش Player، أو Is Trigger مش متعلم، أو Rigidbody مش على اللاعب، أو السكريبت القديم لسه من غير OnTriggerEnter." },
            { type: "checks", items: ["Tag بتاع اللاعب Player", "Rigidbody كينماتيك ومن غير جاذبية", "Is Trigger على العملة", "Score Text متسحب جوه GameManager", "اللمس بيزود الرقم ويمسح العملة"] }
          ],
          quiz: [
            { q: "Is Trigger على العملة عشان؟", choices: ["اللاعب يعدّي والحدث يشتغل", "العملة تبقى صفرا", "الكاميرا تلحقه", "النص يبقى عربي"], a: 0, why: "التريجر بيبعت OnTriggerEnter من غير ما يدفع الجسم." },
            { q: "ليه حطينا Rigidbody على اللاعب؟", choices: ["عشان اللون", "عشان حدث اللمس يشتغل", "عشان نمسح الكاميرا", "عشان enum"], a: 1, why: "Unity بتطلب Rigidbody على طرف من طرفي التريجر." },
            { q: "CompareTag(\"Player\") بتفحص؟", choices: ["اسم الملف", "وسم الكائن اللي داخل التريجر", "سرعة اللف", "رقم المشهد"], a: 1, why: "عشان الأرض أو أي جسم تاني ما يزوّدش النقاط." }
          ]
        },
        {
          id: "playtest",
          title: "تجربة اللعب وتعديلات القاعة",
          w3: "Playtest",
          minutes: 10,
          goals: ["نمشي قائمة قبل ما نقول اللعبة خلصت", "نقرأ الخطأ الصح", "نغيّر رقم من Inspector قدام الطلبة"],
          blocks: [
            { type: "p", text: "قبل ما القاعة تسيب اللعبة، المدرس يمشي القائمة دي وهو بيعمل Play قدامهم. لو حاجة وقعت، الخطأ غالبًا من الربط مش من فكرة C#." },
            { type: "checks", items: [
              "Play من غير أخطاء حمرا",
              "الأسهم بتحرك والكاميرا لحقاه",
              "كل عملة بتلف",
              "اللمس بيمسح العملة ويزود Score",
              "خامس عملة بتكتب You Win",
              "Stop رجع المشهد والعملات رجعت",
              "Ctrl+S بعد آخر تعديل"
            ] },
            { type: "h", text: "لو حمرا في Console" },
            { type: "ul", items: [
              "NullReference على scoreText: الخانة في GameManager فاضية. اسحبوا ScoreText.",
              "NullReference على GameManager.Instance: مفيش كائن عليه السكريبت، أو اسم الكلاس مش GameManager.",
              "The script class can't be loaded: اسم الملف مش زي اسم الكلاس.",
              "Input system error: Active Input Handling تبقى Both."
            ] },
            { type: "h", text: "تحديات بعد ما اللعبة تمشي" },
            { type: "ol", items: [
              "غيّروا Speed من Inspector لـ ١٠ من غير ما تفتحوا الكود، وجربوا.",
              "خلّوا goal يساوي ٣ من مكوّن GameManager.",
              "زوّدوا spinSpeed على أصل العملة لو عملتوا Prefab.",
              "حطوا Cube كحيط، وعليه Collider، عشان اللاعب ما يخترقهوش. من غير Rigidbody غير كينماتيك الـ Translate هيعدّي من الحيط، فقولوا للطلبة إن الصدام الحقيقي محتاج نوع حركة تاني، والحيت هنا علامة بصرية."
            ] },
            { type: "note", text: "الحيت في التحدي الأخير مش هيصد Translate. ده درس مهم: التحريك المباشر بيخترق الـ Collider. الصدام محتاج Rigidbody مش كينماتيك وحركة بالفيزياء، وده درس بعد اللعبة الأولى مش دلوقتي." },
            { type: "ask", text: "مين يقدر يغيّر الفوز من ٥ لـ ٣ من غير ما يفتح فيجوال ستوديو؟" },
            { type: "p", text: "كده المادة غطت مسار الشرح: C# اللي اللعبة اتبنت بيه، وشبابيك المحرر، وأول حلقة لعب كاملة. الدرس الجاي في القاعة يقدر يبقى عدو بسيط أو باب بمفتاح، بنفس أدوات if و Trigger و Prefab." }
          ],
          quiz: [
            { q: "Stop بعد Play بيعمل إيه في العملات اللي اتلمّت؟", choices: ["يمسح المشروع", "يرجع المشهد زي قبل التشغيل", "يحفظ الفوز", "يغيّر اسم الكلاس"], a: 1, why: "التعديلات والهدم وقت التشغيل مش بيتسجلوا." },
            { q: "خانة Score Text فاضية غالبًا تسبب؟", choices: ["NullReferenceException", "لعبة أسرع", "Prefab أزرق", "تعليق"], a: 0, why: "الكود بيكتب على مرجع مش متوصل." },
            { q: "تغيير goal من Inspector يعتبر؟", choices: ["غلط ممنوع", "استخدام طبيعي لمتغير public", "مسح للسكريبت", "تغيير للغة"], a: 1, why: "عشان كده خلينا الرقم public للمصمم." }
          ]
        }
      ]
    }
  ]
};
