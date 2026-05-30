document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });

    // Tutup sidebar saat klik overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sidebar.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    });

    // Mobile navigation
    const navButtons = document.querySelectorAll('.mobile-nav-btn');

    function scrollToDay(day) {
        const element = document.getElementById(`section-${day}`);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'instant'
            });

            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.mobile-nav-btn[data-day="${day}"]`).classList.add('active');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const day = button.getAttribute('data-day');
            scrollToDay(day);
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 250) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Perbaikan: Sidebar links
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Hanya handle link internal (tanpa target="_blank")
            if (!this.hasAttribute('target') || this.getAttribute('target') !== '_blank') {
                // Jika link adalah anchor link (contoh: #section-senin)
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = this.getAttribute('href').substring(1);

                    // Tutup sidebar
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('open');
                    overlay.style.display = 'none';

                    // Scroll ke section yang dituju
                    scrollToDay(target.split('-')[1]);
                }
                // Untuk link internal lainnya, biarkan default behavior
            }
            // Untuk link eksternal (target="_blank"), biarkan terbuka tab baru
        });
    });
});