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

});
