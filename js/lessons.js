/**
 * CYBER SECURITY BASICS 2.0 — LESSON CONTROLLER
 * Sidebar Navigation, Reading Progress Bar, Lesson Completion & Code Copy
 */

const CyberLessons = (function() {
    let currentLessonId = '';
    let currentModuleId = '';

    function init() {
        const modulePage = document.querySelector('[data-module-id]');
        if (!modulePage) return;

        currentModuleId = modulePage.getAttribute('data-module-id');
        setupReadingProgress();
        setupSidebarLinks();
        setupCompletionButtons();
        setupCopyCodeButtons();
        setupPaginationButtons();

        // Activate first lesson or URL hash lesson
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            switchLesson(hash);
        } else {
            const firstLesson = document.querySelector('.lesson-section');
            if (firstLesson) {
                switchLesson(firstLesson.id);
            }
        }

        updateSidebarState();
    }

    function setupReadingProgress() {
        const progressBar = document.getElementById('readingProgressBar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const scrollPct = (window.scrollY / docHeight) * 100;
                progressBar.style.width = Math.min(100, Math.max(0, scrollPct)) + '%';
            }
        }, { passive: true });
    }

    function setupSidebarLinks() {
        const links = document.querySelectorAll('.lesson-nav-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-lesson-id');
                if (targetId) {
                    switchLesson(targetId);
                    window.location.hash = targetId;
                    // Scroll to top of lesson content on mobile
                    if (window.innerWidth < 1024) {
                        const content = document.querySelector('.lesson-content');
                        if (content) {
                            content.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            });
        });
    }

    function switchLesson(lessonId) {
        currentLessonId = lessonId;

        // Hide all lesson sections, show active
        document.querySelectorAll('.lesson-section').forEach(sec => {
            sec.classList.remove('active');
        });

        const activeSec = document.getElementById(lessonId);
        if (activeSec) {
            activeSec.classList.add('active');
        }

        // Highlight sidebar link
        document.querySelectorAll('.lesson-nav-link').forEach(link => {
            if (link.getAttribute('data-lesson-id') === lessonId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update mark-completed button state
        updateCompletionButtonState(lessonId);
    }

    function setupCompletionButtons() {
        const markBtns = document.querySelectorAll('.mark-completed-btn');
        markBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const isNowDone = CyberStorage.toggleLessonCompletion(currentLessonId);
                updateCompletionButtonState(currentLessonId);
                updateSidebarState();

                // Small toast/animation
                btn.classList.add('pulse');
                setTimeout(() => btn.classList.remove('pulse'), 500);
            });
        });
    }

    function updateCompletionButtonState(lessonId) {
        const isDone = CyberStorage.isLessonCompleted(lessonId);
        const markBtns = document.querySelectorAll('.mark-completed-btn');
        markBtns.forEach(btn => {
            if (isDone) {
                btn.classList.add('completed');
                btn.innerHTML = '<span>✅</span> Yakunlandi (O\'chirish)';
            } else {
                btn.classList.remove('completed');
                btn.innerHTML = '<span>✔️</span> Darsni tugatdim deb belgilash';
            }
        });
    }

    function updateSidebarState() {
        const navItems = document.querySelectorAll('.lesson-nav-item');
        let completedInModule = 0;

        navItems.forEach(item => {
            const link = item.querySelector('.lesson-nav-link');
            if (link) {
                const id = link.getAttribute('data-lesson-id');
                if (CyberStorage.isLessonCompleted(id)) {
                    item.classList.add('completed');
                    completedInModule++;
                } else {
                    item.classList.remove('completed');
                }
            }
        });

        // Update progress bar in sidebar
        const totalLessons = navItems.length || 5;
        const pct = Math.round((completedInModule / totalLessons) * 100);
        const progressFill = document.getElementById('moduleProgressFill');
        const progressText = document.getElementById('moduleProgressText');

        if (progressFill) progressFill.style.width = pct + '%';
        if (progressText) progressText.textContent = `${completedInModule}/${totalLessons} (${pct}%)`;
    }

    function setupPaginationButtons() {
        const prevBtns = document.querySelectorAll('[data-action="prev-lesson"]');
        const nextBtns = document.querySelectorAll('[data-action="next-lesson"]');

        const lessonSections = Array.from(document.querySelectorAll('.lesson-section'));
        const lessonIds = lessonSections.map(sec => sec.id);

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentIdx = lessonIds.indexOf(currentLessonId);
                if (currentIdx > 0) {
                    switchLesson(lessonIds[currentIdx - 1]);
                    window.location.hash = lessonIds[currentIdx - 1];
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                }
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentIdx = lessonIds.indexOf(currentLessonId);
                if (currentIdx < lessonIds.length - 1) {
                    switchLesson(lessonIds[currentIdx + 1]);
                    window.location.hash = lessonIds[currentIdx + 1];
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                }
            });
        });
    }

    function setupCopyCodeButtons() {
        const copyBtns = document.querySelectorAll('.copy-code-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const snippet = btn.closest('.code-snippet-box').querySelector('pre');
                if (snippet) {
                    navigator.clipboard.writeText(snippet.innerText).then(() => {
                        const originalText = btn.textContent;
                        btn.textContent = 'Nusxalandi! ✓';
                        btn.style.color = 'var(--cyber-green)';
                        btn.style.borderColor = 'var(--cyber-green)';
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.color = '';
                            btn.style.borderColor = '';
                        }, 2000);
                    });
                }
            });
        });
    }

    return { init, switchLesson };
})();

document.addEventListener('DOMContentLoaded', CyberLessons.init);
