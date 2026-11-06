/**
 * CYBER SECURITY BASICS 2.0 — INTERACTIVE LABS
 * Password Strength, Caesar Cipher, Phishing Challenge, Terminology Match, Risk Matrix, Scenarios
 */

const CyberLabs = (function() {
    function init() {
        initPasswordStrengthLab();
        initCaesarCipherLab();
        initPhishingLab();
        initTerminologyLab();
        initRiskMatrixLab();
        initSecurityScenariosLab();
    }

    // 1. PASSWORD STRENGTH ANALYZER
    function initPasswordStrengthLab() {
        const input = document.getElementById('passLabInput');
        if (!input) return;

        const meterFill = document.getElementById('passMeterFill');
        const scoreText = document.getElementById('passScoreText');
        const crackTimeText = document.getElementById('passCrackTime');
        const critLength = document.getElementById('critLength');
        const critUpper = document.getElementById('critUpper');
        const critLower = document.getElementById('critLower');
        const critNumber = document.getElementById('critNumber');
        const critSpecial = document.getElementById('critSpecial');

        input.addEventListener('input', () => {
            const val = input.value;
            let poolSize = 0;
            let hasLower = /[a-z]/.test(val);
            let hasUpper = /[A-Z]/.test(val);
            let hasNumber = /[0-9]/.test(val);
            let hasSpecial = /[^A-Za-z0-9]/.test(val);
            let isLong = val.length >= 12;

            if (hasLower) poolSize += 26;
            if (hasUpper) poolSize += 26;
            if (hasNumber) poolSize += 10;
            if (hasSpecial) poolSize += 33;

            // Update criteria items
            updateCrit(critLength, isLong);
            updateCrit(critLower, hasLower);
            updateCrit(critUpper, hasUpper);
            updateCrit(critNumber, hasNumber);
            updateCrit(critSpecial, hasSpecial);

            if (!val) {
                if (meterFill) { meterFill.style.width = '0%'; meterFill.style.backgroundColor = 'var(--danger-red)'; }
                if (scoreText) scoreText.textContent = 'Parolni kiriting';
                if (crackTimeText) crackTimeText.textContent = '—';
                return;
            }

            // Entropy calculation: E = L * log2(poolSize)
            const entropy = poolSize > 0 ? Math.round(val.length * (Math.log(poolSize) / Math.LN2)) : 0;
            let pct = Math.min(100, Math.round((entropy / 90) * 100));

            let rating = '';
            let color = '';
            let crackTime = '';

            if (entropy < 30) {
                rating = "Nihoyatda zaif (Xavfli)";
                color = "var(--danger-red)";
                crackTime = "Bir necha soniya ichida";
            } else if (entropy < 50) {
                rating = "O'rtacha zaif";
                color = "var(--warning-orange)";
                crackTime = "Bir necha soat yoki kun";
            } else if (entropy < 75) {
                rating = "Yaxshi (Yetarlicha kuchli)";
                color = "var(--neon-cyan)";
                crackTime = "Bir necha oy / yil";
            } else {
                rating = "A'lo darajada (Nihoyatda mustahkam)";
                color = "var(--cyber-green)";
                crackTime = "Minglab yoki millionlab yil";
            }

            if (meterFill) {
                meterFill.style.width = pct + '%';
                meterFill.style.backgroundColor = color;
            }
            if (scoreText) {
                scoreText.innerHTML = `<span style="color:${color}; font-weight:700;">${rating}</span> (${entropy} bit entropiya)`;
            }
            if (crackTimeText) {
                crackTimeText.innerHTML = `Xakerlik hisoblash vaqti: <strong style="color:${color};">${crackTime}</strong>`;
            }
        });

        function updateCrit(el, isValid) {
            if (!el) return;
            if (isValid) {
                el.classList.add('valid');
                el.querySelector('.crit-icon').textContent = '✅';
            } else {
                el.classList.remove('valid');
                el.querySelector('.crit-icon').textContent = '❌';
            }
        }
    }

    // 2. CAESAR CIPHER SIMULATOR
    function initCaesarCipherLab() {
        const input = document.getElementById('caesarInput');
        const shiftSlider = document.getElementById('caesarShift');
        const shiftVal = document.getElementById('caesarShiftVal');
        const output = document.getElementById('caesarOutput');
        if (!input || !shiftSlider || !output) return;

        function updateCipher() {
            const shift = parseInt(shiftSlider.value, 10);
            if (shiftVal) shiftVal.textContent = shift;
            const text = input.value;
            output.value = caesarShift(text, shift);
        }

        function caesarShift(str, amount) {
            if (amount < 0) return caesarShift(str, amount + 26);
            let result = '';
            for (let i = 0; i < str.length; i++) {
                let c = str[i];
                if (c.match(/[a-z]/i)) {
                    let code = str.charCodeAt(i);
                    // Uppercase
                    if (code >= 65 && code <= 90) {
                        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
                    }
                    // Lowercase
                    else if (code >= 97 && code <= 122) {
                        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
                    }
                }
                result += c;
            }
            return result;
        }

        input.addEventListener('input', updateCipher);
        shiftSlider.addEventListener('input', updateCipher);
        updateCipher();
    }

    // 3. PHISHING EMAIL CHALLENGE
    function initPhishingLab() {
        const spots = document.querySelectorAll('.phishing-spot');
        const counterEl = document.getElementById('phishingFoundCount');
        const descBox = document.getElementById('phishingDetailBox');
        if (!spots.length) return;

        let foundCount = 0;
        const total = spots.length;

        spots.forEach(spot => {
            spot.addEventListener('click', () => {
                if (!spot.classList.contains('revealed')) {
                    spot.classList.add('revealed');
                    foundCount++;
                    if (counterEl) counterEl.textContent = `${foundCount}/${total}`;

                    const detail = spot.getAttribute('data-explanation');
                    if (descBox) {
                        descBox.innerHTML = `<strong>⚠️ Qizil Bayroq Aniqlandi:</strong> ${detail}`;
                        descBox.style.display = 'block';
                    }

                    if (foundCount === total) {
                        if (descBox) {
                            descBox.innerHTML += `<br><span style="color:var(--cyber-green); font-weight:700;">🎉 Tabriklaymiz! Barcha 5 ta xavfli fishing belgilarini to'liq aniqladingiz!</span>`;
                        }
                    }
                } else {
                    const detail = spot.getAttribute('data-explanation');
                    if (descBox) {
                        descBox.innerHTML = `<strong>⚠️ Qizil Bayroq:</strong> ${detail}`;
                    }
                }
            });
        });
    }

    // 4. TERMINOLOGY MATCHING LAB
    function initTerminologyLab() {
        const termItems = document.querySelectorAll('.term-chip');
        const defItems = document.querySelectorAll('.def-card');
        const scoreEl = document.getElementById('termMatchScore');
        if (!termItems.length || !defItems.length) return;

        let selectedTerm = null;
        let matchedCount = 0;

        termItems.forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip.classList.contains('matched')) return;
                termItems.forEach(t => t.classList.remove('selected'));
                chip.classList.add('selected');
                selectedTerm = chip;
            });
        });

        defItems.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('matched') || !selectedTerm) return;
                const termId = selectedTerm.getAttribute('data-term');
                const defTarget = card.getAttribute('data-matches');

                if (termId === defTarget) {
                    // Match!
                    selectedTerm.classList.remove('selected');
                    selectedTerm.classList.add('matched');
                    card.classList.add('matched');
                    selectedTerm = null;
                    matchedCount++;
                    if (scoreEl) scoreEl.textContent = `${matchedCount}/4`;
                } else {
                    card.classList.add('wrong');
                    setTimeout(() => card.classList.remove('wrong'), 600);
                }
            });
        });
    }

    // 5. RISK ASSESSMENT MATRIX (5x5)
    function initRiskMatrixLab() {
        const cells = document.querySelectorAll('.risk-cell');
        const resultVal = document.getElementById('riskCalcScore');
        const resultCat = document.getElementById('riskCalcCategory');
        const resultAdvice = document.getElementById('riskCalcAdvice');
        if (!cells.length) return;

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                cells.forEach(c => c.style.outline = 'none');
                cell.style.outline = '3px solid #FFF';

                const likelihood = parseInt(cell.getAttribute('data-l'), 10);
                const impact = parseInt(cell.getAttribute('data-i'), 10);
                const score = likelihood * impact;

                let cat = '';
                let color = '';
                let advice = '';

                if (score <= 4) {
                    cat = "Past Risk (Low)";
                    color = "var(--cyber-green)";
                    advice = "Oddiy monitoring kifoya. Xatarni qabul qilish mumkin.";
                } else if (score <= 9) {
                    cat = "O'rta Risk (Medium)";
                    color = "var(--warning-orange)";
                    advice = "Xavfsizlik choralarini kuchaytirish va rejali himoya o'rnatish lozim.";
                } else if (score <= 16) {
                    cat = "Yuqori Risk (High)";
                    color = "var(--danger-red)";
                    advice = "Zudlik bilan choralar ko'rilishi va rahbariyatga bildirilishi shart.";
                } else {
                    cat = "Kritik Risk (Critical)";
                    color = "#FF4560";
                    advice = "Favqulodda xavf! Tizimni zudlik bilan to'xtatish yoki zudlik bilan patch qilish talab etiladi.";
                }

                if (resultVal) resultVal.textContent = `${likelihood} × ${impact} = ${score}`;
                if (resultCat) {
                    resultCat.textContent = cat;
                    resultCat.style.color = color;
                }
                if (resultAdvice) resultAdvice.textContent = advice;
            });
        });
    }

    // 6. SECURITY SCENARIOS
    function initSecurityScenariosLab() {
        const optionBtns = document.querySelectorAll('.scenario-opt-btn');
        if (!optionBtns.length) return;

        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.scenario-card');
                const isCorrect = btn.getAttribute('data-correct') === 'true';
                const feedbackEl = parent.querySelector('.scenario-feedback');

                parent.querySelectorAll('.scenario-opt-btn').forEach(b => {
                    b.disabled = true;
                    if (b.getAttribute('data-correct') === 'true') {
                        b.style.borderColor = 'var(--cyber-green)';
                        b.style.background = 'rgba(0, 255, 157, 0.15)';
                    }
                });

                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    if (isCorrect) {
                        feedbackEl.innerHTML = `<span style="color:var(--cyber-green); font-weight:700;">✅ To'g'ri qaror!</span> ${btn.getAttribute('data-feedback')}`;
                    } else {
                        btn.style.borderColor = 'var(--danger-red)';
                        btn.style.background = 'rgba(255, 69, 96, 0.15)';
                        feedbackEl.innerHTML = `<span style="color:var(--danger-red); font-weight:700;">❌ Xavfli qaror!</span> ${btn.getAttribute('data-feedback')}`;
                    }
                }
            });
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', CyberLabs.init);
