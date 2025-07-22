/**
 * Main JavaScript file for CacTt4ck's portfolio
 */

// Document ready function
$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a.nav-link, a.navbar-brand').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // Navbar change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Activate navigation items based on scroll position
    $(window).scroll(function() {
        const scrollDistance = $(window).scrollTop() + 100;

        // Check each section for scroll position
        $('section').each(function() {
            if ($(this).offset().top <= scrollDistance) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    // Handle contact form submission
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();

        // Get form values
        const subject = $('#subject').val();
        const message = $('#message').val();

        // Construire l'URL mailto avec les paramètres
        const mailtoUrl = `mailto:pro.cac.corporation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        // Ouvrir l'application de messagerie par défaut
        window.location.href = mailtoUrl;

        // Réinitialiser le formulaire après un court délai
        setTimeout(function() {
            $('#contactForm').trigger('reset');
        }, 1000);
    });

    // Initialize portfolio item hover effects
    $('.portfolio-card').hover(
        function() {
            $(this).find('.card-img-top').css('opacity', '0.8');
        },
        function() {
            $(this).find('.card-img-top').css('opacity', '1');
        }
    );
});

// Function to animate skills progress bars
function animateProgressBars() {
    $('.progress-bar').each(function() {
        const width = $(this).attr('aria-valuenow') + '%';
        $(this).animate({ width: width }, 1000);
    });
}

// Animate progress bars when skills section comes into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Start observing the skills section
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});
