document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');
    const overlay = document.querySelector('.transition-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainMenu = document.getElementById('main-menu');

    // Hamburger menu toggle
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mainMenu.classList.toggle('open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent default anchor behavior
            e.preventDefault();

            // Don't re-trigger if already active
            if (item.classList.contains('active')) {
                // Still close mobile menu if open
                hamburgerBtn.classList.remove('active');
                mainMenu.classList.remove('open');
                return;
            }

            const targetId = item.getAttribute('data-target');

            // Close mobile menu
            hamburgerBtn.classList.remove('active');
            mainMenu.classList.remove('open');

            // Trigger Transition Effect
            triggerTransition(() => {
                // Remove active class from all menu items and sections
                menuItems.forEach(mi => mi.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active-section'));

                // Add active class to clicked item and corresponding section
                item.classList.add('active');
                document.getElementById(targetId).classList.add('active-section');
            });
        });
    });

    function triggerTransition(callback) {
        overlay.classList.add('active');

        // Wait for the flash effect to peak before changing content
        setTimeout(() => {
            callback();

            // Remove flash effect after it finishes
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 250); // Second half of the 0.5s animation

        }, 250); // First half of the 0.5s animation
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        // Switch icons
        if (document.body.classList.contains('dark-theme')) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        }
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

    // Pointer and Mouse glide tracking (no press required)
    document.addEventListener('pointermove', (e) => {
        const target = e.target ? e.target.closest(interactiveSelector) : null;
        setHoverActive(target);
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
        const target = e.target ? e.target.closest(interactiveSelector) : null;
        setHoverActive(target);
    }, { passive: true });

    // Touch sliding drag tracking for mobile/tablets
    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const target = el ? el.closest(interactiveSelector) : null;
            setHoverActive(target);
        }
    }, { passive: true });

    document.addEventListener('pointerleave', () => setHoverActive(null));
    document.addEventListener('touchend', () => {
        setTimeout(() => setHoverActive(null), 300);
    });
});
