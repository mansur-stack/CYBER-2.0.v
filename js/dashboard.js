/**
 * CYBER SECURITY BASICS 2.0 — DASHBOARD CONTROLLER
 * Visualizes student progress, completed lessons, streak, quiz records, and recommendations
 */

const CyberDashboard = (function() {
    function init() {
        const dashboardPage = document.getElementById('dashboardView');
        if (!dashboardPage) return;

        renderStats();
        renderModuleBreakdown();
        renderQuizHistory();
        renderRecommendedLesson();
        setupResetButton();
    }

    function renderStats() {
        const summary = CyberStorage.getProgressSummary();
        const streak = CyberStorage.getStreakCount();
        const bestScore = CyberStorage.getQuizBestScore();

        const completedEl = document.getElementById('dashCompletedCount');
        const progressPctEl = document.getElementById('dashProgressPct');
        const streakEl = document.getElementById('dashStreakCount');
        const bestScoreEl = document.getElementById('dashBestScore');

        if (completedEl) completedEl.textContent = `${summary.completedCount} / ${summary.totalCount}`;
        if (progressPctEl) progressPctEl.textContent = `${summary.percentage}%`;
        if (streakEl) streakEl.textContent = `${streak} Kun`;
        if (bestScoreEl) {
            bestScoreEl.textContent = bestScore ? `${bestScore.percentage}%` : 'Topshirilmagan';
        }

        const overallBar = document.getElementById('dashOverallBar');
        if (overallBar) overallBar.style.width = `${summary.percentage}%`;
    }

    function renderModuleBreakdown() {
        const container = document.getElementById('dashModulesGrid');
        if (!container || typeof CYBER_MODULES_DATA === 'undefined') return;

        const completedLessons = CyberStorage.getCompletedLessons();
        let cardsHtml = '';

        CYBER_MODULES_DATA.forEach(mod => {
            const modCompleted = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
            const pct = Math.round((modCompleted / mod.lessons.length) * 100);

            cardsHtml += `
                <div class="cyber-card" style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.75rem;">${mod.icon}</span>
                            <div>
                                <h4 style="margin: 0; font-size: 1.1rem;">${mod.title}</h4>
                                <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
                                    ${modCompleted} / ${mod.lessons.length} dars tugatildi
                                </span>
                            </div>
                        </div>
                        <span class="cyber-badge ${pct === 100 ? 'badge-green' : 'badge-cyan'}">
                            ${pct}%
                        </span>
                    </div>

                    <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; margin-bottom: 1rem;">
                        <div style="height: 100%; width: ${pct}%; background: var(--gradient-accent); transition: width 0.3s ease;"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">
                            ${pct === 100 ? '✅ To\'liq yakunlandi' : 'Davom ettirish lozim'}
                        </span>
                        <a href="${mod.url}" class="cyber-btn cyber-btn-outline cyber-btn-sm">
                            Modulni ochish →
                        </a>
                    </div>
                </div>
            `;
        });

        container.innerHTML = cardsHtml;
    }

    function renderQuizHistory() {
        const listEl = document.getElementById('dashQuizHistoryList');
        if (!listEl) return;

        const history = CyberStorage.getQuizHistory();
        if (!history.length) {
            listEl.innerHTML = `
                <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); background: rgba(5,11,22,0.5); border-radius: var(--radius-md);">
                    Siz hali bilim testingizni topshirmadingiz. 
                    <br><br>
                    <a href="quiz.html" class="cyber-btn cyber-btn-primary cyber-btn-sm">Quizni boshlash →</a>
                </div>
            `;
            return;
        }

        let html = '<div style="display: flex; flex-direction: column; gap: 0.85rem;">';
        history.slice(0, 5).forEach((record, i) => {
            let color = record.percentage >= 85 ? 'var(--cyber-green)' : (record.percentage >= 70 ? 'var(--neon-cyan)' : 'var(--warning-orange)');
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.25rem; background: rgba(6,13,26,0.6); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <div>
                        <strong style="color: var(--text-main);">#${i + 1} Urinish — ${record.formattedDate || 'Yaqinda'}</strong>
                        <div style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
                            ${record.score} / ${record.total} to'g'ri javob
                        </div>
                    </div>
                    <span style="font-family: var(--font-mono); font-weight: 700; font-size: 1.2rem; color: ${color};">
                        ${record.percentage}%
                    </span>
                </div>
            `;
        });
        html += '</div>';
        listEl.innerHTML = html;
    }

    function renderRecommendedLesson() {
        const box = document.getElementById('dashRecommendedBox');
        if (!box || typeof CYBER_MODULES_DATA === 'undefined') return;

        const completed = CyberStorage.getCompletedLessons();

        // Find the first uncompleted lesson across all modules
        let nextLesson = null;
        let parentMod = null;

        for (const mod of CYBER_MODULES_DATA) {
            for (const l of mod.lessons) {
                if (!completed.includes(l.id)) {
                    nextLesson = l;
                    parentMod = mod;
                    break;
                }
            }
            if (nextLesson) break;
        }

        if (nextLesson && parentMod) {
            box.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <span class="section-tag" style="margin-bottom: 0.4rem;">Tavsiya etilgan keyingi dars</span>
                        <h3 style="margin-bottom: 0.3rem;">${parentMod.icon} ${nextLesson.title}</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">
                            Modul: ${parentMod.title} • Vaqt: ${nextLesson.duration}
                        </p>
                    </div>
                    <a href="${parentMod.url}#${nextLesson.id}" class="cyber-btn cyber-btn-primary">
                        Darsni boshlash →
                    </a>
                </div>
            `;
        } else {
            box.innerHTML = `
                <div style="text-align: center; padding: 1rem;">
                    <span style="font-size: 2rem;">🏆</span>
                    <h3>Tabriklaymiz! Barcha 30 ta darsni muvaffaqiyatli yakunladingiz!</h3>
                    <p style="color: var(--text-secondary);">Bilimlaringizni sinash uchun 15 savollik yakuniy Quizni topshiring yoki Cyber Lab-da mashq qiling.</p>
                    <a href="quiz.html" class="cyber-btn cyber-btn-success">Bilimni Tekshirish (Quiz) →</a>
                </div>
            `;
        }
    }

    function setupResetButton() {
        const resetBtn = document.getElementById('dashResetProgressBtn');
        if (!resetBtn) return;

        resetBtn.addEventListener('click', () => {
            if (confirm("Haqiqatan ham barcha o'quv natijalari va dars belgilarini tozalashni xohlaysizmi?")) {
                CyberStorage.resetAllProgress();
                renderStats();
                renderModuleBreakdown();
                renderQuizHistory();
                renderRecommendedLesson();
                alert("O'quv natijalari muvaffaqiyatli qayta tiklandi.");
            }
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', CyberDashboard.init);
