/**
 * CYBER SECURITY BASICS 2.0 — QUIZ DATABASE
 * Exactly 15 curated questions spanning all 6 modules
 */

const CYBER_QUIZ_QUESTIONS = [
    {
        id: 1,
        moduleId: "cryptography",
        moduleName: "Kriptografiya",
        question: "Simmetrik va assimetrik shifrlashning asosiy farqi nimada?",
        options: [
            "Simmetrik shifrlashda faqat raqamlar, assimetrikda esa harflar ishlatiladi",
            "Simmetrikda shifrlash va ochish uchun bitta kalit, assimetrikda esa kalitlar juftligi (ochiq va maxfiy) ishlatiladi",
            "Simmetrik shifrlash faqat offline rejimda, assimetrik esa faqat internetda ishlaydi",
            "Simmetrik shifrlash xavfsiz emas, assimetrik shifrlashni esa umuman buzib bo'lmaydi"
        ],
        correct: 1,
        explanation: "Simmetrik shifrlashda (masalan, AES) bitta umumiy maxfiy kalit ishlatiladi. Assimetrik shifrlashda (masalan, RSA) ikkita bog'liq kalit: hamma bilishi mumkin bo'lgan Ochiq kalit (Public key) va faqat egasida saqlanadigan Maxfiy kalit (Private key) mavjud."
    },
    {
        id: 2,
        moduleId: "cryptography",
        moduleName: "Kriptografiya",
        question: "Kriptografik xesh-funksiyalar (masalan, SHA-256) qanday muhim xususiyatga ega?",
        options: [
            "Xesh qiymatidan asl matnni osonlikcha qayta tiklash mumkin",
            "Matn qanchalik uzun bo'lishidan qat'i nazar, xesh qiymati qat'iy belgilangan uzunlikda bo'ladi va bir tomonlama (qaytmas) ishlaydi",
            "Bir xil matn har safar har xil xesh natija beradi",
            "Faqat parollarni shifrlash uchun mo'ljallangan va fayllar uchun ishlamaydi"
        ],
        correct: 1,
        explanation: "Kriptografik xesh-funksiya har qanday hajmdagi ma'lumotni belgilangan uzunlikdagi (SHA-256 da 256 bit / 64 belgili hex) xeshga aylantiradi. U bir tomonlama bo'lib, xeshdan asl ma'lumotni qayta tiklab bo'lmaydi (pre-image resistance)."
    },
    {
        id: 3,
        moduleId: "network-security",
        moduleName: "Tarmoq Xavfsizligi",
        question: "OSI modelining qaysi pog'onasida IP manzillar bilan yo'naltirish (routing) amalga oshiriladi?",
        options: [
            "2-pog'ona: Kanal (Data Link Layer)",
            "3-pog'ona: Tarmoq (Network Layer)",
            "4-pog'ona: Transport (Transport Layer)",
            "7-pog'ona: Amaliy (Application Layer)"
        ],
        correct: 1,
        explanation: "OSI modelining 3-pog'onasi bo'lgan Tarmoq pog'onasi (Network Layer) mantiqiy adreslash (IP) va paketlarni tarmoqlar o'rtasida yo'naltirish (routing) uchun javobgardir. Routers aynan shu pog'onada ishlaydi."
    },
    {
        id: 4,
        moduleId: "network-security",
        moduleName: "Tarmoq Xavfsizligi",
        question: "Firewall (tarmoqlararo ekran) ning asosiy vazifasi nima?",
        options: [
            "Kompyuterdagi barcha xatolarni avtomatik ravishda dasturlash",
            "Internet tezligini 2 barobarga oshirish",
            "Oldindan belgilangan xavfsizlik qoidalariga asosan kiruvchi va chiquvchi tarmoq trafigini tahlil qilish va filtrlash",
            "Kompyuterning qattiq diskidagi fayllarni siqish (zip qilish)"
        ],
        correct: 2,
        explanation: "Firewall tarmoq perimetrini himoya qiluvchi to'siq bo'lib, paketlarning IP manzili, porti va holatini tekshirib, xavfsizlik qoidalari asosida ruxsat beradi yoki bloklaydi."
    },
    {
        id: 5,
        moduleId: "network-security",
        moduleName: "Tarmoq Xavfsizligi",
        question: "HTTPS protokoli HTTP dan nimasi bilan afzal va qanday himoya beradi?",
        options: [
            "Faqat sahifani tezroq yuklaydi",
            "TLS/SSL shifrlash orqali foydalanuvchi va server o'rtasidagi ma'lumotlar maxfiyligi va butunligini ta'minlaydi",
            "Kompyuterni har qanday viruslardan to'liq tozalaydi",
            "Faqat rasmlarni siqib yuklash imkonini beradi"
        ],
        correct: 1,
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) ma'lumotlarni ochiq holda emas, balki TLS shifrlash orqali uzatadi. Bu Man-in-the-Middle (MITM) hujumlarining oldini oladi va login, parol, karta ma'lumotlarini o'g'irlanishdan asraydi."
    },
    {
        id: 6,
        moduleId: "threat-detection",
        moduleName: "Tahdidlarni Aniqlash",
        question: "Ransomware (tovlamachi dastur) qanday ishlaydi va uning maqsadi nima?",
        options: [
            "Foydalanuvchi fayllarini kuchli algoritmlar bilan shifrlab, ochish kaliti uchun to'lov talab qiladi",
            "Faqat brauzer tarixini tozalab tashlaydi",
            "Kompyuter klaviaturasidagi tugmalarni o'rganadi",
            "Foydalanuvchiga bepul antivirus taklif qilib tizimni tezlashtiradi"
        ],
        correct: 0,
        explanation: "Ransomware — bu jabrlanuvchining hujjatlari va fayllarini kriptografik tarzda shifrlab qo'yuvchi va ularni deshifrlash evaziga ko'pincha kriptovalyutada to'lov (tovon) talab qiluvchi xavfli zararli dastur turidir."
    },
    {
        id: 7,
        moduleId: "threat-detection",
        moduleName: "Tahdidlarni Aniqlash",
        question: "Phishing (fishing) hujumining eng xarakterli belgilaridan biri qaysi?",
        options: [
            "Rasmiy davlat saytidan kelgan sertifikatlangan xabar",
            "Shoshilinch talab ('Akkauntingiz 24 soatda yopiladi!') va soxta domen havolasi (masalan, payme-security.cc)",
            "Dasturchilar tomonidan yozilgan toza ochiq kodli dastur",
            "Operatsion tizimning rasmiy yangilanish bildirishnomasi"
        ],
        correct: 1,
        explanation: "Fishing hujumlari ijtimoiy muhandislikka (social engineering) asoslanadi. Ular shoshilinchlik tuyg'usini uyg'otish, qo'rqitish yoki qiziqtirish orqali odamlarni soxta havolalarga kirishga va shaxsiy ma'lumotlarini kiritishga majburlaydi."
    },
    {
        id: 8,
        moduleId: "threat-detection",
        moduleName: "Tahdidlarni Aniqlash",
        question: "SQL Injection (SQLi) hujumi veb-ilovada qanday xatolik tufayli yuzaga keladi?",
        options: [
            "Foydalanuvchi kiritgan ma'lumotlar to'g'ri tekshirilmasdan (sanitizatsiya qilinmasdan) to'g'ridan-to'g'ri SQL so'rovga qo'shib yuborilganda",
            "Serverda elektr ta'minoti uzilib qolganda",
            "Foydalanuvchi brauzerida kesh tozalanganda",
            "Faqat CSS stillari noto'g'ri yozilganda"
        ],
        correct: 0,
        explanation: "SQL Injection zaifligi foydalanuvchi kiritgan kiruvchi parametrlar tekshirilmaganda vujudga keladi. Hujumchi maxsus SQL buyruqlarini (masalan, ' OR '1'='1) kiritib, ma'lumotlar bazasini ruxsatsiz o'qishi yoki o'chirishi mumkin. Parametrlashtirilgan so'rovlar (Prepared Statements) bunga qarshi asosiy qalqondir."
    },
    {
        id: 9,
        moduleId: "protection",
        moduleName: "Himoya Usullari",
        question: "Quyidagilardan qaysi biri eng kuchli va xavfsiz parol (passphrase) hisoblanadi?",
        options: [
            "Admin12345!",
            "Toshkent2024",
            "Moviy-Burgut#Samoda.987Parvoz!",
            "Qwertyuiop123"
        ],
        correct: 2,
        explanation: "Zamonaviy xavfsizlik standartlariga ko'ra, bir necha mustaqil so'zlardan iborat uzun iboralar (passphrase) — uzunligi 16+ belgi, turli registr, raqam va maxsus belgilarga ega bo'lib, brute-force yoki lug'at hujumlariga qarshi nihoyatda chidamli bo'ladi."
    },
    {
        id: 10,
        moduleId: "protection",
        moduleName: "Himoya Usullari",
        question: "Ko'p omilli autentifikatsiyadagi (MFA) uchta asosiy omil toifasi nimalardan iborat?",
        options: [
            "Ism, Familiya, Sharif",
            "Biladigan narsa (parol), Egalik qiladigan narsa (telefon/token), Shaxsiy xususiyat (barmoq izi/biometriya)",
            "Login, Email, Telefon raqam",
            "Brauzer turi, Internet provayder, IP manzil"
        ],
        correct: 1,
        explanation: "MFA uch xil mustaqil toifaga asoslanadi: Something you know (biladigan narsangiz: parol/PIN), Something you have (egalik qiladigan narsangiz: SMS/Authenticator ilovasi/xavfsizlik kaliti) va Something you are (biometriya: barmoq izi, yuz qiyofasi)."
    },
    {
        id: 11,
        moduleId: "protection",
        moduleName: "Himoya Usullari",
        question: "Zaxira nusxalashdagi mashhur '3-2-1 qoidasi' nimani anglatadi?",
        options: [
            "Har 3 kunda 2 marta 1 soatdan nusxa olish",
            "3 ta nusxa saqlash, 2 xil turdagi tashuvchida, kamida 1 tasini boshqa joyda (offsite/bulutda) saqlash",
            "3 ta kompyuter, 2 ta fleshka va 1 ta printer ishlatish",
            "3 daqiqada 2 ta faylni 1 ta papkaga ko'chirish"
        ],
        correct: 1,
        explanation: "3-2-1 zaxiralash oltin qoidasi: Ma'lumotlarning kamida 3 ta nusxasi bo'lishi kerak, ular 2 xil turdagi axborot tashuvchida (masalan, mahalliy disk va NAS) saqlanishi kerak va kamida 1 nusxasi uzoqda/bulutda (off-site) bo'lishi lozim."
    },
    {
        id: 12,
        moduleId: "risk-management",
        moduleName: "Siyosat va Risklar",
        question: "Axborot xavfsizligining tayanch ustuni bo'lgan CIA Triadasi nimalarni ifodalaydi?",
        options: [
            "Control, Inspection, Audit (Nazorat, Tekshiruv, Audit)",
            "Confidentiality, Integrity, Availability (Maxfiylik, Butunlik, Foydalana olishlik)",
            "Computer, Internet, Antivirus (Kompyuter, Internet, Antivirus)",
            "Cyber, Intelligence, Agency (Kiber, Razvedka, Agentlik)"
        ],
        correct: 1,
        explanation: "CIA uchligi — axborot xavfsizligining fundamental modeli bo'lib, Maxfiylik (Confidentiality - ruxsatsiz shaxslardan yashirish), Butunlik (Integrity - ma'lumotlarning o'zgartirilmasligi) va Foydalana olishlik (Availability - kerak bo'lganda tizimning ishlashi)ni ta'minlaydi."
    },
    {
        id: 13,
        moduleId: "risk-management",
        moduleName: "Siyosat va Risklar",
        question: "Kiberxavfsizlikda riskni baholash formulasi qanday ifodalanadi?",
        options: [
            "Risk = Kompyuter narxi + Dastur narxi",
            "Risk = Tahdid (Threat) × Zaiflik (Vulnerability) × Ta'sir darajasi (Impact)",
            "Risk = Antiviruslar soni / Parol uzunligi",
            "Risk = Internet tezligi × Xodimlar soni"
        ],
        correct: 1,
        explanation: "Kiberxavfsizlikda risk miqdori — mavjud Zaiflik (zaif nuqta), ushbu zaiflikdan foydalanishi mumkin bo'lgan Tahdid va buning natijasida biznes yoki tizimga yetishi mumkin bo'lgan Salbiy ta'sir ko'paytmasi orqali hisoblanadi."
    },
    {
        id: 14,
        moduleId: "cyber-law",
        moduleName: "Qonunchilik va Etika",
        question: "'White Hat' (Oq qalpoqli) xakerlar 'Black Hat' (Qora qalpoqli) lardan nimasi bilan tubdan farq qiladi?",
        options: [
            "Oq qalpoqlilar faqat Windows tizimlarida ishlaydi",
            "Oq qalpoqlilar tizim egasining rasmiy ruxsati bilan zaifliklarni aniqlab, ularni tuzatish va himoyalash maqsadida xavfsizlik testini o'tkazadi",
            "Oq qalpoqlilar faqat kunduzi ishlaydi, qora qalpoqlilar esa kechasi",
            "Oq qalpoqlilar dasturlashni bilmaydi, faqat tayyor dasturlarni ishlatadi"
        ],
        correct: 1,
        explanation: "Oq qalpoqli xakerlar (axloqiy xakerlar / Ethical Hackers) qonuniy shartnoma va yozma ruxsat asosida ishlaydi. Ularning maqsadi tizimni buzish emas, balki kiberjinoyatchilar (Black Hat) dan oldin teshiklarni topib, tizimni mustahkamlashdir."
    },
    {
        id: 15,
        moduleId: "cyber-law",
        moduleName: "Qonunchilik va Etika",
        question: "Dasturiy ta'minotda xavfsizlik zaifligini topgan etuk mutaxassis qanday yo'l tutishi (Responsible Disclosure) lozim?",
        options: [
            "Zaiflikni darhol ijtimoiy tarmoqlarga yozib, tizimni omma oldida masxara qilishi kerak",
            "Zaiflikni darknet forumlarida sotishi kerak",
            "Tizim egasi yoki ishlab chiquvchiga maxfiy tarzda xabar berib, ularga xatoni tuzatish uchun yetarli vaqt berishi lozim",
            "Zaiflik orqali barcha ma'lumotlar bazasini o'chirib yuborishi kerak"
        ],
        correct: 2,
        explanation: "Mas'uliyatli xabar berish (Responsible Disclosure) etikasiga ko'ra, topilgan zaiflik haqida birinchi navbatda tizim ma'muriyatiga xabar beriladi. Kompaniyaga yamoq (patch) chiqarish uchun vaqt (odatda 30–90 kun) beriladi va faqat muammo bartaraf etilgach, umumiy xulosa e'lon qilinishi mumkin."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CYBER_QUIZ_QUESTIONS };
}
