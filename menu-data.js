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

const MENU_CATEGORIES = [
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

const MENU = [
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
      note_en:'Served with pancakes, spring onion and cucumber' },
    { id:'J3', cat:'chicken', price:490, emoji:'🍗',
      en:'Sweet and Sour Chicken', zh:'糖醋里脊', ar:'دجاج حلو وحامض (صدور فراخ)',
      note_en:'Chicken breast' },
    { id:'J4', cat:'chicken', price:980, emoji:'🌶️', spicy:true,
      en:'Xinjiang-Style Spicy Fried Chicken', zh:'新疆大盘鸡', ar:'دجاج شينجيانغ الحار (بطاطس، فلفل أخضر وأحمر، بصل، نودلز زجاجية)',
      note_en:'Potato, green and red pepper, onion, glass noodles' },
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
      note_en:'Beef steak and vegetables' },
    { id:'D2', cat:'hotpot', price:1080, emoji:'🍲', spicy:true,
      en:'Longding Tom Yum Hot Pot', zh:'冬阴功小火锅', ar:'هوت بوت توم يام على طريقة لونغ دينغ (مأكولات بحرية، خضروات)',
      note_en:'Seafood and vegetables' },

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
      note_en:'Cauliflower, mixed peppers, onion' },
    { id:'S6', cat:'veg', price:360, emoji:'🧈', veg:true,
      en:'Dry Pot Tofu', zh:'干锅豆腐', ar:'توفو مقلي جاف (توفو، فلفل ألوان، بصل)',
      note_en:'Tofu, mixed peppers, onion' },
    { id:'S7', cat:'veg', price:360, emoji:'🥔', veg:true,
      en:'Dry Pot Potato Slices', zh:'干锅土豆片', ar:'شرائح البطاطس المقلية الجافة (بطاطس، فلفل ألوان، بصل)',
      note_en:'Potato, mixed peppers, onion' },

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
    if (lang === 'ar') return item.note_ar || '';
    return item.note_en || '';
}

function menuCategoryName(cat, lang) {
    return cat[lang] || cat.en;
}

function findMenuItem(id) {
    return MENU.find(function (i) { return i.id === id; });
}

/** Items in printed-menu order for a category id, or all items for 'all'. */
function menuItemsIn(catId) {
    return catId === 'all' ? MENU : MENU.filter(function (i) { return i.cat === catId; });
}

/** A short curated selection for the marketing pages, by menu code. */
const MENU_HIGHLIGHTS = ['J4', 'N3', 'Y2', 'H4', 'D1', 'M1', 'F1', 'X4'];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENU, MENU_CATEGORIES, MENU_HIGHLIGHTS };
}
