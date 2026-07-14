import type { Dict } from "./en";

export const uz: Dict = {
  nav: {
    pricing: "narxlar",
    openSource: "open source",
    manifesto: "manifest",
    contacts: "kontaktlar",
    bookCall: "qo'ng'iroqqa yozilish",
  },
  hero: {
    titleStart: "Markaziy Osiyodagi birinchi ",
    titleAccent: "open-source-first serverless bulut",
    features: [
      {
        lead: "AWS Lambda'dan 130 barobargacha tez ishga tushish*",
        text: ": tezroq ishga tushiring, tezroq javob bering va faqat haqiqiy ishlash vaqti uchun to'lang.",
      },
      {
        lead: "Adolatli masshtablash va narxlar",
        text: ": kam yuklamali xizmatlar uchun kamroq to'lang (yoki umuman bepul - saxiy bepul tarifimizni ko'ring), yuqori yuklamada esa xarajatlaringizni optimallashtiring. Hech narsani tanlash shart emas - buni biz siz uchun qilamiz.",
      },
      {
        lead: "Ma'lumotlar suvereniteti va past ping",
        text: ": serverlarimiz Toshkent, Almati va Frankfurtda. Foydalanuvchilar ma'lumotlarini mahalliy qonunlarga mos saqlang va kechikish haqida o'ylamang.",
      },
    ],
    ctaPrimary: "qo'ng'iroqqa yozilish",
    ctaSecondary: "bepul va open-source yechimlarimiz",
    footnote: "* AWS Lambda'ning o'rtacha sovuq ishga tushishi bilan solishtirilgan; WASM runtime'imizda o'lchangan",
  },
  pricing: {
    title: "narxlar",
    regionLabel: "hudud",
    currencyNote: "Aniq narxlar uchun biz bilan bog'laning",
    tableTitle: "faqat ishlatganingiz uchun to'lang",
    unitColumn: "resurs",
    priceColumn: "{region} narxi",
    tiers: {
      free: {
        name: "Bepul",
        tagline: "pet-loyihalar va talabalar uchun",
        features: ["Oyiga {requests} so'rov bepul", "{compute} GB·s hisoblash bepul", "10 ms'dan tez sovuq start", "Hamjamiyat yordami"],
        cta: "bepul boshlash",
      },
      payg: {
        name: "Ishlatgancha to'lov",
        tagline: "uxlaysiz - to'lamaysiz",
        features: [
          "Faqat haqiqiy ishlash vaqti uchun to'lov",
          "Noldan cho'qqigacha avto-masshtablash",
          "Toshkent, Almati va Frankfurtda serverlar",
          "Telegram'da ustuvor yordam",
        ],
        cta: "qo'ng'iroqqa yozilish",
      },
      enterprise: {
        name: "Enterprise",
        tagline: "sizning yoki bizning apparatimiz",
        features: [
          "Ajratilgan apparat va SLA",
          "On-prem o'rnatishda yordam",
          "Mahalliy ma'lumot qonunlariga muvofiqlik",
        ],
        cta: "biz bilan bog'laning",
      },
    },
    perUnitFrom: "{price}dan",
    custom: "individual",
    perMonth: "/oy",
  },
  openSource: {
    title: "o'zingizning serverless bulutingizni joylashtiring",
    body: "21 Cloud avvalo open-source. Biz ishlatadigan aynan o'sha infratuzilma dasturini o'z apparatingizda ishga tushiring. Bepul o'rnating va bulut xizmatlaringizni bir necha bosishda on-prem'ga ko'chiring.",
    cta: "GitHub repozitoriysi",
    terminalRunning: "→ o'z bulutingiz ishga tushdi",
  },
  manifesto: {
    title: "Cloud should be cheap. And open.",
    paragraphs: [
      "Most clouds bill you for breathing. We do not think that is fine. 21CI is GPLv3 forever, 21cloud.uz has a real free tier, and the two are the same software. So if our prices ever stop making sense, you can walk away with your .wasm and keep going.",
    ],
    closing: "Built in Tashkent. Hosted across regions. Powered by plov. ♥",
  },
  founder: {
    title: "savollar bormi? asoschimiz bilan bevosita gaplashing",
    subtitle:
      "biz Dush-Yak 9:00-19:00 ishlaymiz. Ammo shoshilinch narsa bo'lsa - xavotir olmang, biz yoningizdamiz!",
    role: "21 Cloud asoschisi",
    bio: "Backend va DevOps'da 5+ yil, seriyali asoschi",
    labels: { email: "email:", phone: "telefon:", telegram: "telegram:", whatsapp: "whatsapp:" },
    regions: {
      uz: "O'zbekiston Respublikasi",
      kz: "Qozog'iston Respublikasi",
      de: "Germaniya",
    },
    cta: {
      title: "biz tayyormiz, qachon xohlasangiz",
      body: "Vaqt tanlang va asoschi bilan bevosita gaplashing - o'rtada savdo bo'limi yo'q.",
      book: "qo'ng'iroqqa yozilish",
      telegram: "Telegram'da yozish",
    },
  },
  footer: {
    sharing:
      "21 Cloud saytidagi materiallardan foydalanganda, iltimos, manbaga havola qoldiring (garchi buni qat'iy talab qilmasak ham)",
    registration:
      "Ro'yxatdan o'tish: O'zbekiston, Toshkent shahri, Yashnobod tumani, o'zini o'zi band qilgan BRASTILOV ALEKSEY MIXAYLOVICH",
    proof:
      "Ro'yxatdan o'tish va bank o'tkazmasi orqali to'lov tasdig'ini ish kunlari kontaktlarimiz orqali so'rab olishingiz mumkin",
    tosBefore: "Saytda qolishda davom etib, xizmatlarimiz va materiallarimizdan foydalanib, siz shartlarimizga rozilik bildirasiz: ",
    publicOffer: "Ushbu sahifadagi ma'lumotlar O'zbekiston Respublikasi va Qozog'iston Respublikasi qonunchiligiga ko'ra ommaviy taklif hisoblanmaydi.",
  },
  selector: {
    country: "Davlat",
    language: "Til",
    currency: "Valyuta",
  },
  regions: {
    tashkent: "Toshkent",
    almaty: "Almati",
    frankfurt: "Frankfurt",
  },
  features: {
    title: "nima uchun serverless?",
    subtitle: "Siz funksiyalar yozasiz. Biz serverlar, masshtablash va ishonchlilikni boshqaramiz. Faqat real bajarish vaqti uchun to'laysiz - bo'sh paytda hech narsa yo'q.",
    cards: [
      {
        title: "bir hisob - cheksiz xizmatlar",
        body: "10 ta mikroservis, API, cron-vazifalar va webhooklar - bitta akkaunt. Ijaraga olish, yamash yoki kechasi qayta ishga tushirish kerak bo'lgan VPS yo'q.",
      },
      {
        title: "bo'sh paytda nol xarajat",
        body: "VPS oyiga $30 to'laydi, 1 ta yoki 1 million so'rov bo'lsin. 21 Cloud kechasi, dam olish kunlari yoki so'rovlar orasida hech narsa to'lamasiz.",
      },
      {
        title: "10 ms dan kam cold start",
        body: "Funksiyalar 10 ms ichida uyg'onadi. Konteyner kutish kerak emas - foydalanuvchilaringiz tezlik ko'radi.",
      },
      {
        title: "ma'lumotlar o'z mintaqangizda",
        body: "Toshkent, Almati va Frankfurtda serverlar. Qo'shimcha sozlamasdan mahalliy qonunlarga muvofiqligini ta'minlang.",
      },
      {
        title: "open source - to'liq mustaqillik",
        body: "Xuddi shu dasturni o'z serveringizda bepul ishga tushiring. Istalgan payt ketishingiz mumkin - kod va ma'lumotlaringiz sizniki.",
      },
      {
        title: "mavjud kodingiz bilan ishlaydi",
        body: "Xavfsizlik konfiguratsiyalari yoki qayta yozish shart emas. Minimal o'zgartirishlar - daqiqalar ichida deploy.",
      },
    ],
  },
  calc: {
    title: "hisobingizni taxmin qiling",
    memory: "funksiya uchun xotira",
    requests: "oylik so'rovlar",
    execTime: "o'rtacha bajarish vaqti",
    freeTier: "har oy birinchi {requests} ta so'rov + {compute} GB·s hisoblash bepul",
    total: "sizning taxminingiz",
    breakdown: "hisoblash {compute} · so'rovlar {requests}",
    perMonth: "/oy",
    freeTierLabel: "bepul daraja",
  },
  compare: {
    title: "biz raqobatchilar bilan qanday taqqoslanamiz",
    subtitle: "Taxminiy ma'lumotlar; ping tanlangan mintaqangizdan eng yaqin ma'lumotlar markazigacha o'lchangan. Narxlar 2025 yilgi rasmiy narx ro'yxatlari.",
    pingRegionLabel: "Ping manba:",
    coldStart: "Sovuq start",
    pingCol: "Ping",
    languages: "Tillar / runtimelar",
    requests: "1M so'rovga",
    provider: "Provayder",
    local: "mahalliy",
  },
};
