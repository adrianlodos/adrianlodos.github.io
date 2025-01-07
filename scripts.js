// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selectores principales
    const navLinks = document.querySelector('.nav-links');
    const quoteModal = document.querySelector('.quote-modal');
    const quoteButton = document.querySelector('.cta-button');
    const closeQuoteModal = document.querySelector('.quote-modal .close');
    const viewGalleryBtn = document.querySelector('.view-gallery-btn');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalClose = document.querySelector('.modal-close');
    const galleryModalContent = document.querySelector('.gallery-modal-content');

    // Array de imágenes para la galería
    const galleryImages = [
        'https://images.unsplash.com/photo-1497366216548-37526070297c',
        'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3',
        'img/proyecto1.jpg',
        'img/proyecto2.jpg',
        'img/proyecto3.jpg',
        'img/proyecto4.jpg',
        'img/proyecto5.jpg'
    ];

    // Cargar imágenes en la galería modal
    if (galleryModalContent) {
        galleryImages.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Ventana';
            galleryItem.appendChild(img);
            galleryModalContent.appendChild(galleryItem);
        });
    }

    // Funcionalidad del modal de presupuesto
    if (quoteButton && quoteModal && closeQuoteModal) {
        quoteButton.addEventListener('click', (e) => {
            e.preventDefault();
            quoteModal.classList.add('show');
        });

        closeQuoteModal.addEventListener('click', () => {
            quoteModal.classList.remove('show');
        });

        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('show');
            }
        });
    }

    // Funcionalidad del formulario de presupuesto
    const quoteForm = document.querySelector('#quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(quoteForm);

            try {
                const response = await fetch(quoteForm.action, {
                    method: quoteForm.method,
                    body: formData
                });

                const result = await response.text();
                if (result.trim() === "success") {
                    alert("Solicitud enviada con éxito. Te contactaremos pronto.");
                } else {
                    alert("Hubo un error al enviar la solicitud. Por favor, inténtalo más tarde.");
                }

                if (quoteModal) {
                    quoteModal.classList.remove('show');
                }
            } catch (error) {
                console.error('Error:', error);
                alert("No se pudo enviar la solicitud. Intenta más tarde.");
            }
        });
    }

    // Funcionalidad de la galería modal
    if (viewGalleryBtn && galleryModal && modalClose) {
        viewGalleryBtn.addEventListener('click', () => {
            galleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        modalClose.addEventListener('click', () => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Inicialización del carrusel
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');

    if (carousel && prevBtn && nextBtn && slides.length > 0) {
        // Función para mover el carrusel
        const moveToSlide = (slide) => {
            carousel.style.transform = `translateX(-${slide * 100}%)`;
        };

        // Event listeners para los botones
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            moveToSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            moveToSlide(currentSlide);
        });

        // Auto-play del carrusel
        setInterval(() => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            moveToSlide(currentSlide);
        }, 3000);
    }

    // Inicialización del slider principal
    const sliderContainer = document.querySelector('.slider-container');
    const heroSlides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function updateSlider() {
        const offset = currentIndex * -50; // Mueve el slider
        sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? heroSlides.length - 1 : currentIndex - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === heroSlides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });

    // Auto-Slide (opcional)
    setInterval(() => {
        currentIndex = (currentIndex === heroSlides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    }, 5000); // Cambia cada 5 segundos
});
