# 🛡️ CYBER SECURITY BASICS 2.0 — Kiberxavfsizlik Akademiyasi

> **Premium Cyberpunk + Hacker Terminal + Glassmorphism + Modern EdTech Dashboard**  
> O'zbek tilidagi to'liq, interaktiv, responsive va amaliy kiberxavfsizlik o'quv platformasi.

---

## 📋 Loyiha Haqida

**Cyber Security Basics 2.0** — axborot xavfsizligi, kriptografiya, tarmoq mudofaasi, kiberhujumlar va axborot huquqini noldan professional darajagacha o'rgatuvchi zamonaviy ochiq platforma.

Loyiha toza **HTML5, CSS3 va Vanilla JavaScript (ES6+)** da yaratilgan bo'lib, hech qanday og'ir freymvorklar yoki tashqi server/backendga bog'liq emas. Sayt **GitHub Pages** da to'g'ridan-to'g'ri 100% statik tarzda ishlaydi.

---

## ✨ Asosiy Imkoniyatlar va Xususiyatlar

- 🚀 **Cinematic Cyber Hero:** Matrix rain canvas effekti, terminal boot animatsiyasi va real vaqt statistikasi.
- 🎨 **Design System:** Neon cyan (`#00E5FF`), cyber green (`#00FF9D`), dark background (`#050B16`), 3D tilt hover effektlari va glassmorphism kartochkalar.
- 🌓 **Dark / Light Theme:** To'liq moslashuvchan mavzular tizimi (LocalStorage-da saqlanadi).
- 📚 **6 Ta O'quv Moduli & 30 Ta Dars:**
  1. **Kriptografiya** (`cryptography.html`): 5 ta dars + Caesar Cipher simulyatori
  2. **Tarmoq Xavfsizligi** (`network-security.html`): 5 ta dars + OSI & Portlar tahlili
  3. **Tahdidlarni Aniqlash** (`threat-detection.html`): 5 ta dars + Phishing challenge
  4. **Himoya Usullari** (`protection.html`): 5 ta dars + Password Strength Analyzer
  5. **Siyosat va Risklar** (`risk-management.html`): 5 ta dars + 5x5 Risk Matritsasi
  6. **Qonunchilik va Etika** (`cyber-law.html`): 5 ta dars + O'zbekiston kiberhuquqi & Bug Bounty
- 🧪 **Cyber Lab (`cyber-lab.html`):** 6 ta xavfsiz interaktiv laboratoriya:
  - Password Strength & Entropy Analyzer
  - Caesar Cipher Simulator
  - Phishing Email Detection Challenge
  - Cybersecurity Terminology Matching
  - 5x5 Risk Assessment Matrix
  - Kiber-Hodisa Bo'yicha Qaror Qabul Qilish Senariylari
- 🧠 **15 Savollik Bilim Testi (`quiz.html`):** 
  - Dynamic question palette (1..15)
  - Conic-gradient aylanma ball indikatori
  - Har bir savol uchun batafsil izoh va tahlil
  - Natijalarni LocalStorage-da saqlash
- 📊 **Shaxsiy Dashboard (`dashboard.html`):**
  - O'zlashtirilgan darslar hisoblagichi (X / 30)
  - Umumiy progress foizi
  - O'quv faolligi (Streak - o'rganilgan kunlar soni)
  - Test natijalari tarixi
  - Tavsiya etilgan keyingi dars
- 📱 **100% Responsive Dizayn:** 320px mobil ekranlardan boshlab katta monitorlargacha mukammal moslashuv.

---

## 📁 Fayllar Strukturasi

```text
Cyber-Security-Basics/
├── index.html                  # Bosh sahifa (Cinematic Cyber Hero & Modullar)
├── cryptography.html           # Modul 1: Kriptografiya (5 ta dars + demo)
├── network-security.html       # Modul 2: Tarmoq Xavfsizligi (5 ta dars)
├── threat-detection.html       # Modul 3: Tahdidlarni Aniqlash (5 ta dars)
├── protection.html             # Modul 4: Himoya Usullari (5 ta dars)
├── risk-management.html        # Modul 5: Siyosat va Risklar (5 ta dars)
├── cyber-law.html              # Modul 6: Qonunchilik va Etika (5 ta dars)
├── cyber-lab.html              # Interaktiv Kiber-Laboratoriya (6 ta simulyator)
├── quiz.html                   # 15 savollik yakuniy test tizimi
├── dashboard.html              # Shaxsiy o'quv monitoringi va natijalar
├── about.html                  # Platforma haqida, missiya va FAQ
├── basics.html                 # Modullar mundarijasi (retro moslik)
├── threats.html                # Tahdidlar sahifasi yo'naltirgichi
│
├── css/
│   ├── variables.css           # Dizayn tokenlari, ranglar va o'lchamlar
│   ├── base.css                # Tipografiya, reset va cyber grid fon
│   ├── components.css          # Navbar, tugmalar, kartochkalar, footer
│   ├── animations.css          # Matrix, neon glow, 3D tilt, scroll reveal
│   ├── modules.css             # Darslar layouti, sidebar, progress bar
│   ├── responsive.css          # Mobil va planshet moslashuvchanligi
│   └── style.css               # Barcha CSS fayllarini birlashtiruvchi master fayl
│
├── js/
│   ├── storage.js              # LocalStorage boshqaruvi (darslar, streak, quiz)
│   ├── navigation.js           # Navbar, mobil drawer va dark/light toggle
│   ├── animations.js           # Matrix canvas, terminal boot, 3D tilt, counters
│   ├── lessons.js              # Darslar navigatsiyasi, progress bar, darsni yakunlash
│   ├── labs.js                 # 6 ta interaktiv laboratoriya mantiqlari
│   ├── quiz.js                 # 15 savollik test tizimi va tahlil
│   ├── dashboard.js            # Dashboard grafiklari va tavsiyalar
│   └── main.js                 # Asosiy dastur ishga tushiruvchisi
│
├── data/
│   ├── questions.js            # 15 ta sinov savollari va batafsil izohlari
│   └── lessons-data.js         # 30 ta darsning metama'lumotlari
│
└── images/
    └── image.png               # Platforma logotipi va favikoni
```

---

## 🚀 Ishga Tushirish (Deployment & Quickstart)

Loyiha to'liq statik veb-sayt bo'lgani sababli hech qanday `npm install` yoki kompilyatsiya talab qilinmaydi.

### 1-usul: Mahalliy brauzerda ochish
Istalgan faylni (masalan, `index.html`) brauzeringizda ikki marta bosib oching.

### 2-usul: Mahalliy server bilan ochish (tavsiya etiladi)
Python yoki VS Code Live Server orqali:
```bash
# Python 3 orqali
python -m http.server 8000
```
So'ngra brauzeringizda `http://localhost:8000` manzilini oching.

### 3-usul: GitHub Pages
Loyihani GitHub-ga yuklang va Repository sozlamalarida:  
`Settings` → `Pages` → `Branch: main / root` ni tanlang. Sayt avtomatik tarzda bepul global internetga chiqadi!

---

## ⚖️ Litsenziya va Etika

Barcha o'quv materiallari axborot xavfsizligini ta'minlash va mudofaa ko'nikmalarini oshirish uchun mo'ljallangan.

© 2026 **Cyber Security Basics**. Barcha huquqlar himoyalangan.
