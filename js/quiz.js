/**
 * CYBER SECURITY BASICS 2.0 — QUIZ ENGINE
 * Exactly 15 questions, interactive palette, score ring, breakdown & storage
 */

const CyberQuiz = (function() {
    let questions = [];
    let currentIndex = 0;
    let userAnswers = {}; // { questionId: optionIndex }
    let isCompleted = false;

    function init() {
        const quizContainer = document.getElementById('quizWrapper');
        if (!quizContainer) return;

        // Load 15 questions
        if (typeof CYBER_QUIZ_QUESTIONS !== 'undefined' && CYBER_QUIZ_QUESTIONS.length) {
            questions = CYBER_QUIZ_QUESTIONS.slice(0, 15);
        } else {
            console.error('Quiz questions not found!');
            return;
        }

        renderQuestion(0);
        renderPalette();
        setupControls();
    }

    function renderQuestion(index) {
        currentIndex = index;
        const q = questions[index];
        const container = document.getElementById('quizQuestionContainer');
        if (!container) return;

        // Update Counter & Progress Fill
        const counterEl = document.getElementById('quizCounterText');
        const progressFill = document.getElementById('quizProgressFill');
        if (counterEl) counterEl.textContent = `Savol ${index + 1} / ${questions.length}`;
        if (progressFill) progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;

        // Question HTML
        const selectedOption = userAnswers[q.id];
        const letters = ['A', 'B', 'C', 'D'];

        let optionsHtml = '';
        q.options.forEach((opt, idx) => {
            const isSelected = selectedOption === idx;
            optionsHtml += `
                <div class="quiz-option-item ${isSelected ? 'selected' : ''}" data-opt-idx="${idx}">
                    <div class="quiz-option-letter">${letters[idx]}</div>
                    <div class="quiz-option-text">${opt}</div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="quiz-question-box">
                <div class="section-tag" style="margin-bottom: 0.75rem;">${q.moduleName}</div>
                <h3 class="quiz-question-title">${q.question}</h3>
                <div class="quiz-options-list">
                    ${optionsHtml}
                </div>
            </div>
        `;

        // Attach option click listeners
        const optElements = container.querySelectorAll('.quiz-option-item');
        optElements.forEach(item => {
            item.addEventListener('click', () => {
                const optIdx = parseInt(item.getAttribute('data-opt-idx'), 10);
                userAnswers[q.id] = optIdx;

                // Update UI state
                optElements.forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');

                renderPalette();
            });
        });

        updateNavButtons();
        renderPalette();
    }

    function renderPalette() {
        const paletteContainer = document.getElementById('quizPaletteContainer');
        if (!paletteContainer) return;

        let paletteHtml = '';
        questions.forEach((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            const classes = ['quiz-palette-btn'];
            if (isAnswered) classes.push('answered');
            if (isCurrent) classes.push('current');

            paletteHtml += `
                <button type="button" class="${classes.join(' ')}" data-q-idx="${idx}">
                    ${idx + 1}
                </button>
            `;
        });

        paletteContainer.innerHTML = paletteHtml;

        paletteContainer.querySelectorAll('.quiz-palette-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetIdx = parseInt(btn.getAttribute('data-q-idx'), 10);
                renderQuestion(targetIdx);
            });
        });
    }

    function setupControls() {
        const prevBtn = document.getElementById('quizPrevBtn');
        const nextBtn = document.getElementById('quizNextBtn');
        const submitBtn = document.getElementById('quizSubmitBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) renderQuestion(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < questions.length - 1) renderQuestion(currentIndex + 1);
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answeredCount = Object.keys(userAnswers).length;
                if (answeredCount < questions.length) {
                    if (!confirm(`Siz ${questions.length} ta savoldan ${answeredCount} tasiga javob berdingiz. Testni yakunlamoqchimisiz?`)) {
                        return;
                    }
                }
                finishQuiz();
            });
        }
    }

    function updateNavButtons() {
        const prevBtn = document.getElementById('quizPrevBtn');
        const nextBtn = document.getElementById('quizNextBtn');
        const submitBtn = document.getElementById('quizSubmitBtn');

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) {
            if (currentIndex === questions.length - 1) {
                nextBtn.style.display = 'none';
                if (submitBtn) submitBtn.style.display = 'inline-flex';
            } else {
                nextBtn.style.display = 'inline-flex';
                if (submitBtn) submitBtn.style.display = 'none';
            }
        }
    }

    function finishQuiz() {
        isCompleted = true;
        let score = 0;
        const total = questions.length;
        const moduleMistakes = {};

        questions.forEach(q => {
            const userAns = userAnswers[q.id];
            if (userAns === q.correct) {
                score++;
            } else {
                moduleMistakes[q.moduleName] = (moduleMistakes[q.moduleName] || 0) + 1;
            }
        });

        const percentage = Math.round((score / total) * 100);

        // Save to LocalStorage
        CyberStorage.saveQuizResult(score, total, percentage, userAnswers);

        // Render Results View
        renderResultsView(score, total, percentage, moduleMistakes);
    }

    function renderResultsView(score, total, percentage, moduleMistakes) {
        const quizWrapper = document.getElementById('quizWrapper');
        if (!quizWrapper) return;

        let badgeTitle = '';
        let badgeColor = '';
        let badgeMsg = '';

        if (percentage >= 85) {
            badgeTitle = "A'lo darajada (Kiber-Mutaxassis)";
            badgeColor = "var(--cyber-green)";
            badgeMsg = "Ajoyib natija! Siz kiberxavfsizlik asoslarini juda yaxshi o'zlashtirgansiz.";
        } else if (percentage >= 70) {
            badgeTitle = "Yaxshi (Kiber-Qo'riqchi)";
            badgeColor = "var(--neon-cyan)";
            badgeMsg = "Barakalla! Siz xavfsizlik qoidalarini yaxshi bilasiz, ba'zi mavzularni yana takrorlash foydali bo'ladi.";
        } else if (percentage >= 50) {
            badgeTitle = "Rivojlanmoqda (Amaliyotchi)";
            badgeColor = "var(--warning-orange)";
            badgeMsg = "Yaxshi urinish! Xatolaringiz ustida ishlab, darslarni qaytadan o'rganib chiqishni tavsiya qilamiz.";
        } else {
            badgeTitle = "Boshlang'ich (Kuzatuvchi)";
            badgeColor = "var(--danger-red)";
            badgeMsg = "Kiberxavfsizlik saboqlarini noldan boshlab o'rganishingiz va Cyber Lab simulyatorlarida mashq qilishingiz kerak.";
        }

        // Breakdown items
        const letters = ['A', 'B', 'C', 'D'];
        let breakdownHtml = '';

        questions.forEach((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correct;
            const userAnsText = userAns !== undefined ? `${letters[userAns]}) ${q.options[userAns]}` : "Javob berilmagan";
            const correctAnsText = `${letters[q.correct]}) ${q.options[q.correct]}`;

            breakdownHtml += `
                <div class="breakdown-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <strong style="color: var(--text-main);">#${idx + 1}. ${q.question}</strong>
                        <span class="cyber-badge ${isCorrect ? 'badge-green' : 'badge-orange'}">
                            ${isCorrect ? 'To\'g\'ri (+1)' : 'Xato (0)'}
                        </span>
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.3rem;">
                        Sizning javobingiz: <span style="color: ${isCorrect ? 'var(--cyber-green)' : 'var(--danger-red)'}; font-weight: 600;">${userAnsText}</span>
                    </div>
                    ${!isCorrect ? `
                    <div style="font-size: 0.9rem; color: var(--cyber-green); margin-bottom: 0.3rem;">
                        To'g'ri javob: <strong>${correctAnsText}</strong>
                    </div>` : ''}
                    <div class="breakdown-explanation">
                        💡 <strong>Izoh:</strong> ${q.explanation}
                    </div>
                </div>
            `;
        });

        // Recommendations
        let recHtml = '';
        const weakModules = Object.keys(moduleMistakes);
        if (weakModules.length > 0) {
            recHtml = `
                <div class="cyber-alert cyber-alert-warning" style="text-align: left; margin: 2rem 0;">
                    <div class="cyber-alert-icon">⚠️</div>
                    <div class="cyber-alert-content">
                        <h4>Qayta ko'rib chiqish tavsiya etiladigan modullar:</h4>
                        <p>${weakModules.join(', ')} bo'yicha bilimlaringizni mustahkamlash uchun tegishli darslarni qayta o'qib chiqing.</p>
                    </div>
                </div>
            `;
        }

        quizWrapper.innerHTML = `
            <div class="quiz-result-view">
                <div class="section-tag">Test Yakunlandi</div>
                <h2>Bilim Darajangiz Tahlili</h2>
                <p style="color: ${badgeColor}; font-weight: 700; font-size: 1.25rem; margin-top: 0.5rem;">
                    ${badgeTitle}
                </p>

                <div class="score-circle-container" style="--score-pct: ${percentage};">
                    <div class="score-circle-inner">
                        <div class="score-circle-val">${percentage}%</div>
                        <div class="score-circle-sub">${score} / ${total} To'g'ri</div>
                    </div>
                </div>

                <p style="max-width: 550px; margin: 0 auto 1.5rem; color: var(--text-secondary);">
                    ${badgeMsg}
                </p>

                ${recHtml}

                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
                    <button type="button" class="cyber-btn cyber-btn-primary" id="retryQuizBtn">
                        🔄 Qayta Sinab Ko'rish
                    </button>
                    <a href="dashboard.html" class="cyber-btn cyber-btn-secondary">
                        📊 Dashboardga O'tish
                    </a>
                </div>

                <h3 style="text-align: left; margin-bottom: 1.25rem;">Batafsil Savollar Tahlili:</h3>
                <div class="quiz-breakdown-list">
                    ${breakdownHtml}
                </div>
            </div>
        `;

        // Retry handler
        const retryBtn = document.getElementById('retryQuizBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                userAnswers = {};
                isCompleted = false;
                currentIndex = 0;
                window.location.reload();
            });
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', CyberQuiz.init);
