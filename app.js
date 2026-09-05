document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');
    const overlay = document.querySelector('.transition-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainMenu = document.getElementById('main-menu');

    const closeMobileMenu = () => {
        hamburgerBtn.classList.remove('active');
        mainMenu.classList.remove('open');
    };

    // Hamburger menu toggle
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mainMenu.classList.toggle('open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            if (item.classList.contains('active')) {
                closeMobileMenu();
                return;
            }

            const targetId = item.getAttribute('data-target');
            closeMobileMenu();

            // Trigger Transition Effect
            triggerTransition(() => {
                menuItems.forEach(mi => mi.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active-section'));

                item.classList.add('active');
                document.getElementById(targetId).classList.add('active-section');
            });
        });
    });

    function triggerTransition(callback) {
        overlay.classList.add('active');

        setTimeout(() => {
            callback();
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 250);
        }, 250);
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        moonIcon.style.display = isDark ? 'none' : 'inline';
        sunIcon.style.display = isDark ? 'inline' : 'none';
    });

    // Instant glide/slide hover reaction for buttons & interactive elements
    const interactiveSelector = '.menu-item, .action-btn, .project-link-btn, .comp-badge, .list-item, .social-link, .theme-toggle, .cutout-box';
    let currentHovered = null;

    function setHoverActive(element) {
        if (currentHovered === element) return;
        if (currentHovered) {
            currentHovered.classList.remove('hover-active');
        }
        currentHovered = element;
        if (currentHovered) {
            currentHovered.classList.add('hover-active');
        }
    }

    // Pointer and Touch glide tracking
    const handleMove = (e) => {
        let el = e.target;
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            el = document.elementFromPoint(touch.clientX, touch.clientY);
        }
        const target = el ? el.closest(interactiveSelector) : null;
        setHoverActive(target);
    };

    document.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('pointerleave', () => setHoverActive(null));
    document.addEventListener('touchend', () => {
        setTimeout(() => setHoverActive(null), 300);
    });
});
