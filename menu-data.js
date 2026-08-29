/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   Loongdingxuan (龙鼎轩) — Menu Data                              ║
 * ║   Single source of truth for every page that shows the menu.     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Transcribed from the official printed menu (China Halal Food edition).
 * Every dish carries its menu code (L1, J2, …) exactly as printed, so
 * customers, waiters and the kitchen all refer to the same identifier.
 *
 * ALL FOOD IS HALAL (清真). There is no pork and no alcohol on this menu.
 *
 * Fields
 *   id     menu code as printed — also the cart/order key
 *   cat    category id (see MENU_CATEGORIES)
 *   price  EGP, as printed
 *   en/zh/ar   dish name in each language
 *   note_en / note_ar   ingredient detail where the printed menu gives it
 *   veg    true when the dish contains no meat, poultry or seafood
 *   spicy  true when the printed menu marks it hot (辣 / حار / "Spicy")
 *
 * Used by: menu.html, order.html, index.html, index_ar.html, index_zh.html
 * Changing a price here changes it everywhere.
 */

const EG_CATEGORIES = [
    { id: 'cold',    code: 'L', emoji: '🥗', en: 'Cold Dishes',          zh: '凉菜',       ar: 'المقبلات الباردة' },
    { id: 'chicken', code: 'J', emoji: '🍗', en: 'Chicken',              zh: '鸡肉',       ar: 'الدجاج' },
    { id: 'beef',    code: 'N', emoji: '🥩', en: 'Beef',                 zh: '牛肉',       ar: 'اللحم البقري' },
    { id: 'lamb',    code: 'Y', emoji: '🍖', en: 'Lamb',                 zh: '羊肉',       ar: 'لحم الضاني' },
    { id: 'seafood', code: 'H', emoji: '🦐', en: 'Seafood',              zh: '海鲜',       ar: 'المأكولات البحرية' },
    { id: 'hotpot',  code: 'D', emoji: '🍲', en: 'Hot Pot',              zh: '火锅',       ar: 'هوت بوت' },
    { id: 'veg',     code: 'S', emoji: '🥬', en: 'Vegetables & Dry Pot', zh: '素菜 / 干锅', ar: 'الخضار والمقلي الجاف' },
    { id: 'soup',    code: 'T', emoji: '🍜', en: 'Soups',                zh: '汤类',       ar: 'الشوربات' },
    { id: 'bbq',     code: 'K', emoji: '🍢', en: 'Barbecue',             zh: '烧烤',       ar: 'المشويات' },
    { id: 'street',  code: 'X', emoji: '🥟', en: 'Street Food',          zh: '小吃',       ar: 'الأكلات الخفيفة' },
    { id: 'noodles', code: 'M', emoji: '🍝', en: 'Noodles',              zh: '面食',       ar: 'النودلز' },
    { id: 'rice',    code: 'F', emoji: '🍚', en: 'Rice',                 zh: '炒饭',       ar: 'الأرز' },
    { id: 'drinks',  code: 'P', emoji: '🥤', en: 'Drinks',               zh: '饮品',       ar: 'المشروبات' },
];

