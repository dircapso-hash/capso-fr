document.addEventListener('DOMContentLoaded', function () {

    // --- Navigation Mobile (Drawer) ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');

    function openDrawer() {
        if (!navLinks) return;
        navLinks.classList.add('active');
        if (navOverlay) {
            navOverlay.style.display = 'block';
            // Force reflow for transition
            navOverlay.offsetHeight;
            navOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        if (!navLinks) return;
        navLinks.classList.remove('active');
        if (navOverlay) {
            navOverlay.classList.remove('active');
            setTimeout(() => { navOverlay.style.display = 'none'; }, 300);
        }
        document.body.style.overflow = '';
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks && navLinks.classList.contains('active')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    // Bouton fermer (X) dans le drawer
    if (navClose) {
        navClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDrawer();
        });
    }

    // Clic sur l'overlay pour fermer
    if (navOverlay) {
        navOverlay.addEventListener('click', closeDrawer);
    }

    // Touche Escape pour fermer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeDrawer();
        }
    });

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                closeDrawer();
            }
        });
    });

    // Swipe vers la droite pour fermer le drawer (gesture Android/iOS)
    let touchStartX = 0;
    let touchStartY = 0;
    if (navLinks) {
        navLinks.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        navLinks.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
            if (dx > 60 && dy < 50) {
                closeDrawer();
            }
        }, { passive: true });
    }

    // --- Sticky Header & Back to Top ---
    const mainNav = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        if (window.scrollY > 100) {
            mainNav.classList.add('scrolled');
            if (backToTop) backToTop.style.display = 'flex';
        } else {
            mainNav.classList.remove('scrolled');
            if (backToTop) backToTop.style.display = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Back to Top Action ---
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Scroll pour ancres ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Formulaire Audit ---
    const auditForm = document.getElementById('auditForm');

    if (auditForm) {
        auditForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Simulation d'envoi
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            btn.disabled = true;

            setTimeout(() => {
                // Message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <h4>Demande envoyée avec succès !</h4>
                            <p>Nous vous contacterons sous 24h pour planifier votre audit.</p>
                            <button class="close-message" style="margin-top:10px; padding:5px 10px; cursor:pointer;">Fermer</button>
                        `;
                successMessage.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: white;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                            z-index: 10000;
                            text-align: center;
                            max-width: 400px;
                            width: 90%;
                        `;

                document.body.appendChild(successMessage);

                // Fermer le message
                successMessage.querySelector('.close-message').addEventListener('click', () => {
                    document.body.removeChild(successMessage);
                });

                // Réinitialiser le formulaire
                auditForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Fermer automatiquement après 5 secondes
                setTimeout(() => {
                    if (document.body.contains(successMessage)) {
                        document.body.removeChild(successMessage);
                    }
                }, 5000);
            }, 1500);
        });
    }

    // --- Calendly Trigger ---
    const openCalendly = document.getElementById('openCalendly');
    if (openCalendly) {
        openCalendly.addEventListener('click', function (e) {
            e.preventDefault();

            // Récupérer les infos du formulaire si remplies
            let prefillData = {};
            const nameInput = document.querySelector('input[type="text"]');
            const emailInput = document.querySelector('input[type="email"]');
            const phoneInput = document.querySelector('input[type="tel"]');

            if (nameInput && nameInput.value) prefillData.name = nameInput.value;
            if (emailInput && emailInput.value) prefillData.email = emailInput.value;
            if (phoneInput && phoneInput.value) prefillData.phone = phoneInput.value;

            // URL Calendly (à remplacer par votre vrai lien)
            const calendlyUrl = 'https://calendly.com/votre-compte/audit-capso';

            // Ouvrir dans une popup
            const popupWidth = 600;
            const popupHeight = 700;
            const left = (window.screen.width - popupWidth) / 2;
            const top = (window.screen.height - popupHeight) / 2;

            window.open(
                calendlyUrl,
                'Calendly',
                `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
            );
        });
    }

    // --- Animation des statistiques ---
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', '').replace('%', ''));
            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 50; // 50 étapes
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent.includes('+') ? `+${target}%` : target;
                    clearInterval(timer);
                } else {
                    const displayValue = stat.textContent.includes('%')
                        ? `+${Math.floor(current)}%`
                        : Math.floor(current);
                    stat.textContent = displayValue;
                }
            }, 30);
        });
    }

    // Observer pour déclencher l'animation quand les stats sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) observer.observe(heroSection);

    // --- Gestion des erreurs d'images ---
    // (Désactivé car cela masque parfois les images locales valides si le chargement est asynchrone)
    /*
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
        });
    });
    */

    // --- Splash Screen Vidéo ---
    const splashScreen = document.getElementById('splashScreen');
    const splashVideo = document.getElementById('splashVideo');
    const skipSplashBtn = document.getElementById('skipSplash');

    if (splashScreen) {
        // ?intro=force dans l'URL pour rejouer l'intro (utile pour les tests)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('intro') === 'force') {
            sessionStorage.removeItem('capsoSplashSeen');
        }

        const hasSeenSplash = sessionStorage.getItem('capsoSplashSeen');

        if (!hasSeenSplash) {
            splashScreen.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Bouton "Passer" visible après 1.5s
            setTimeout(() => {
                if (skipSplashBtn) skipSplashBtn.classList.add('visible');
            }, 1500);

            const hideSplashScreen = () => {
                splashScreen.classList.add('hidden');
                document.body.style.overflow = '';
                sessionStorage.setItem('capsoSplashSeen', 'true');
                setTimeout(() => { splashScreen.style.display = 'none'; }, 800);
            };

            if (splashVideo) {
                splashVideo.addEventListener('ended', hideSplashScreen);
                splashVideo.addEventListener('error', hideSplashScreen);
                splashVideo.play();
            } else {
                setTimeout(hideSplashScreen, 4500);
            }

            if (skipSplashBtn) skipSplashBtn.addEventListener('click', hideSplashScreen);

        } else {
            splashScreen.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});