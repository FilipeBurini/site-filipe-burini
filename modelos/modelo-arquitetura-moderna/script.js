/**
 * SCRIPT: FERNANDA CARDOSO | ARQUITETA
 * Interactivity & Smooth Animations
 * Author: Antigravity AI
 */

document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initHeader();
    initMobileNav();
    initBentoGlow();
    initPortfolio();
    initLightbox();
    initScrollReveal();
    initContactForm();
});

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeader() {
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init
}

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    if (!toggle || !menu) return;
    
    const toggleMenu = () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    };
    
    toggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking links
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   Bento Grid Mouse Tracker Glow Effect
   ========================================================================== */
function initBentoGlow() {
    const items = document.querySelectorAll('.bento-item');
    
    items.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   Portfolio Filtering
   ========================================================================== */
function initPortfolio() {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    
    if (filters.length === 0 || cards.length === 0) return;
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active from all
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const selectedCategory = filter.getAttribute('data-filter');
            
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category-tag');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    // Retrigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   Lightbox Gallery (Supports Multi-image slider per project)
   ========================================================================== */
function initLightbox() {
    const cards = document.querySelectorAll('.project-card');
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox || cards.length === 0) return;
    
    const wrapper = lightbox.querySelector('.lightbox-img-wrapper');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('#lightbox-prev');
    const nextBtn = lightbox.querySelector('#lightbox-next');
    const titleElement = lightbox.querySelector('.lightbox-title');
    const categoryElement = lightbox.querySelector('.lightbox-category');
    const thumbsContainer = lightbox.querySelector('.lightbox-thumbs');
    
    let currentImages = [];
    let currentImageIndex = 0;
    
    const openLightbox = (card) => {
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category');
        const imagesStr = card.getAttribute('data-images');
        
        currentImages = imagesStr.split(',').map(img => img.trim());
        currentImageIndex = 0;
        
        titleElement.textContent = title;
        categoryElement.textContent = category;
        
        setupLightboxImages();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const setupLightboxImages = () => {
        // Clear previous images & thumbs
        const oldImgs = wrapper.querySelectorAll('.lightbox-img');
        oldImgs.forEach(img => img.remove());
        thumbsContainer.innerHTML = '';
        
        // Add new images and thumbnails
        currentImages.forEach((src, idx) => {
            // Main image tag
            const img = document.createElement('img');
            img.className = `lightbox-img ${idx === 0 ? 'active' : ''}`;
            img.src = src;
            img.alt = titleElement.textContent;
            wrapper.appendChild(img);
            
            // Thumbnail if more than 1 image
            if (currentImages.length > 1) {
                const thumb = document.createElement('img');
                thumb.className = `lightbox-thumb ${idx === 0 ? 'active' : ''}`;
                thumb.src = src;
                thumb.addEventListener('click', () => showImage(idx));
                thumbsContainer.appendChild(thumb);
            }
        });
        
        // Show/Hide Nav elements
        if (currentImages.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            thumbsContainer.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            thumbsContainer.style.display = 'none';
        }
    };
    
    const showImage = (index) => {
        const imgs = wrapper.querySelectorAll('.lightbox-img');
        const thumbs = thumbsContainer.querySelectorAll('.lightbox-thumb');
        
        // Bound checks
        if (index < 0) index = currentImages.length - 1;
        if (index >= currentImages.length) index = 0;
        
        currentImageIndex = index;
        
        // Toggle active states
        imgs.forEach((img, idx) => {
            img.classList.toggle('active', idx === currentImageIndex);
        });
        
        thumbs.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentImageIndex);
        });
    };
    
    // Event listeners
    cards.forEach(card => {
        card.addEventListener('click', () => openLightbox(card));
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        const menu = document.querySelector('.nav-menu');
        // Only restore overflow scroll if mobile menu is not active
        if (!menu.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentImages.length > 1) showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight' && currentImages.length > 1) showImage(currentImageIndex + 1);
    });
}

/* ==========================================================================
   Scroll Reveal System
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Reveal slightly before entering viewport
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Simple client side validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            showStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando... <span class="spinner"></span>';
        statusEl.className = 'form-status';
        statusEl.style.display = 'none';
        
        // Simulate network submit
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            showStatus('Sua mensagem foi enviada com sucesso! Fernanda entrará em contato em breve.', 'success');
            form.reset();
            
            // Clear status after 5s
            setTimeout(() => {
                statusEl.style.opacity = '0';
                setTimeout(() => {
                    statusEl.style.display = 'none';
                    statusEl.style.opacity = '1';
                }, 400);
            }, 5000);
        }, 1500);
    });
    
    const showStatus = (msg, type) => {
        statusEl.textContent = msg;
        statusEl.className = `form-status ${type}`;
    };
}