const EG_ITEMS = [
    // ─── 凉菜 COLD DISHES ────────────────────────────────────────────────
    { id:'L1', cat:'cold', price:290, emoji:'🥬', veg:true,
      en:'Organic Spinach with Nuts', zh:'有机菠菜拌果仁', ar:'سبانخ عضوية مع مكسرات' },
    { id:'L2', cat:'cold', price:480, emoji:'🌶️', spicy:true,
      en:'Chili Oil Beef Tripe', zh:'红油牛肚', ar:'كرشة بقري بزيت الفلفل الحار' },
    { id:'L3', cat:'cold', price:560, emoji:'🍗', spicy:true,
      en:'Chili Oil Chicken Legs', zh:'口水鸡', ar:'أرجل دجاج بزيت الفلفل الحار' },
    { id:'L4', cat:'cold', price:490, emoji:'🥚', spicy:true,
      en:'Spicy Pickled Eggs', zh:'雷椒皮蛋', ar:'بيض مخلل حار' },
    { id:'L5', cat:'cold', price:590, emoji:'🥩',
      en:'Beef with Secret Sauce', zh:'秘制凉拌牛肉', ar:'لحم بقري بصوص خاص سري' },
    { id:'L6', cat:'cold', price:490, emoji:'🥗',
      en:'Steak Salad', zh:'牛排沙拉', ar:'سلطة ستيك' },
    { id:'L7', cat:'cold', price:480, emoji:'🥗',
      en:'Chicken Salad', zh:'鸡肉沙拉', ar:'سلطة دجاج' },
    { id:'L8', cat:'cold', price:280, emoji:'🥗', veg:true,
      en:'Fruit and Vegetable Salad', zh:'果蔬沙拉', ar:'سلطة فواكة وخضار' },

    // ─── 鸡肉 CHICKEN ────────────────────────────────────────────────────
    { id:'J1', cat:'chicken', price:700, emoji:'🌶️', spicy:true,
      en:'Longding Spicy Chicken', zh:'龙鼎辣子鸡', ar:'دجاج لونغ دينغ الحار' },
    { id:'J2', cat:'chicken', price:490, emoji:'🥡',
      en:'Peking Chicken Strips', zh:'京酱肉丝', ar:'شرائح الدجاج بصوص بكين',
      note_en:'Served with pancakes, spring onion and cucumber', note_zh:'配薄饼、葱丝与黄瓜' },
    { id:'J3', cat:'chicken', price:490, emoji:'🍗',
      en:'Sweet and Sour Chicken', zh:'糖醋里脊', ar:'دجاج حلو وحامض (صدور فراخ)',
      note_en:'Chicken breast', note_zh:'鸡胸肉' },
    { id:'J4', cat:'chicken', price:980, emoji:'🌶️', spicy:true,
      en:'Xinjiang-Style Spicy Fried Chicken', zh:'新疆大盘鸡', ar:'دجاج شينجيانغ الحار (بطاطس، فلفل أخضر وأحمر، بصل، نودلز زجاجية)',
      note_en:'Potato, green and red pepper, onion, glass noodles', note_zh:'土豆、青红椒、洋葱、粉条' },
    { id:'J5', cat:'chicken', price:540, emoji:'🥭',
      en:'Mango Sauce and Sour Fried Chicken', zh:'龙鼎秘制锅爆肉', ar:'دجاج مقلي بصوص المانجو والصوص الحلو والحامض' },
    { id:'J6', cat:'chicken', price:580, emoji:'🍯',
      en:'Maple Mustard Roast Chicken Wings', zh:'枫糖芥末仔烤鸡翅', ar:'أجنحة الدجاج المشوية مع صوص القيقب وبذور الخردل' },

    // ─── 牛肉 BEEF ───────────────────────────────────────────────────────
    { id:'N1', cat:'beef', price:620, emoji:'🍅',
      en:'Braised Beef Brisket with Tomatoes', zh:'西红柿炖牛腩', ar:'لحم بقر بريسكيت مطهو ببطء مع الطماطم' },
    { id:'N2', cat:'beef', price:620, emoji:'🥩',
      en:'Stir-Fried Beef (Spicy or Not)', zh:'小炒黄牛肉', ar:'لحم بقري مقلي (حار أو غير حار)' },
    { id:'N3', cat:'beef', price:1180, emoji:'🥩',
      en:'Beef Ribeye Set Meal', zh:'眼肉套餐', ar:'وجبة ريب آي (ستيك)' },
    { id:'N4', cat:'beef', price:980, emoji:'🍍',
      en:'Grilled Beef Ribeye with Pineapple', zh:'碳烤眼肉配菠萝', ar:'ريب آي مشوي على الفحم مع الأناناس' },

    // ─── 羊肉 LAMB ───────────────────────────────────────────────────────
    { id:'Y1', cat:'lamb', price:790, emoji:'🍖',
      en:'Boiled Lamb', zh:'手抓羊肉', ar:'لحم ضاني مسلوق' },
    { id:'Y2', cat:'lamb', price:1390, emoji:'🍖',
      en:'Fried Lamb', zh:'炕锅羊肉', ar:'لحم ضاني مقلي' },

    // ─── 海鲜 SEAFOOD ────────────────────────────────────────────────────
    { id:'H1', cat:'seafood', price:630, emoji:'🍤',
      en:'Wasabi Shrimp Balls', zh:'芥末虾球', ar:'كرات جمبري بصلصة الوسابي' },
    { id:'H2', cat:'seafood', price:960, emoji:'🦑', spicy:true,
      en:'Fried Squid with Chili Peppers', zh:'铁板墨鱼', ar:'حبار مقلي بالفلفل الحار' },
    { id:'H3', cat:'seafood', price:1080, emoji:'🍤', spicy:true,
      en:'Dry Pot Shrimp', zh:'干锅大虾', ar:'جمبري بدون شوربة مع خضار وبهارات' },
    { id:'H4', cat:'seafood', price:1090, emoji:'🐟',
      en:'Fried Fish with Soup', zh:'烤鱼', ar:'سمك مقلي مع شوربة' },
    { id:'H5', cat:'seafood', price:560, emoji:'🌽',
      en:'Fried Corn and Fish', zh:'鱼米之香', ar:'سمك مقلي مع الذرة' },
    { id:'H6', cat:'seafood', price:740, emoji:'🍤',
      en:'Fried Shrimp with Salad Dressing', zh:'黄金琵琶虾', ar:'جمبري مقلي مع صوص السلطة' },
    { id:'H7', cat:'seafood', price:560, emoji:'🐟',
      en:'Braised Premium Grouper', zh:'干烧精品石斑', ar:'سمك هامور فاخر مطهو ببطئ' },

    // ─── 火锅 HOT POT ────────────────────────────────────────────────────
    { id:'D1', cat:'hotpot', price:1290, emoji:'🍲', spicy:true,
      en:'Spicy Steak Beef Mini Hot Pot', zh:'辣huhu牛排火锅', ar:'هوت بوت صغير حار مع لحم ستيك بقري وخضراوات',
      note_en:'Beef steak and vegetables', note_zh:'牛排与时蔬' },
    { id:'D2', cat:'hotpot', price:1080, emoji:'🍲', spicy:true,
      en:'Longding Tom Yum Hot Pot', zh:'冬阴功小火锅', ar:'هوت بوت توم يام على طريقة لونغ دينغ (مأكولات بحرية، خضروات)',
      note_en:'Seafood and vegetables', note_zh:'海鲜与时蔬' },

    // ─── 素菜 / 干锅 VEGETABLES & DRY POT ────────────────────────────────
    { id:'S1', cat:'veg', price:290, emoji:'🥬', veg:true,
      en:'Guangdong Vegetable', zh:'广东菜心', ar:'خضار على طريقة قوانغدونغ (جنوب الصين)' },
    { id:'S2', cat:'veg', price:190, emoji:'🥬', veg:true, spicy:true,
      en:'Spicy Stir-Fried Cabbage', zh:'焓炒包菜', ar:'ملفوف مقلي حار' },
    { id:'S3', cat:'veg', price:190, emoji:'🥔', veg:true, spicy:true,
      en:'Hot and Sour Stir-Fried Potato Shreds', zh:'酸辣土豆丝', ar:'بطاطس مقطعة شرائح رفيعة ومقلية بصوص حار وحامض' },
    { id:'S4', cat:'veg', price:220, emoji:'🥬',
      en:'Oyster Sauce Lettuce', zh:'蚝油生菜', ar:'خس بصوص المحار' },
    { id:'S5', cat:'veg', price:290, emoji:'🥦', veg:true,
      en:'Dry Pot Cauliflower', zh:'干锅花菜', ar:'قرنبيط مقلي جاف (قرنبيط، فلفل ألوان، بصل)',
      note_en:'Cauliflower, mixed peppers, onion', note_zh:'花菜、彩椒、洋葱' },
    { id:'S6', cat:'veg', price:360, emoji:'🧈', veg:true,
      en:'Dry Pot Tofu', zh:'干锅豆腐', ar:'توفو مقلي جاف (توفو، فلفل ألوان، بصل)',
      note_en:'Tofu, mixed peppers, onion', note_zh:'豆腐、彩椒、洋葱' },
    { id:'S7', cat:'veg', price:360, emoji:'🥔', veg:true,
      en:'Dry Pot Potato Slices', zh:'干锅土豆片', ar:'شرائح البطاطس المقلية الجافة (بطاطس، فلفل ألوان، بصل)',
      note_en:'Potato, mixed peppers, onion', note_zh:'土豆、彩椒、洋葱' },

    // ─── 汤类 SOUPS ──────────────────────────────────────────────────────
    { id:'T1', cat:'soup', price:890, emoji:'🍲',
      en:'Cordyceps Stewed Chicken Soup', zh:'虫草炖鸡汤', ar:'شوربة دجاج مطهوة ببطء مع فطر الكورديسيبس الصيني' },
    { id:'T2', cat:'soup', price:590, emoji:'🍜',
      en:'Clam and Tofu Soup', zh:'花甲豆腐汤', ar:'شوربة المحار والتوفو' },
    { id:'T3', cat:'soup', price:540, emoji:'🍜',
      en:'West Lake Beef Soup', zh:'西湖牛肉羹', ar:'شوربة لحم بقري (طريقة بحيرة ويست)' },
    { id:'T4', cat:'soup', price:520, emoji:'🥣',
      en:'Vegetable and Egg Drop Soup', zh:'翡翠蛋花汤', ar:'شوربة خضار مع البيض' },

    // ─── 烧烤 BARBECUE ───────────────────────────────────────────────────
    { id:'K1', cat:'bbq', price:300, emoji:'🍢',
      en:'Longding Beef Kebab', zh:'龙鼎牛肉串', ar:'كباب مشوي على الفحم' },
    { id:'K2', cat:'bbq', price:70, emoji:'🍢',
      en:'Longding Lamb Kebab', zh:'龙鼎羊肉串', ar:'كباب ضاني مشوي' },
    { id:'K3', cat:'bbq', price:110, emoji:'🍗',
      en:'Longding Chicken Wings Kebab', zh:'龙鼎烤全翅', ar:'أجنحة دجاج مشوية' },
    { id:'K4', cat:'bbq', price:180, emoji:'🍆', veg:true,
      en:'Longding Garlic Grilled Eggplant', zh:'龙鼎蒜蓉茄子', ar:'باذنجان مشوي بالثوم' },
    { id:'K5', cat:'bbq', price:180, emoji:'🥔', veg:true,
      en:'Longding Potato Slices Kebab', zh:'龙鼎烤土豆片', ar:'شرائح بطاطس مشوية' },
    { id:'K6', cat:'bbq', price:180, emoji:'🫑', veg:true,
      en:'Longding Green Pepper Kebab', zh:'龙鼎烤玉椒', ar:'فلفل اخضر مشوي على الفحم' },

    // ─── 小吃 STREET FOOD ────────────────────────────────────────────────
    { id:'X1', cat:'street', price:240, emoji:'🍗',
      en:'Xiaoma Fried Chicken Cutlet', zh:'小马哥炸鸡排', ar:'شرائح دجاج (شياو ما) المقلية' },
    { id:'X2', cat:'street', price:100, emoji:'🍟', veg:true,
      en:'French Fries', zh:'炸薯条', ar:'بطاطس مقلية' },
    { id:'X3', cat:'street', price:390, emoji:'🍗',
      en:'Fried Chicken', zh:'小酥肉', ar:'قطع دجاج مقلية مقرمشة' },
    { id:'X4', cat:'street', price:330, emoji:'🥟',
      en:'Boiled Beef Dumplings', zh:'牛肉饺子', ar:'دامبلينغ لحم بقري مسلوقة' },
    { id:'X5', cat:'street', price:330, emoji:'🥟', veg:true,
      en:'Boiled Vegetable Dumplings', zh:'素饺子', ar:'دامبلينغ خضار مسلوقه' },
    { id:'X6', cat:'street', price:360, emoji:'🥟',
      en:'Fried Beef Dumplings', zh:'牛肉煎饺', ar:'دامبلينغ لحم بقري مقلية' },
    { id:'X7', cat:'street', price:330, emoji:'🥟', veg:true,
      en:'Fried Vegetable Dumplings', zh:'素煎饺', ar:'دامبلينغ خضار مقلية' },

    // ─── 面食 NOODLES ────────────────────────────────────────────────────
    { id:'M1', cat:'noodles', price:320, emoji:'🍜',
      en:'Beef Noodles with Soup', zh:'牛肉面', ar:'شوربة نودلز بلحم البقر (مرقة لحم بقري، ثوم، لحم بقر، نودلز)' },
    { id:'M2', cat:'noodles', price:360, emoji:'🍜',
      en:'Braised Beef and Noodles with Soup', zh:'红烧牛肉面', ar:'نودلز لحم بقري مطهو ببطئ (لحم بقري مطهو متبل، نودلز، مرقة)' },
    { id:'M3', cat:'noodles', price:390, emoji:'🍜',
      en:'Two-Flavour Beef and Noodles with Soup', zh:'鸳鸯牛肉面', ar:'نودلز لحم بقري بنكهتين (لحم بقري، كزبرة، براعم الثوم، نودلز، مخلل صيني)' },
    { id:'M4', cat:'noodles', price:360, emoji:'🥢',
      en:'Beef Cold Noodles', zh:'牛肉凉面', ar:'نودلز باردة باللحم البقري' },
    { id:'M5', cat:'noodles', price:290, emoji:'🍝', veg:true,
      en:'Vegetarian Fried Noodles', zh:'素炒面', ar:'نودلز مقلية بالخضار بدون لحم (ملفوف صيني، بصل، كوسا، فلفل أخضر وأحمر)' },
    { id:'M6', cat:'noodles', price:300, emoji:'🍝',
      en:'Chicken Fried Noodles', zh:'鸡肉炒面', ar:'نودلز مقلية بالدجاج (دجاج، ملفوف صيني، بصل، فلفل أحمر وأخضر، كوسة، خضار مشكل)' },
    { id:'M7', cat:'noodles', price:340, emoji:'🍝',
      en:'Beef Fried Noodles', zh:'牛肉炒面', ar:'نودلز مقلية باللحم البقري (لحم بقري، ملفوف صيني، بصل، فلفل أحمر وأخضر، كوسة، خضار مشكل)' },
    { id:'M8', cat:'noodles', price:360, emoji:'🌶️', spicy:true,
      en:'Spicy Fried Noodles', zh:'干煸炒面', ar:'نودلز مقلية حارة (براعم الثوم، خضار، فلفل حار مجفف، لحم بقري)' },
    { id:'M9', cat:'noodles', price:340, emoji:'🍛',
      en:'Curry Beef Fried Noodles', zh:'咖喱牛肉炒面', ar:'نودلز مقلية باللحم البقري والكاري' },
    { id:'M10', cat:'noodles', price:390, emoji:'🥩',
      en:'Teppanyaki Steak with Noodles', zh:'铁板牛排拌面', ar:'شريحة لحم تيبنياكي مع النودلز' },
    { id:'M11', cat:'noodles', price:430, emoji:'🍤', spicy:true,
      en:'Creamy Spicy Stir-Fried Shrimp with Noodles', zh:'奶香川味鲜虾面', ar:'روبيان مقلي حار كريمي مع النودلز' },
    { id:'M12', cat:'noodles', price:410, emoji:'🍝',
      en:'Vegetable and Minced Beef with Noodles', zh:'时蔬酱香牛肉碎面', ar:'نودلز بالخضار واللحم المفروم' },
    { id:'M13', cat:'noodles', price:380, emoji:'🍅',
      en:'Tomato and Egg Waterfall Noodles', zh:'番茄蛋香瀑布面', ar:'نودلز الطماطم والبيض' },
    { id:'M14', cat:'noodles', price:370, emoji:'🥬',
      en:'Stir-Fried Pickled Cabbage and Beef with Noodles', zh:'酸菜拌面', ar:'نودلز باللحم البقري والمخلل الملفوف المقلي' },

    // ─── 炒饭 RICE ───────────────────────────────────────────────────────
    { id:'F1', cat:'rice', price:400, emoji:'🍚',
      en:'Yangzhou Fried Rice', zh:'扬州炒饭', ar:'أرز يانغتشو المقلي' },
    { id:'F2', cat:'rice', price:400, emoji:'🍄', veg:true,
      en:'Mushroom Fried Rice', zh:'菌菇炒饭', ar:'أرز مقلي بالفطر' },
    { id:'F3', cat:'rice', price:450, emoji:'🦐',
      en:'Seafood Risotto', zh:'海鲜烩饭', ar:'ريزوتو بالمأكولات البحرية' },
    { id:'F4', cat:'rice', price:340, emoji:'🍚',
      en:'Longding Soy Sauce Beef Soak Rice', zh:'龙鼎牛肉打抛饭', ar:'أرز منقوع باللحم البقري وصلصة الصويا (لونغ دينغ)' },
    { id:'F5', cat:'rice', price:460, emoji:'🍤',
      en:'Shrimp Sauce and Shrimp Soak Rice', zh:'鲜虾泡饭', ar:'أرز منقوع بصلصة الجمبري والروبيان' },
    { id:'F6', cat:'rice', price:400, emoji:'🍗',
      en:'Orleans Chicken Leg with Rice', zh:'奥尔良鸡腿饭', ar:'أرز مع فخذ دجاج على طريقة أورليانز' },
    { id:'F7', cat:'rice', price:460, emoji:'🍛',
      en:'Curry Beef Brisket with Rice', zh:'咖喱牛腩饭', ar:'أرز مع لحم بقري مطهو بالكاري' },
    { id:'F8', cat:'rice', price:420, emoji:'🍗',
      en:'Chicken Drumsticks with Sauce and Vegetables with Rice', zh:'御膳金鸡腿翡翠饭', ar:'أرز مع أفخاذ دجاج بصلصة والخضار' },
    { id:'F9', cat:'rice', price:480, emoji:'🍆',
      en:'Eggplant Sauce with Shrimp with Rice', zh:'茄香锦绣虾饭', ar:'أرز مع باذنجان بصلصة الروبيان' },
    { id:'F10', cat:'rice', price:460, emoji:'🍚',
      en:'Beef Balls with Rice', zh:'金丝御丸饭', ar:'أرز مع كرات اللحم البقري' },

    // ─── 饮品 DRINKS ─────────────────────────────────────────────────────
    { id:'P1',  cat:'drinks', price:180, emoji:'🍓', veg:true,
      en:'Strawberry Milk', zh:'草莓牛乳', ar:'حليب بالفراولة' },
    { id:'P2',  cat:'drinks', price:170, emoji:'🍊', veg:true,
      en:'Orange Milkshake', zh:'橙香奶昔', ar:'ميلك شيك برتقال' },
    { id:'P3',  cat:'drinks', price:170, emoji:'🍉', veg:true,
      en:'Watermelon Iced Tea', zh:'西瓜冰茶', ar:'شاي مثلج بالبطيخ' },
    { id:'P4',  cat:'drinks', price:130, emoji:'🍊', veg:true,
      en:'Freshly Squeezed Orange Juice', zh:'鲜榨橙汁', ar:'عصير برتقال طازج' },
    { id:'P5',  cat:'drinks', price:170, emoji:'🍉', veg:true,
      en:'Freshly Squeezed Watermelon Juice', zh:'鲜榨西瓜汁', ar:'عصير بطيخ طازج' },
    { id:'P6',  cat:'drinks', price:130, emoji:'🧊', veg:true,
      en:'Iced Americano', zh:'冰美式', ar:'أمريكانو مثلج' },
    { id:'P7',  cat:'drinks', price:160, emoji:'🧊', veg:true,
      en:'Iced Latte', zh:'冰拿铁', ar:'لاتيه مثلج' },
    { id:'P8',  cat:'drinks', price:160, emoji:'🍊', veg:true,
      en:'Americano with Orange Juice', zh:'橙C美式', ar:'أمريكانو مع عصير البرتقال' },
    { id:'P9',  cat:'drinks', price:160, emoji:'☕', veg:true,
      en:'Latte', zh:'热拿铁', ar:'لاتيه' },
    { id:'P10', cat:'drinks', price:130, emoji:'☕', veg:true,
      en:'Americano', zh:'热美式', ar:'أمريكانو' },
    { id:'P11', cat:'drinks', price:480, emoji:'🫖', veg:true,
      en:'Large Bucket of Fruit Tea', zh:'霸王水果茶', ar:'دلو كبير من شاي الفواكه' },
    { id:'P12', cat:'drinks', price:120, emoji:'🍋', veg:true,
      en:'Lemonade', zh:'柠檬水', ar:'ليمون' },
    { id:'P13', cat:'drinks', price:160, emoji:'🥛', veg:true,
      en:'Fruit Yogurt', zh:'水果酸奶', ar:'زبادي فواكهة' },
];



