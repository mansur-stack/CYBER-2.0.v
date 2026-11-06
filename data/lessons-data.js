/**
 * CYBER SECURITY BASICS 2.0 — CURRICULUM LESSONS METADATA
 * 6 Modules × 5 Comprehensive Lessons = 30 Lessons
 */

const CYBER_MODULES_DATA = [
    {
        id: "cryptography",
        title: "Kriptografiya",
        icon: "🔐",
        url: "cryptography.html",
        badge: "Boshlang'ich - O'rta",
        color: "cyan",
        description: "Ma'lumotlarni shifrlash, xesh-funksiyalar, simmetrik va assimetrik kriptotizimlar hamda raqamli imzo asoslari.",
        lessonsCount: 5,
        lessons: [
            { id: "crypto-1", num: 1, title: "Kriptografiya nima va uning tarixi", duration: "12 daqiqa" },
            { id: "crypto-2", num: 2, title: "Shifrlash va deshifrlash asoslari", duration: "15 daqiqa" },
            { id: "crypto-3", num: 3, title: "Simmetrik va assimetrik shifrlash", duration: "18 daqiqa" },
            { id: "crypto-4", num: 4, title: "AES, RSA va ularning qo'llanilishi", duration: "20 daqiqa" },
            { id: "crypto-5", num: 5, title: "Hashing, SHA-256 va raqamli imzo", duration: "15 daqiqa" }
        ]
    },
    {
        id: "network-security",
        title: "Tarmoq Xavfsizligi",
        icon: "🌐",
        url: "network-security.html",
        badge: "O'rta daraja",
        color: "blue",
        description: "Kompyuter tarmoqlari, TCP/IP va OSI modeli, Firewall, VPN, HTTPS hamda Wi-Fi xavfsizligi arxitekturasi.",
        lessonsCount: 5,
        lessons: [
            { id: "net-1", num: 1, title: "Kompyuter tarmoqlari va xavfsizlik asoslari", duration: "14 daqiqa" },
            { id: "net-2", num: 2, title: "TCP/IP va OSI 7 pog'onali modeli", duration: "22 daqiqa" },
            { id: "net-3", num: 3, title: "Firewall qanday ishlaydi va konfiguratsiyasi", duration: "16 daqiqa" },
            { id: "net-4", num: 4, title: "VPN, DNS xavfsizligi va HTTPS protokoli", duration: "18 daqiqa" },
            { id: "net-5", num: 5, title: "Wi-Fi xavfsizligi va WPA3 standarti", duration: "15 daqiqa" }
        ]
    },
    {
        id: "threat-detection",
        title: "Tahdidlarni Aniqlash",
        icon: "⚠️",
        url: "threat-detection.html",
        badge: "Muhim ko'nikma",
        color: "orange",
        description: "Viruslar, Ransomware, Phishing, DoS/DDoS, SQL Injection va tarmoqdagi shubhali anomaliyalarni aniqlash.",
        lessonsCount: 5,
        lessons: [
            { id: "threat-1", num: 1, title: "Malware turlari: Virus, Worm va Ransomware", duration: "16 daqiqa" },
            { id: "threat-2", num: 2, title: "Phishing va ijtimoiy muhandislik tahlili", duration: "18 daqiqa" },
            { id: "threat-3", num: 3, title: "DoS va DDoS hujumlari mexanizmi", duration: "15 daqiqa" },
            { id: "threat-4", num: 4, title: "SQL Injection va XSS xavfi asoslari", duration: "20 daqiqa" },
            { id: "threat-5", num: 5, title: "Shubhali faollikni aniqlash va monitoring", duration: "15 daqiqa" }
        ]
    },
    {
        id: "protection",
        title: "Himoya Usullari",
        icon: "🛡️",
        url: "protection.html",
        badge: "Amaliy mudofaa",
        color: "green",
        description: "Kuchli parollar, ko'p omilli autentifikatsiya (MFA), antivirus/EDR, 3-2-1 zaxiralash va tizim gigiyenasi.",
        lessonsCount: 5,
        lessons: [
            { id: "prot-1", num: 1, title: "Kuchli parollar va Passphrase yaratish", duration: "14 daqiqa" },
            { id: "prot-2", num: 2, title: "Ko'p bosqichli autentifikatsiya (MFA va 2FA)", duration: "15 daqiqa" },
            { id: "prot-3", num: 3, title: "Antivirus va Endpoint Protection (EDR)", duration: "14 daqiqa" },
            { id: "prot-4", num: 4, title: "3-2-1 Zaxira nusxalash va Disaster Recovery", duration: "16 daqiqa" },
            { id: "prot-5", num: 5, title: "Qurilma, OS va brauzer xavfsizligi gigiyenasi", duration: "15 daqiqa" }
        ]
    },
    {
        id: "risk-management",
        title: "Siyosat va Risklarni Boshqarish",
        icon: "📋",
        url: "risk-management.html",
        badge: "Boshqaruv darajasi",
        color: "orange",
        description: "Axborot xavfsizligi siyosati, CIA Triadasi, risklarni baholash matritsasi va kiberhodisalarga javob berish.",
        lessonsCount: 5,
        lessons: [
            { id: "risk-1", num: 1, title: "Axborot xavfsizligi siyosati asoslari", duration: "15 daqiqa" },
            { id: "risk-2", num: 2, title: "CIA Triadasi: Maxfiylik, Butunlik, Foydalana olishlik", duration: "16 daqiqa" },
            { id: "risk-3", num: 3, title: "Risk assessment: Xatarlarni baholash formulasi", duration: "18 daqiqa" },
            { id: "risk-4", num: 4, title: "Incident Response: Kiberhodisaga munosabat rejasi", duration: "20 daqiqa" },
            { id: "risk-5", num: 5, title: "Biznes uzluksizligi va tiklanish strategiyasi", duration: "15 daqiqa" }
        ]
    },
    {
        id: "cyber-law",
        title: "Qonunchilik va Etika",
        icon: "⚖️",
        url: "cyber-law.html",
        badge: "Huquqiy va axloqiy",
        color: "cyan",
        description: "Kiberetika, White Hat vs Black Hat, shaxsiy ma'lumotlar xavfsizligi, O'zbekiston kiberhuquqi va Responsible Disclosure.",
        lessonsCount: 5,
        lessons: [
            { id: "law-1", num: 1, title: "Kiberetika va raqamli madaniyat qoidalari", duration: "12 daqiqa" },
            { id: "law-2", num: 2, title: "Xakerlik turlari: White Hat, Black Hat, Gray Hat", duration: "15 daqiqa" },
            { id: "law-3", num: 3, title: "Shaxsiy ma'lumotlarni himoya qilish prinsiplari", duration: "16 daqiqa" },
            { id: "law-4", num: 4, title: "O'zbekiston kiberxavfsizlik qonunchiligi sharhi", duration: "20 daqiqa" },
            { id: "law-5", num: 5, title: "Responsible Disclosure va Bug Bounty madaniyati", duration: "15 daqiqa" }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CYBER_MODULES_DATA };
}
