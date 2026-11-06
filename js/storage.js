/**
 * CYBER SECURITY BASICS 2.0 — LOCAL STORAGE MANAGER
 * Manages theme, completed lessons, streak, quiz results, and progress
 */

const CyberStorage = (function() {
    const KEYS = {
        THEME: 'cyber_theme',
        COMPLETED_LESSONS: 'cyber_completed_lessons',
        QUIZ_HISTORY: 'cyber_quiz_history',
        QUIZ_BEST_SCORE: 'cyber_quiz_best_score',
        LAST_ACTIVITY: 'cyber_last_activity',
        STREAK_DAYS: 'cyber_streak_days'
    };

    function init() {
        // Record visit for streak
        recordActivity();
    }

    // THEME MANAGEMENT
    function getTheme() {
        return localStorage.getItem(KEYS.THEME) || 'dark';
    }

    function setTheme(theme) {
        localStorage.setItem(KEYS.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    // LESSONS PROGRESS
    function getCompletedLessons() {
        try {
            const data = localStorage.getItem(KEYS.COMPLETED_LESSONS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to parse completed lessons', e);
            return [];
        }
    }

    function isLessonCompleted(lessonId) {
        const completed = getCompletedLessons();
        return completed.includes(lessonId);
    }

    function toggleLessonCompletion(lessonId) {
        let completed = getCompletedLessons();
        const index = completed.indexOf(lessonId);
        let isNowCompleted = false;

        if (index > -1) {
            completed.splice(index, 1);
            isNowCompleted = false;
        } else {
            completed.push(lessonId);
            isNowCompleted = true;
        }

        localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
        recordActivity();
        return isNowCompleted;
    }

    function setLessonCompleted(lessonId, status = true) {
        let completed = getCompletedLessons();
        const index = completed.indexOf(lessonId);
        if (status && index === -1) {
            completed.push(lessonId);
        } else if (!status && index > -1) {
            completed.splice(index, 1);
        }
        localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
        recordActivity();
    }

    function getProgressSummary() {
        const completed = getCompletedLessons();
        const total = 30; // 6 modules * 5 lessons
        const percentage = Math.min(100, Math.round((completed.length / total) * 100));
        return {
            completedCount: completed.length,
            totalCount: total,
            percentage: percentage
        };
    }

    function getModuleProgress(moduleId) {
        const completed = getCompletedLessons();
        // Filter lessons belonging to this module
        const moduleLessons = completed.filter(id => id.startsWith(moduleId.substring(0, 4)) || id.includes(moduleId));
        const totalInModule = 5;
        return {
            completed: moduleLessons.length,
            total: totalInModule,
            percentage: Math.min(100, Math.round((moduleLessons.length / totalInModule) * 100))
        };
    }

    // QUIZ RESULTS
    function saveQuizResult(score, total, percentage, userAnswers) {
        const record = {
            id: Date.now(),
            date: new Date().toISOString(),
            formattedDate: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' }),
            score: score,
            total: total,
            percentage: percentage,
            userAnswers: userAnswers
        };

        let history = getQuizHistory();
        history.unshift(record);
        if (history.length > 20) history = history.slice(0, 20); // keep last 20
        localStorage.setItem(KEYS.QUIZ_HISTORY, JSON.stringify(history));

        // Check best score
        const best = getQuizBestScore();
        if (!best || percentage > best.percentage) {
            localStorage.setItem(KEYS.QUIZ_BEST_SCORE, JSON.stringify(record));
        }

        recordActivity();
        return record;
    }

    function getQuizHistory() {
        try {
            const data = localStorage.getItem(KEYS.QUIZ_HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    function getQuizBestScore() {
        try {
            const data = localStorage.getItem(KEYS.QUIZ_BEST_SCORE);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    // STREAK & ACTIVITY
    function recordActivity() {
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem(KEYS.LAST_ACTIVITY, todayStr);

        let streakDays = [];
        try {
            const raw = localStorage.getItem(KEYS.STREAK_DAYS);
            streakDays = raw ? JSON.parse(raw) : [];
        } catch (e) {
            streakDays = [];
        }

        if (!streakDays.includes(todayStr)) {
            streakDays.push(todayStr);
            // keep up to 90 days
            if (streakDays.length > 90) streakDays = streakDays.slice(-90);
            localStorage.setItem(KEYS.STREAK_DAYS, JSON.stringify(streakDays));
        }
    }

    function getStreakCount() {
        try {
            const raw = localStorage.getItem(KEYS.STREAK_DAYS);
            const days = raw ? JSON.parse(raw) : [];
            if (!days.length) return 1;

            // calculate consecutive days ending today or yesterday
            days.sort();
            let streak = 0;
            const today = new Date();
            today.setHours(0,0,0,0);

            for (let i = 0; i < 30; i++) {
                const checkDate = new Date(today);
                checkDate.setDate(today.getDate() - i);
                const str = checkDate.toISOString().split('T')[0];
                if (days.includes(str)) {
                    streak++;
                } else if (i === 0) {
                    // hasn't logged today yet, check yesterday
                    continue;
                } else {
                    break;
                }
            }
            return Math.max(1, streak);
        } catch (e) {
            return 1;
        }
    }

    function resetAllProgress() {
        localStorage.removeItem(KEYS.COMPLETED_LESSONS);
        localStorage.removeItem(KEYS.QUIZ_HISTORY);
        localStorage.removeItem(KEYS.QUIZ_BEST_SCORE);
        return true;
    }

    return {
        init,
        getTheme,
        setTheme,
        getCompletedLessons,
        isLessonCompleted,
        toggleLessonCompletion,
        setLessonCompleted,
        getProgressSummary,
        getModuleProgress,
        saveQuizResult,
        getQuizHistory,
        getQuizBestScore,
        getStreakCount,
        resetAllProgress
    };
})();

// Auto-initialize theme on script run
(function() {
    const savedTheme = CyberStorage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
})();
