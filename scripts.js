const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const quoteModal = document.querySelector('.quote-modal');
const quoteButton = document.querySelector('.cta-button');
const closeQuoteModal = document.querySelector('.quote-modal .close');
const viewGalleryBtn = document.querySelector('.view-gallery-btn');
const galleryModal = document.querySelector('.gallery-modal');
const modalClose = document.querySelector('.modal-close');
const galleryModalContent = document.querySelector('.gallery-modal-content');
const galleryImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c',
    'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    'https://images.unsplash.com/photo-1497366216548-37526070297c',
    'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
];

galleryImages.forEach(imgSrc => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Ventana';
    galleryItem.appendChild(img);
    galleryModalContent.appendChild(galleryItem);
});

mobileMenuButton.addEventListener('click', e => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
});

document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        navLinks.classList.remove('show');
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

quoteButton.addEventListener('click', e => {
    e.preventDefault();
    quoteModal.classList.add('show');
});

closeQuoteModal.addEventListener('click', () => {
    quoteModal.classList.remove('show');
});

quoteModal.addEventListener('click', e => {
    if (e.target === quoteModal) {
        quoteModal.classList.remove('show');
    }
});

document.querySelector('#quote-form').addEventListener('submit', e => {
    e.preventDefault();
    quoteModal.classList.remove('show');
});

viewGalleryBtn.addEventListener('click', () => {
    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

modalClose.addEventListener('click', () => {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

galleryModal.addEventListener('click', e => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