/* ─── Guinea (Conakry) ──────────────────────────────────────────────────
   Transcribed from the branch's own printed menu, which is in Chinese and
   French. English names come from the Egyptian menu wherever the Chinese
   dish name is identical — that is the restaurant's own wording — and are
   translated from the Chinese and French for the 53 dishes unique to this
   branch. Prices are in GNF exactly as printed.                         */

const GN_CATEGORIES = [
    { id: 'fusion',  code: 'R', emoji: '✨', en: 'Fusion Cuisine',   zh: '融合料理', fr: 'Cuisine fusion',      ar: 'مطبخ الفيوجن' },
    { id: 'cold',    code: 'L', emoji: '🥗', en: 'Cold Dishes',      zh: '凉菜',    fr: 'Entrées froides',     ar: 'المقبلات الباردة' },
    { id: 'chicken', code: 'J', emoji: '🍗', en: 'Chicken',          zh: '鸡肉',    fr: 'Poulet',              ar: 'الدجاج' },
    { id: 'beef',    code: 'N', emoji: '🥩', en: 'Beef',             zh: '牛肉',    fr: 'Bœuf',                ar: 'اللحم البقري' },
    { id: 'lamb',    code: 'Y', emoji: '🍖', en: 'Lamb',             zh: '羊肉',    fr: 'Agneau',              ar: 'لحم الضاني' },
    { id: 'seafood', code: 'H', emoji: '🦐', en: 'Seafood',          zh: '海鲜',    fr: 'Fruits de mer',       ar: 'المأكولات البحرية' },
    { id: 'hotpot',  code: 'D', emoji: '🍲', en: 'Hot Pot',          zh: '火锅',    fr: 'Fondue chinoise',     ar: 'هوت بوت' },
    { id: 'veg',     code: 'S', emoji: '🥬', en: 'Vegetarian',       zh: '素菜',    fr: 'Plats végétariens',   ar: 'أطباق نباتية' },
    { id: 'drypot',  code: 'S', emoji: '🍳', en: 'Dry Pot',          zh: '干锅',    fr: 'Marmite sèche',       ar: 'المقلي الجاف' },
    { id: 'street',  code: 'X', emoji: '🥟', en: 'Street Food',      zh: '小吃',    fr: 'Street food',         ar: 'الأكلات الخفيفة' },
    { id: 'soup',    code: 'T', emoji: '🍜', en: 'Soups',            zh: '汤类',    fr: 'Soupes',              ar: 'الشوربات' },
    { id: 'bbq',     code: 'K', emoji: '🍢', en: 'Barbecue',         zh: '烧烤',    fr: 'Grillades',           ar: 'المشويات' },
    { id: 'noodles', code: 'M', emoji: '🍝', en: 'Noodles',          zh: '面食',    fr: 'Nouilles',            ar: 'النودلز' },
    { id: 'rice',    code: 'F', emoji: '🍚', en: 'Rice',             zh: '米饭',    fr: 'Riz',                 ar: 'الأرز' },
    { id: 'drinks',  code: 'P', emoji: '🥤', en: 'Drinks',           zh: '饮品',    fr: 'Boissons',            ar: 'المشروبات' },
];

