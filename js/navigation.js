/**
 * CYBER SECURITY BASICS 2.0 — NAVIGATION & THEME CONTROLLER
 * Handles sticky glass navbar, active states, mobile drawer, theme toggle, and back-to-top
 */

const CyberNav = (function() {
    function init() {
        setupStickyNavbar();
        setupMobileDrawer();
        setupThemeToggle();
        setupBackToTop();
        highlightActiveLink();
    }

    function setupStickyNavbar() {
        const navbar = document.querySelector('.cyber-navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    function setupMobileDrawer() {
        const hamburger = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;

        function toggleMenu() {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== hamburger) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close when a link inside is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    function setupThemeToggle() {
        const toggleBtn = document.getElementById('themeToggleBtn');
        if (!toggleBtn) return;

        updateThemeIcon(CyberStorage.getTheme());

        toggleBtn.addEventListener('click', () => {
            const currentTheme = CyberStorage.getTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            CyberStorage.setTheme(newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const toggleBtn = document.getElementById('themeToggleBtn');
        if (!toggleBtn) return;

        if (theme === 'light') {
            toggleBtn.innerHTML = '🌙';
            toggleBtn.setAttribute('title', 'Tungi rejimga o\'tish');
            toggleBtn.setAttribute('aria-label', 'Dark Mode');
        } else {
            toggleBtn.innerHTML = '☀️';
            toggleBtn.setAttribute('title', 'Kunduzgi rejimga o\'tish');
            toggleBtn.setAttribute('aria-label', 'Light Mode');
        }
    }

    function setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (!backToTopBtn) return;

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function highlightActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-link');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', CyberNav.init);
