document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarBrand = document.querySelector('.navbar-brand');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link');

    // Enhanced navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Active link handling
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initial call

    // Smooth scroll with error handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Enhanced mobile menu behavior
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            document.querySelector('.navbar-collapse').classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show') &&
            !navbar.contains(e.target)) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });

    // Initial visibility check for sections
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Enhanced scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skill-container')) {
                    entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                    });
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe all sections and skill containers
    document.querySelectorAll('.section, .skill-container').forEach(el => observer.observe(el));

    // Form validation and animation
    const contactForm = document.querySelector('#contact form');
    const formInputs = document.querySelectorAll('.form-control');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.mb-3').classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.mb-3').classList.remove('focused');
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success mt-3';
                successAlert.textContent = '¡Mensaje enviado con éxito!';
                contactForm.appendChild(successAlert);

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    successAlert.remove();
                }, 3000);
            }
        });
    }

    // Initialize typing effect
    if (document.querySelector('#typed-text')) {
        new Typed('#typed-text', {
            strings: ['Full Stack Developer Junior', 'Web Developer', 'Problem Solver'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // Particles.js initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Certificate slider functionality
    function initializeSlider() {
        const track = document.querySelector('.certificates-track');
        const cards = document.querySelectorAll('.certificate-card');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;

        if (track && cards.length > 0) {
            function updateSlider(smooth = true) {
                if (!smooth) {
                    track.style.transition = 'none';
                }
                const cardWidth = 100 / cards.length;
                const offset = -currentIndex * cardWidth;
                track.style.transform = `translateX(${offset}%)`;

                if (!smooth) {
                    track.offsetHeight;
                    track.style.transition = 'transform 0.5s ease';
                }

                cards.forEach((card, index) => {
                    card.style.opacity = index === currentIndex ? '1' : '0.5';
                    card.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
                });

                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            // Navigation buttons
            document.querySelector('.prev-btn')?.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateSlider();
            });

            document.querySelector('.next-btn')?.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            });

            // Initialize
            updateSlider(false);

            // Auto-sliding
            let autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            }, 5000);

            // Pause on hover
            track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            track.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % cards.length;
                    updateSlider();
                }, 5000);
            });
        }
    }

    // Call this function when document is ready
    initializeSlider();
});
