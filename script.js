// Image data from Images folder
const images = [
    'Images/WhatsApp Image 2025-01-24 at 18.16.48 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.48.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.50.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.52.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.54.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.55.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.56.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.58 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.58.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.59 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.16.59.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.00.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.01.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.02 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.02 (2).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.02.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.04 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.04.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.05 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.05.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.06 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.06 (2).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.06.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.07.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.11 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.11.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.12.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.13 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.13.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.14 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.14.jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.15 (1).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.15 (2).jpeg',
    'Images/WhatsApp Image 2025-01-24 at 18.17.15.jpeg'
];

// DOM Elements
const gallery = document.getElementById('gallery');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeBtn = document.querySelector('.close-btn');

// Lazy loading observer
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                entry.target.classList.remove('loading');
            }
            observer.unobserve(entry.target);
        }
    });
});

// Create gallery items
function createGalleryItems() {
    images.forEach(imageSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item loading';

        const img = document.createElement('img');
        img.dataset.src = imageSrc; // Use data-src for lazy loading
        img.alt = 'Gallery Image';

        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);

        // Observe for lazy loading
        lazyLoadObserver.observe(galleryItem);

        // Add click event for fullscreen
        galleryItem.addEventListener('click', () => showFullscreen(imageSrc));
    });
}

// Show fullscreen image
function showFullscreen(imageSrc) {
    fullscreenImage.src = imageSrc;
    fullscreenOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close fullscreen
function closeFullscreen() {
    fullscreenOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners
closeBtn.addEventListener('click', closeFullscreen);
fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
        closeFullscreen();
    }
});

// Close fullscreen with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

// Initialize gallery
createGalleryItems(); 