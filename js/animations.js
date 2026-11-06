/**
 * CYBER SECURITY BASICS 2.0 — ANIMATIONS & CINEMATIC EFFECTS
 * Matrix Rain, Terminal Boot, 3D Tilt, Scroll Reveal, Number Counters
 */

const CyberAnimations = (function() {
    function init() {
        initMatrixRain();
        initTerminalBoot();
        init3DTilt();
        initScrollReveal();
        initCounters();
    }

    // MATRIX RAIN CANVAS EFFECT
    function initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;

        // Respect prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight || 600;

        const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト0123456789$#%*+-/<>';
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);
        let drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -50);
        }

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement.offsetHeight || 600;
            columns = Math.floor(width / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -50);
            }
        });

        let lastTime = 0;
        const fps = 24;
        const interval = 1000 / fps;

        function draw(currentTime) {
            requestAnimationFrame(draw);

            const delta = currentTime - lastTime;
            if (delta < interval) return;
            lastTime = currentTime - (delta % interval);

            const isDark = CyberStorage.getTheme() !== 'light';
            ctx.fillStyle = isDark ? 'rgba(5, 11, 22, 0.12)' : 'rgba(240, 244, 248, 0.15)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = isDark ? '#00E5FF' : '#0284C7';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        requestAnimationFrame(draw);
    }

    // TERMINAL BOOT TYPEWRITER ANIMATION
    function initTerminalBoot() {
        const terminalBody = document.getElementById('terminalBoot');
        if (!terminalBody) return;

        const bootSequence = [
            { text: "> Initializing Cyber Security System...", color: "var(--neon-cyan)" },
            { text: "> Loading Security Modules [Crypto, Network, Threats, Defense]...", color: "var(--text-main)" },
            { text: "> Establishing Secure Encrypted Environment (TLS 1.3)...", color: "var(--text-main)" },
            { text: "> Access Granted. Welcome, Cyber Security Specialist.", color: "var(--cyber-green)" }
        ];

        let lineIdx = 0;
        terminalBody.innerHTML = '';

        function typeLine() {
            if (lineIdx >= bootSequence.length) {
                // Done, append blinking cursor
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'terminal-cursor';
                terminalBody.appendChild(cursorSpan);
                return;
            }

            const lineData = bootSequence[lineIdx];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            lineDiv.style.color = lineData.color;
            lineDiv.textContent = '';
            terminalBody.appendChild(lineDiv);

            let charIdx = 0;
            const textToType = lineData.text;

            const charTimer = setInterval(() => {
                lineDiv.textContent += textToType.charAt(charIdx);
                charIdx++;

                if (charIdx >= textToType.length) {
                    clearInterval(charTimer);
                    lineIdx++;
                    setTimeout(typeLine, 280);
                }
            }, 25);
        }

        setTimeout(typeLine, 400);
    }

    // 3D TILT EFFECT ON HOVER
    function init3DTilt() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) {
            return;
        }

        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // SCROLL REVEAL OBSERVER
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('active'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // NUMBER COUNTER ANIMATION
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        if (!('IntersectionObserver' in window)) {
            counters.forEach(el => el.textContent = el.getAttribute('data-counter'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-counter'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1500;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out quad
                        const current = Math.floor(progress * target);
                        el.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = target + suffix;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(el => observer.observe(el));
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', CyberAnimations.init);
