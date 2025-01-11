document.addEventListener('DOMContentLoaded', () => {
    // Cargar el contenido del header
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
  
    // Cargar el contenido del footer
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  
    // Inicializar Swiper
    const heroSwiper = new Swiper('.hero-slider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  
    const gallerySwiper = new Swiper('.gallery-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        }
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });
  
    // Función para desplazarse a una sección
    window.scrollToSection = function(sectionId) {
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
      });
    };
  
    // Manejar el envío del formulario de presupuesto
    document.querySelector('#presupuestoModal form').addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = 'Enviando...';
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const modalEl = document.getElementById('presupuestoModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        alert('Formulario enviado correctamente');
        e.target.reset();
      } catch (err) {
        alert('Error al enviar el formulario');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    });
  
    // Observer para animaciones
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeIn');
          const content = entry.target.querySelectorAll('.card, .service-card, img, .btn');
          content.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate__animated', 'animate__slideInUp');
            }, i * 200);
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-50px'
    });
  
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  
    const mapContainers = document.querySelectorAll('.map-container');
    mapContainers.forEach(container => {
      observer.observe(container);
    });
  
    // Inicializar particles.js
    particlesJS('particles-js', {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 40 : 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.2,
          random: false,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  });
  