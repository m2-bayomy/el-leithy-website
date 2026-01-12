// Toggle contact info (patched inside DOMContentLoaded)
function toggleContact() {
  const contactInfo = document.getElementById('contact-info');
  if (contactInfo) {
    contactInfo.classList.toggle('active');
  }
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// Coming soon buttons
const comingSoonButtons = document.querySelectorAll('#calculator-btn, #calculator-btn-2, #trendy-btn, #trendy-btn-2');
comingSoonButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    alert('This feature is coming soon!');
  });
});

// Scroll animation for elements
function checkScroll() {
  const elements = document.querySelectorAll('.fade-in, .gallery-item, .gallery-text');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
}

// Lightbox functionality
let currentGallery = '';
let currentIndex = 0;

const galleryImages = {
  'ard-el-golf-1': [
    'ard_el_golf/M1.jpg',
    'ard_el_golf/M2.jpg',
    'ard_el_golf/M3.jpg',
    'ard_el_golf/M4.jpg',
    'ard_el_golf/M5.jpg',
    'ard_el_golf/M6.jpg',
  ],
  'ard-el-golf-2': [
    'ard_el_golf/P1.jpg',
    'ard_el_golf/P2.jpg',
    'ard_el_golf/P3.jpg',
    'ard_el_golf/P4.jpg',
    'ard_el_golf/P5.jpg',
    'ard_el_golf/P6.jpg',
  ],
  'hyde-park': [
    'hyde_park/h1.jpg',
    'hyde_park/h2.jpg',
    'hyde_park/h3.jpg',
    'hyde_park/h4.jpg',
    'hyde_park/h5.jpg',
    'hyde_park/h6.jpg',
    'hyde_park/h7.jpg',
  ],
  'living': [
    'living/0.jpg',
    'living/2.jpg',
    'living/4.jpg'
  ],
  'kitchen': [
    'kitchen/0.jpg',
    'kitchen/2.jpg',
    'kitchen/3.jpg'
  ],
  'bedroom': [
    'bedroom/0.jpg',
    'bedroom/0G3A5228-HDR.jpg',
    'bedroom/2.jpg'
  ],
  'bathroom': [
    'bathroom/0.jpg',
    'bathroom/0G3A5217-HDR.jpg',
    'bathroom/0G3A5151-HDR.jpg'
  ]
};

function openLightbox(gallery, index) {
  currentGallery = gallery;
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightboxImg.src = galleryImages[gallery][index];
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function changeImage(direction) {
  const images = galleryImages[currentGallery];
  currentIndex = (currentIndex + direction + images.length) % images.length;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.src = images[currentIndex];
  }
}

// Close lightbox when clicking outside the image
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
}

// Carousel navigation for project galleries
function navigateSlide(project, direction) {
  const carouselContainers = document.querySelectorAll('.carousel-container');
  let targetContainer = null;
  
  carouselContainers.forEach(container => {
    const grids = container.querySelectorAll('.gallery-grid');
    if (grids.length > 0 && grids[0].getAttribute('data-project') === project) {
      targetContainer = container;
    }
  });
  
  if (!targetContainer) return;
  
  const slides = targetContainer.querySelectorAll('.gallery-grid');
  let activeIndex = -1;
  
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      activeIndex = index;
    }
  });
  
  let newIndex = activeIndex + direction;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === newIndex) {
      slide.classList.add('active');
    }
  });
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Floating Contact Button (patched)
  const contactBtn = document.getElementById('contact-btn');
  const contactInfo = document.getElementById('contact-info');

  if (contactBtn && contactInfo) {
    contactBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      contactInfo.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!contactInfo.contains(event.target) && !contactBtn.contains(event.target)) {
        contactInfo.classList.remove('active');
      }
    });
  }

  // Scroll effects
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  checkScroll();

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize carousels
  const carouselContainers = document.querySelectorAll('.carousel-container');
  carouselContainers.forEach(container => {
    const slides = container.querySelectorAll('.gallery-grid');
    if (slides.length > 0) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[0].classList.add('active');
    }
  });
});

// ✅ Mobile: tap to flip the hero cards (because hover doesn't exist on phones)
(function enableTapFlipCards() {
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (!isTouch) return;

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // If user clicks a button/link inside the card, don't toggle flip
      if (e.target.closest("a, button")) return;
      card.classList.toggle("is-flipped");
    });
  });
})();