const GN_ITEMS = [

    // ─── FUSION ───
    { id:'R1', cat:'fusion', price:200000, emoji:'✨',
      en:'Charcoal-Grilled Ribeye with Pineapple', zh:'碳烤颈肉配菠萝', fr:'Œil de côte grillé au charbon de bois et ananas' },
    { id:'R2', cat:'fusion', price:230000, emoji:'✨',
      en:'Beef Ribeye Set Meal', zh:'眼肉套餐', fr:'Menu entrecôte œil de bœuf' },
    { id:'R3', cat:'fusion', price:230000, emoji:'✨',
      en:'Maple Mustard Roast Chicken Wings', zh:'枫糖芥末仔烤鸡翅', fr:'Ailes de poulet grillées au sirop d’érable et à la moutarde à l’ancienne' },
    { id:'R4', cat:'fusion', price:180000, emoji:'✨', veg:true,
      en:'Avocado Salad', zh:'牛油果沙拉', fr:'Salade d’avocat' },
    { id:'R5', cat:'fusion', price:210000, emoji:'✨',
      en:'Steak Salad', zh:'牛排沙拉', fr:'Salade de bœuf grillé' },
    { id:'R6', cat:'fusion', price:200000, emoji:'✨',
      en:'Chicken Salad', zh:'鸡肉沙拉', fr:'Salade de poulet' },
    { id:'R7', cat:'fusion', price:180000, emoji:'✨', veg:true,
      en:'Fruit and Vegetable Salad', zh:'果蔬沙拉', fr:'Salade de fruits et légumes' },
    { id:'R8', cat:'fusion', price:200000, emoji:'✨',
      en:'Full Ribeye Steak Menu', zh:'眼肉牛排全餐', fr:'Menu complet avec steak d’entrecôte' },
    { id:'R9', cat:'fusion', price:210000, emoji:'✨',
      en:'Longding Sausage Platter', zh:'龙鼎香肠拼盘', fr:'Plateau de saucisses Longding' },
    { id:'R10', cat:'fusion', price:210000, emoji:'✨',
      en:'Fresh Shrimp and Mango Salad', zh:'鲜虾芒果沙拉', fr:'Poulet épicé Longding' },
    { id:'R11', cat:'fusion', price:200000, emoji:'✨',
      en:'Longding Signature Beef Salad', zh:'招牌龙鼎牛肉沙拉', fr:'Salade signature de bœuf Longding' },
    { id:'R12', cat:'fusion', price:200000, emoji:'✨',
      en:'Pan-Fried Chicken Thigh and Roast Pumpkin Salad', zh:'煎鸡腿肉烤南瓜沙拉', fr:'Salade de cuisse de poulet poêlée et potiron rôti' },

    // ─── COLD ───
    { id:'L1', cat:'cold', price:180000, emoji:'🥗', veg:true,
      en:'Organic Spinach with Nuts', zh:'有机菠菜拌果仁', fr:'Épinards bio aux fruits secs' },
    { id:'L2', cat:'cold', price:180000, emoji:'🥗', spicy:true,
      en:'Chili Oil Beef Tripe', zh:'红油牛肚', fr:'Tripes de bœuf à l’huile pimentée' },
    { id:'L3', cat:'cold', price:180000, emoji:'🥗', spicy:true,
      en:'Chili Oil Chicken Legs', zh:'口水鸡', fr:'Poulet sauce pimentée et sésame' },
    { id:'L4', cat:'cold', price:130000, emoji:'🥗', spicy:true,
      en:'Spicy Pickled Eggs', zh:'雷椒皮蛋', fr:'Œufs de cent ans au piment fort' },
    { id:'L5', cat:'cold', price:220000, emoji:'🥗',
      en:'Beef with Secret Sauce', zh:'秘制凉拌牛肉', fr:'Bœuf froid sauce secrète' },
    { id:'L6', cat:'cold', price:120000, emoji:'🥗', veg:true,
      en:'Three-Shred Cold Salad', zh:'凉拌三丝', fr:'Salade de trois ingrédients râpés' },
    { id:'L7', cat:'cold', price:120000, emoji:'🥗', veg:true,
      en:'Cold Yuba Salad', zh:'凉拌腐竹', fr:'Salade de yuba' },
    { id:'L8', cat:'cold', price:120000, emoji:'🥗', veg:true,
      en:'Cold Fern-Root Noodle Salad', zh:'凉拌蕨根粉', fr:'Salade de vermicelles de fougère' },
    { id:'L9', cat:'cold', price:120000, emoji:'🥗', veg:true,
      en:'Refreshing Cold Starters', zh:'爽口凉菜', fr:'Entrées froides rafraîchissantes' },
    { id:'L10', cat:'cold', price:80000, emoji:'🥗', veg:true,
      en:'Fried Peanuts', zh:'油炸花生米', fr:'Arachides frites' },
    { id:'L11', cat:'cold', price:200000, emoji:'🥗', veg:true,
      en:'Cold Golden Bamboo Shoot Salad', zh:'清凉可口小拌金笋', fr:'Salade de pousses de bambou dorées' },

    // ─── CHICKEN ───
    { id:'J1', cat:'chicken', price:220000, emoji:'🍗', spicy:true,
      frCorrected:true,
      en:'Longding Spicy Chicken', zh:'龙鼎辣子鸡', fr:'Poulet épicé Longding' },
    { id:'J2', cat:'chicken', price:190000, emoji:'🍗', spicy:true,
      en:'Kung Pao Chicken', zh:'宫保鸡丁', fr:'Poulet Kung Pao' },
    { id:'J3', cat:'chicken', price:210000, emoji:'🍗',
      en:'Sweet and Sour Chicken', zh:'糖醋里脊', fr:'Filet de poulet à la sauce aigre-douce' },
    { id:'J4', cat:'chicken', price:400000, emoji:'🍗', spicy:true,
      en:'Xinjiang-Style Spicy Fried Chicken', zh:'新疆大盘鸡', fr:'Grand plat de poulet à la façon du Xinjiang' },
    { id:'J5', cat:'chicken', price:220000, emoji:'🍗', spicy:true,
      en:'Mango Sauce and Sour Fried Chicken', zh:'龙鼎秘制锅爆肉', fr:'Poulet croustillant sauté, recette spéciale Long Ding' },
    { id:'J6', cat:'chicken', price:250000, emoji:'🍗',
      en:'Braised Chicken with Potato', zh:'土豆油焖鸡', fr:'Poulet braisé aux pommes de terre' },
    { id:'J7', cat:'chicken', price:200000, emoji:'🍗', spicy:true,
      en:'Sichuan Pepper Chicken Wingettes', zh:'椒麻鸡翅仔', fr:'Ailerons de poulet au poivre et au poivre du Sichuan' },
    { id:'J8', cat:'chicken', price:200000, emoji:'🍗',
      en:'Cola Chicken Wings', zh:'可乐鸡翅', fr:'Ailes de poulet au Coca-Cola' },
    { id:'J9', cat:'chicken', price:190000, emoji:'🍗',
      en:'Yu Xiang Shredded Chicken', zh:'鱼香肉丝', fr:'Poulet émincé sauce Yu Xiang' },
    { id:'J10', cat:'chicken', price:230000, emoji:'🍗',
      en:'Peking Chicken Strips', zh:'京酱肉丝', fr:'Poulet émincé sauce pékinoise sucrée' },

    // ─── BEEF ───
    { id:'N1', cat:'beef', price:240000, emoji:'🥩',
      en:'Braised Beef Brisket with Tomatoes', zh:'西红柿炖牛腩', fr:'Poitrine de bœuf mijotée à la tomate' },
    { id:'N2', cat:'beef', price:210000, emoji:'🥩',
      en:'Stir-Fried Beef (Spicy or Not)', zh:'小炒黄牛肉', fr:'Émincé de bœuf sauté' },
    { id:'N3', cat:'beef', price:280000, emoji:'🥩', spicy:true,
      en:'Twice-Cooked Beef, Sichuan Style', zh:'回锅牛肉', fr:'Bœuf à la sauce piquante façon Sichuan' },
    { id:'N4', cat:'beef', price:280000, emoji:'🥩',
      en:'Beef Stewed in Sour Broth', zh:'酸汤汁水炖牛', fr:'Bœuf mijoté dans un bouillon aigre' },
    { id:'N5', cat:'beef', price:250000, emoji:'🥩',
      en:'Cumin Beef', zh:'孜然牛肉', fr:'Bœuf au cumin' },
    { id:'N6', cat:'beef', price:230000, emoji:'🥩', spicy:true,
      en:'Sichuan Chilli Stir-Fried Beef', zh:'川味辣椒炒肉', fr:'Bœuf sauté aux piments du Sichuan' },

    // ─── LAMB ───
    { id:'Y1', cat:'lamb', price:450000, emoji:'🍖',
      en:'Traditional Boiled Lamb', zh:'肉手抓羊肉', fr:'Agneau bouilli traditionnel' },
    { id:'Y2', cat:'lamb', price:550000, emoji:'🍖',
      en:'Fried Lamb', zh:'炕锅羊肉', fr:'Agneau sauté en marmite chaude' },
    { id:'Y3', cat:'lamb', price:380000, emoji:'🍖',
      en:'Lamb Stir-Fried with Spring Onion', zh:'葱爆羊肉', fr:'Agneau sauté à la ciboule' },
    { id:'Y4', cat:'lamb', price:600000, emoji:'🍖',
      en:'Whole Roast Lamb Shank', zh:'手把小羊腿', fr:'Jarret d’agneau entier rôti' },
    { id:'Y5', cat:'lamb', price:680000, emoji:'🍖',
      en:'Grilled Lamb Chops', zh:'烤羊排', fr:'Côtelettes d’agneau grillées' },

    // ─── SEAFOOD ───
    { id:'H1', cat:'seafood', price:235000, emoji:'🦐',
      en:'Wasabi Shrimp Balls', zh:'芥末虾球', fr:'Crevettes enrobées de mayonnaise au wasabi' },
    { id:'H2', cat:'seafood', price:280000, emoji:'🦐', spicy:true,
      en:'Fried Squid with Chili Peppers', zh:'铁板墨鱼', fr:'Seiche grillée sur plaque chaude' },
    { id:'H3', cat:'seafood', price:310000, emoji:'🦐', spicy:true,
      en:'Dry Pot Shrimp', zh:'干锅大虾', fr:'Grosses crevettes à la marmite sèche épicée' },
    { id:'H4', cat:'seafood', price:450000, emoji:'🦐',
      en:'Fried Fish with Soup', zh:'烤鱼', fr:'Poisson grillé' },
    { id:'H5', cat:'seafood', price:230000, emoji:'🦐',
      en:'Fried Corn and Fish', zh:'鱼米之香', fr:'Délice de poisson et de riz' },
    { id:'H6', cat:'seafood', price:280000, emoji:'🦐',
      en:'Fried Shrimp with Salad Dressing', zh:'黄金琵琶虾', fr:'Crevettes pipa dorées' },
    { id:'H7', cat:'seafood', price:300000, emoji:'🦐',
      en:'Black Pepper Mud Crab', zh:'黑胡椒青蟹', fr:'Crabe au poivre noir' },
    { id:'H8', cat:'seafood', price:265000, emoji:'🦐',
      en:'Shrimp Stir-Fried in Doubanjiang', zh:'豆瓣炒虾仁', fr:'Crevettes sautées sauce doub an jiang' },
    { id:'H9', cat:'seafood', price:290000, emoji:'🦐',
      en:'Golden Crispy Shredded Prawns', zh:'金丝大虾', fr:'Crevettes en filaments croustillants dorés' },
    { id:'H10', cat:'seafood', price:260000, emoji:'🦐',
      en:'Teppanyaki Cuttlefish', zh:'铁板烧乌鱼', fr:'Seiche à la plancha' },
    { id:'H11', cat:'seafood', price:290000, emoji:'🦐',
      en:'Shrimp Stir-Fried with Mangetout', zh:'荷兰豆炒虾仁', fr:'Crevettes sautées aux pois mange-tout' },
    { id:'H12', cat:'seafood', price:280000, emoji:'🦐',
      en:'Crispy Pineapple Prawns', zh:'菠萝虾球', fr:'Crevettes croustillantes à l’ananas' },

    // ─── HOTPOT ───
    { id:'D1', cat:'hotpot', price:250000, emoji:'🍲', spicy:true,
      en:'Spicy Steak Beef Mini Hot Pot', zh:'huhu辣牛排火锅', fr:'Mini petit hot pot de steak de bœuf' },
    { id:'D2', cat:'hotpot', price:230000, emoji:'🍲', spicy:true,
      en:'Longding Tom Yum Hot Pot', zh:'冬阴功小火锅', fr:'Mini fondue Tom Yum' },

    // ─── VEG ───
    { id:'S1', cat:'veg', price:160000, emoji:'🥬', veg:true,
      en:'Cantonese Choy Sum', zh:'菜广东菜心', fr:'Chou chinois cantonais' },
    { id:'S2', cat:'veg', price:120000, emoji:'🥬', veg:true, spicy:true,
      en:'Cabbage Stir-Fried with Garlic and Chilli', zh:'炝炒包菜', fr:'Chou sauté à l’ail et au piment' },
    { id:'S3', cat:'veg', price:120000, emoji:'🥬', veg:true, spicy:true,
      en:'Hot and Sour Stir-Fried Potato Shreds', zh:'酸辣土豆丝', fr:'Pommes de terre râpées aigre -piquantes' },
    { id:'S4', cat:'veg', price:160000, emoji:'🥬', veg:true,
      en:'Oyster Sauce Lettuce', zh:'蚝油生菜', fr:'Laitue sauce huître' },
    { id:'S5', cat:'veg', price:160000, emoji:'🥬', veg:true, spicy:true,
      en:'Mapo Tofu', zh:'麻婆豆腐', fr:'Tofu Mapo' },
    { id:'S6', cat:'veg', price:160000, emoji:'🥬', veg:true,
      en:'Organic Spinach Stir-Fried with Ginger', zh:'姜米有机菠菜', fr:'Épinards bio sautés au gingembre et riz' },
    { id:'S7', cat:'veg', price:160000, emoji:'🥬', veg:true,
      en:'Aubergine in Signature Sauce', zh:'风味茄子', fr:'Aubergines façon parfumée' },
    { id:'S8', cat:'veg', price:160000, emoji:'🥬', veg:true,
      en:'Braised Aubergine in Soy Sauce', zh:'红烧茄子', fr:'Aubergines braisées sauce soja' },

    // ─── DRYPOT ───
    { id:'S9', cat:'drypot', price:220000, emoji:'🍳', veg:true,
      en:'Dry Pot Cauliflower', zh:'干锅花菜', fr:'Chou- eur à la marmite sèche' },
    { id:'S10', cat:'drypot', price:180000, emoji:'🍳', veg:true,
      en:'Dry Pot Tofu', zh:'干锅豆腐', fr:'Tofu à la marmite sèche' },
    { id:'S11', cat:'drypot', price:160000, emoji:'🍳', veg:true,
      en:'Dry Pot Potato Slices', zh:'干锅土豆', fr:'Pommes de terre en tranches à la marmite sèche' },

    // ─── STREET ───
    { id:'X1', cat:'street', price:80000, emoji:'🥟',
      en:'Xiaoma Fried Chicken Cutlet', zh:'小马哥炸鸡排', fr:'Escalope de poulet frite “Xiao Ma Ge”' },
    { id:'X2', cat:'street', price:30000, emoji:'🥟', veg:true,
      en:'French Fries', zh:'炸薯条', fr:'Frites' },
    { id:'X3', cat:'street', price:130000, emoji:'🥟',
      en:'Fried Chicken', zh:'小酥肉', fr:'Poulet croustillant frit' },
    { id:'X4', cat:'street', price:150000, emoji:'🥟',
      en:'Boiled Beef Dumplings', zh:'牛肉饺子', fr:'Raviolis au bœuf' },
    { id:'X5', cat:'street', price:130000, emoji:'🥟', veg:true,
      en:'Boiled Vegetable Dumplings', zh:'素饺子', fr:'Raviolis végétariens' },
    { id:'X6', cat:'street', price:150000, emoji:'🥟',
      en:'Fried Beef Dumplings', zh:'牛肉煎饺', fr:'Raviolis au bœuf poêlés' },
    { id:'X7', cat:'street', price:1400000, emoji:'🥟', veg:true,
      priceSuspect:true,
      en:'Fried Vegetable Dumplings', zh:'素煎饺', fr:'Raviolis végétariens poêlés' },
    { id:'X8', cat:'street', price:20000, emoji:'🥟',
      en:'Longdingxuan Large Steamed Beef Bao', zh:'龙鼎轩牛肉大包', fr:'Gros bao vapeur au bœuf Longding Xuan' },
    { id:'X9', cat:'street', price:200000, emoji:'🥟',
      en:'Longding Crispy Fried Chicken Wings', zh:'龙鼎泡沫炸鸡翅', fr:'Ailes de poulet croustillantes Longding' },

    // ─── SOUP ───
    { id:'T1', cat:'soup', price:230000, emoji:'🍜',
      en:'Cordyceps Stewed Chicken Soup', zh:'虫草炖鸡汤', fr:'Soupe de poulet aux cordyceps' },
    { id:'T2', cat:'soup', price:150000, emoji:'🍜',
      en:'Clam and Tofu Soup', zh:'花甲豆腐汤', fr:'Soupe de palourdes et tofu' },
    { id:'T3', cat:'soup', price:190000, emoji:'🍜',
      en:'West Lake Beef Soup', zh:'西湖牛肉羹', fr:'Soupe de bœuf façon lac de l’Ouest' },
    { id:'T4', cat:'soup', price:180000, emoji:'🍜',
      en:'Vegetable and Egg Drop Soup', zh:'翡翠蛋花汤', fr:'Soupe aux œufs et légumes verts' },

    // ─── BBQ ───
    { id:'K1', cat:'bbq', price:20000, emoji:'🍢',
      en:'Longding Beef Skewers', zh:'龙鼎牛肉串烧', fr:'Brochettes de bœuf Longding' },
    { id:'K2', cat:'bbq', price:15000, emoji:'🍢',
      en:'Longding Lamb Kebab', zh:'龙鼎羊肉串', fr:'Brochettes d’agneau Longding' },
    { id:'K3', cat:'bbq', price:30000, emoji:'🍢',
      en:'Longding Chicken Wings Kebab', zh:'龙鼎烤全翅', fr:'Ailes de poulet entières grillées Longding' },
    { id:'K4', cat:'bbq', price:50000, emoji:'🍢', veg:true,
      en:'Longding Garlic Grilled Eggplant', zh:'龙鼎蒜蓉茄子', fr:'Aubergine à l’ail grillée Longding' },
    { id:'K5', cat:'bbq', price:10000, emoji:'🍢', veg:true,
      en:'Longding Potato Slices Kebab', zh:'龙鼎烤土豆片', fr:'Pommes de terre grillées en tranches Longding' },
    { id:'K6', cat:'bbq', price:20000, emoji:'🍢', veg:true,
      en:'Longding Green Pepper Kebab', zh:'龙鼎烤玉椒', fr:'Piments doux grillés Longding' },
    { id:'K7', cat:'bbq', price:20000, emoji:'🍢',
      en:'Longding Grilled King Prawns', zh:'龙鼎烤大虾', fr:'Grosses crevettes grillées Longding' },

    // ─── NOODLES ───
    { id:'M1', cat:'noodles', price:80000, emoji:'🍝',
      en:'Beef Noodles with Soup', zh:'牛肉面', fr:'Nouilles au bœuf' },
    { id:'M2', cat:'noodles', price:100000, emoji:'🍝',
      en:'Braised Beef and Noodles with Soup', zh:'红烧牛肉面', fr:'Nouilles au bœuf braisé' },
    { id:'M3', cat:'noodles', price:120000, emoji:'🍝',
      en:'Two-Flavour Beef and Noodles with Soup', zh:'鸳鸯牛肉面', fr:'Nouilles au bœuf double style' },
    { id:'M4', cat:'noodles', price:110000, emoji:'🍝',
      en:'Beef Cold Noodles', zh:'牛肉凉面', fr:'Nouilles froides au bœuf' },
    { id:'M5', cat:'noodles', price:80000, emoji:'🍝', veg:true,
      en:'Vegetarian Fried Noodles', zh:'素炒面', fr:'Nouilles sautées végétariennes' },
    { id:'M6', cat:'noodles', price:90000, emoji:'🍝',
      en:'Chicken Fried Noodles', zh:'鸡肉炒面', fr:'Nouilles sautées au poulet' },
    { id:'M7', cat:'noodles', price:100000, emoji:'🍝',
      en:'Beef Fried Noodles', zh:'牛肉炒面', fr:'Nouilles sautées au bœuf' },
    { id:'M8', cat:'noodles', price:110000, emoji:'🍝', spicy:true,
      en:'Spicy Fried Noodles', zh:'干煸炒面', fr:'Nouilles sautées sèches épicées' },
    { id:'M9', cat:'noodles', price:110000, emoji:'🍝',
      en:'Curry Beef Fried Noodles', zh:'咖喱牛肉炒面', fr:'Nouilles sautées au bœuf au curry' },
    { id:'M10', cat:'noodles', price:110000, emoji:'🍝',
      en:'Stir-Fried Noodle Flakes', zh:'炒面片', fr:'Lamelles de pâtes sautées' },
    { id:'M11', cat:'noodles', price:110000, emoji:'🍝',
      en:'Stir-Fried Pickled Cabbage and Beef with Noodles', zh:'酸菜拌面', fr:'Nouilles froides aux légumes marinés' },
    { id:'M12', cat:'noodles', price:90000, emoji:'🍝',
      en:'Noodles with Braised Aubergine', zh:'红烧茄子拌面', fr:'Nouilles aux aubergines braisées' },
    { id:'M13', cat:'noodles', price:110000, emoji:'🍝',
      en:'Mixed Noodles with Minced Meat', zh:'碎肉拌面', fr:'Nouilles mélangées à la viande hachée' },
    { id:'M14', cat:'noodles', price:120000, emoji:'🍝',
      en:'Mixed Noodles with Crispy Stir-Fried Beef', zh:'牛肉过油肉拌面', fr:'Nouilles mélangées au bœuf sauté croustillant' },
    { id:'M15', cat:'noodles', price:120000, emoji:'🍝',
      en:'Teppanyaki Steak with Noodles', zh:'铁板牛排拌面', fr:'Nouilles mélangées au steak sur plaque chaude' },
    { id:'M16', cat:'noodles', price:110000, emoji:'🍝', spicy:true,
      en:'Creamy Spicy Stir-Fried Shrimp with Noodles', zh:'奶香川味鲜虾面', fr:'Noodles Nouilles aux crevettes sauce crémeuse façon Sichuan' },
    { id:'M17', cat:'noodles', price:110000, emoji:'🍝',
      en:'Vegetable and Minced Beef with Noodles', zh:'时蔬酱香牛肉碎面', fr:'Nouilles au bœuf haché et légumes sauce soja' },
    { id:'M18', cat:'noodles', price:100000, emoji:'🍝',
      en:'Tomato and Egg Waterfall Noodles', zh:'番茄蛋香瀑布面', fr:'Nouilles aux tomates et œufs “cascade' },

    // ─── RICE ───
    { id:'F1', cat:'rice', price:90000, emoji:'🍚',
      en:'Yangzhou Fried Rice', zh:'扬州炒饭', fr:'Riz sauté de Yangzhou' },
    { id:'F2', cat:'rice', price:95000, emoji:'🍚', veg:true,
      en:'Mushroom Fried Rice', zh:'菌菇炒饭', fr:'­Riz sauté aux champignons' },
    { id:'F3', cat:'rice', price:120000, emoji:'🍚',
      en:'Seafood Risotto', zh:'海鲜烩饭', fr:'Riz aux fruits demer en sauce' },
    { id:'F4', cat:'rice', price:120000, emoji:'🍚',
      en:'Longding Soy Sauce Beef Soak Rice', zh:'龙鼎牛肉打抛饭', fr:'Riz au bœuf à la sauce basilic thaï' },
    { id:'F5', cat:'rice', price:100000, emoji:'🍚',
      en:'Shrimp Sauce and Shrimp Soak Rice', zh:'鲜虾泡饭', fr:'Soupe de riz aux crevettes' },
    { id:'F6', cat:'rice', price:100000, emoji:'🍚',
      en:'Orleans Chicken Leg with Rice', zh:'奥尔良鸡腿饭', fr:'Riz au poulet (cuisses) façon Orléans' },
    { id:'F7', cat:'rice', price:110000, emoji:'🍚',
      en:'Curry Beef Brisket with Rice', zh:'咖喱牛腩饭', fr:'Riz au bœuf mijoté au curry' },
    { id:'F8', cat:'rice', price:110000, emoji:'🍚',
      en:'Chicken Drumsticks with Sauce and Vegetables with Rice', zh:'御膳金鸡腿翡翠饭', fr:'Riz vert aux cuisses de poulet dorées style impérial' },
    { id:'F9', cat:'rice', price:110000, emoji:'🍚',
      en:'Eggplant Sauce with Shrimp with Rice', zh:'茄香锦绣虾饭', fr:'Riz aux crevettes et aubergines parfumées' },
    { id:'F10', cat:'rice', price:110000, emoji:'🍚',
      en:'Beef Balls with Rice', zh:'金丝御丸饭', fr:'Riz aux boulettes dorées impériales' },
    { id:'F11', cat:'rice', price:120000, emoji:'🍚', spicy:true,
      en:'Curry Rice with Omelette and Green Sichuan Pepper Chicken', zh:'藤椒鸡腿肉咖喱蛋包饭', fr:'Riz au curry avec omelette et poulet au poivre de Sichuan vert' },

    // ─── DRINKS ───
    { id:'P1', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Lemon Water', zh:'柠檬水品', fr:'Eau citronnée' },
    { id:'P2', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Strawberry Milk', zh:'草莓牛乳', fr:'Lait à la fraise' },
    { id:'P3', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Orange Milkshake', zh:'橙香奶昔', fr:'Milkshake à l’orange' },
    { id:'P4', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Watermelon Iced Tea', zh:'西瓜冰茶盖碗茶中国茶', fr:'Thé glacé à la pastèque' },
    { id:'P5', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Freshly Squeezed Orange Juice', zh:'鲜榨橙汁', fr:'Jus d’orange frais' },
    { id:'P6', cat:'drinks', price:50000, emoji:'🥤', veg:true,
      en:'Freshly Squeezed Watermelon Juice', zh:'鲜榨西瓜汁', fr:'Jus de pastèque frais' },
    { id:'P7', cat:'drinks', price:60000, emoji:'🥤', veg:true,
      en:'Large Bucket of Fruit Tea', zh:'霸王水果茶', fr:'Grand thé aux fruits' },
    { id:'P8', cat:'drinks', price:40000, emoji:'🥤', veg:true,
      en:'Iced Americano', zh:'冰美式', fr:'Americano glacé' },
    { id:'P9', cat:'drinks', price:40000, emoji:'🥤', veg:true,
      en:'Iced Latte', zh:'冰拿铁', fr:'Latte glacé' },
    { id:'P10', cat:'drinks', price:40000, emoji:'🥤', veg:true,
      en:'Orange Americano', zh:'C橙美式', fr:'Americano à l’orange (vitamine C)' },
    { id:'P11', cat:'drinks', price:40000, emoji:'🥤', veg:true,
      en:'Latte', zh:'热拿铁', fr:'Latte chaud' },
    { id:'P12', cat:'drinks', price:40000, emoji:'🥤', veg:true,
      en:'Americano', zh:'热美式', fr:'Americano chaud' },
    { id:'P13', cat:'drinks', price:60000, emoji:'🥤', veg:true,
      en:'Fruit Yogurt', zh:'水果酸奶', fr:'Yaourt aux fruits' },
];

/* ─── Menus by branch ───────────────────────────────────────────────────
   Each country sells its own menu. A branch points at one of these by its
   `menuId`; a branch with `menuId: null` has no menu loaded yet and the
   site shows its phone numbers instead of inventing dishes.            */

const MENUS = {
    eg: { categories: EG_CATEGORIES, items: EG_ITEMS },
    gn: { categories: GN_CATEGORIES, items: GN_ITEMS },
};

/** The menu for a branch, or null when none has been loaded. */
function menuFor(branch) {
    return branch && branch.menuId ? (MENUS[branch.menuId] || null) : null;
}

/* ─── Dish photography ──────────────────────────────────────────────────
   Photographs extracted from the restaurant's official printed menu and
   matched to each dish by its position on the page. Dishes not listed here
   have no photograph in the printed menu and fall back to their emoji.   */

const MENU_IMAGES = {
    // Photographs exist only for the Egyptian menu. Guinea's own menu PDF has
    // photos too, but none have been extracted, and the two branches reuse the
    // same dish codes — so an unscoped lookup would show Egypt's L1 for
    // Guinea's L1. Scoping by menu keeps that from happening.
    eg: [
    "D1",
    "D2",
    "F1",
    "F10",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "K1",
    "K2",
    "K3",
    "K4",
    "K5",
    "K6",
    "L1",
    "L2",
    "L3",
    "L4",
    "L5",
    "L6",
    "L7",
    "L8",
    "M1",
    "M10",
    "M11",
    "M12",
    "M13",
    "M14",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "N1",
    "N2",
    "N3",
    "N4",
    "P11",
    "P4",
    "P6",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "T1",
    "T2",
    "T3",
    "T4",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "Y1",
    "Y2"
],
    gn: [],
};

/** Path to a dish photo for this branch's menu, or null when there is none. */
function menuItemImage(menuId, item) {
    const set = MENU_IMAGES[menuId] || [];
    return set.indexOf(item.id) !== -1 ? 'images/dishes/' + item.id + '.webp' : null;
}

/* ─── Helpers ───────────────────────────────────────────────────────────
   `lang` is one of 'en' | 'ar' | 'zh'. Pages pass their own language so
   one dataset drives all three editions of the site.                    */

function menuItemName(item, lang) {
    return item[lang] || item.en;
}

/** Full display label including the printed menu code, e.g. "M1. Beef Noodles with Soup". */
function menuItemLabel(item, lang) {
    return item.id + '. ' + menuItemName(item, lang);
}

/** Ingredient detail where the printed menu supplies it, otherwise ''. */
function menuItemNote(item, lang) {
    // No cross-language fallback: a missing translation renders nothing rather
    // than leaking another language into this edition of the menu.
    return item['note_' + lang] || '';
}

function menuCategoryName(cat, lang) {
    return cat[lang] || cat.en;
}

function findMenuItem(menu, id) {
    if (!menu) return null;
    return menu.items.find(function (i) { return i.id === id; });
}

/** Items in printed-menu order for a category id, or all items for 'all'. */
function menuItemsIn(menu, catId) {
    if (!menu) return [];
    return catId === 'all' ? menu.items : menu.items.filter(function (i) { return i.cat === catId; });
}

/** A short curated selection for the marketing pages, by menu code. */
const MENU_HIGHLIGHTS = ['J4', 'N3', 'Y2', 'H4', 'D1', 'M1', 'F1', 'X4'];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENUS, MENU_IMAGES, MENU_HIGHLIGHTS, menuFor, menuItemsIn, findMenuItem, menuItemName, menuItemNote, menuCategoryName, menuItemImage };
}
