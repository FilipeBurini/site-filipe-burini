document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. NAVBAR STICKY & SCROLL UP BUTTON
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const scrollUp = document.querySelector('.scroll-up');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
      scrollUp.classList.add('show');
    } else {
      scrollUp.classList.remove('show');
    }
  });

  /* ==========================================================================
     2. MOBILE MENU TOGGLE
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      // Lock scroll when menu is open on mobile
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     3. ACTIVE NAV LINK TRACKING ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies mid viewport
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ==========================================================================
     4. BEFORE/AFTER SLIDER (Interactive drag)
     ========================================================================== */
  const sliderContainer = document.querySelector('.ba-slider-container');
  const afterImage = document.querySelector('.ba-slider-after');
  const sliderHandle = document.querySelector('.ba-slider-handle');
  const afterImgEl = afterImage ? afterImage.querySelector('img') : null;
  
  if (sliderContainer && afterImage && sliderHandle && afterImgEl) {
    let isDragging = false;
    
    // Adjust size of the internal image to match parent container width
    const setInnerImgWidth = () => {
      const containerWidth = sliderContainer.offsetWidth;
      afterImgEl.style.width = `${containerWidth}px`;
    };
    
    // Init size and bind to resize
    setInnerImgWidth();
    window.addEventListener('resize', setInnerImgWidth);
    
    const moveSlider = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      // Boundaries check
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      
      // Apply percentage width and handle position
      afterImage.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    };
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch events (for mobile devices)
    sliderHandle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    }, { passive: true });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Handle clicking inside the container to jump to that point
    sliderContainer.addEventListener('click', (e) => {
      // Don't trigger if they click directly on the handle button (which could be a drag start)
      if (e.target === sliderHandle || sliderHandle.contains(e.target)) return;
      moveSlider(e.clientX);
    });
  }

  /* ==========================================================================
     5. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const testimonialsContainer = document.querySelector('.testimonials-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const btnPrev = document.querySelector('.carousel-btn-prev');
  const btnNext = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (testimonialsContainer && slides.length > 0) {
    let currentIndex = 0;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    const updateCarousel = () => {
      testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };
    
    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
      resetInterval();
    };
    
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };
    
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };
    
    if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); resetInterval(); });
    
    const startInterval = () => {
      slideInterval = setInterval(nextSlide, 6000);
    };
    
    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };
    
    // Pause auto play on hover
    const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
      carouselWrapper.addEventListener('mouseleave', startInterval);
    }
    
    startInterval();
  }

  /* ==========================================================================
     6. FORM VALIDATION & REDIRECT (WhatsApp / Email)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-control');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = contactForm.querySelector('.btn-submit');
    
    // Validation patterns
    const patterns = {
      name: /^[a-zA-ZÀ-ÿ\s]{3,50}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, // matches (16) 99189-0567, 16991890567 etc
      message: /^.{10,500}$/s // minimum 10 characters
    };
    
    const validateField = (input) => {
      const fieldName = input.getAttribute('name');
      const value = input.value.trim();
      const pattern = patterns[fieldName];
      
      let isValid = true;
      if (pattern) {
        isValid = pattern.test(value);
      } else if (input.hasAttribute('required')) {
        isValid = value.length > 0;
      }
      
      if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
      } else {
        input.classList.remove('success');
        input.classList.add('error');
      }
      
      return isValid;
    };
    
    // Validate on blur (user finishes typing)
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      // Clear error formatting as user types
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          const value = input.value.trim();
          const fieldName = input.getAttribute('name');
          if (patterns[fieldName] && patterns[fieldName].test(value)) {
            input.classList.remove('error');
            input.classList.add('success');
          }
        }
      });
    });
    
    // Formatting Phone field automatically (e.g. (16) 99189-0567)
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      });
    }
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        formStatus.textContent = 'Por favor, corrija os erros marcados em vermelho antes de enviar.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        
        // Focus first error field
        const firstError = contactForm.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }
      
      // Form is valid - Show loading state
      btnSubmit.classList.add('loading');
      btnSubmit.disabled = true;
      formStatus.style.display = 'none';
      
      const formData = {
        name: contactForm.querySelector('[name="name"]').value.trim(),
        email: contactForm.querySelector('[name="email"]').value.trim(),
        phone: contactForm.querySelector('[name="phone"]').value.trim(),
        service: contactForm.querySelector('[name="service"]').value,
        message: contactForm.querySelector('[name="message"]').value.trim()
      };
      
      // Simulate API submit
      setTimeout(() => {
        btnSubmit.classList.remove('loading');
        btnSubmit.disabled = false;
        
        formStatus.innerHTML = `Orçamento gerado com sucesso!<br><small>Redirecionando para o WhatsApp de FL Pinturas...</small>`;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        // Build WhatsApp text
        const whatsappText = `Olá FL Pinturas, me chamo *${formData.name}*.\nGostaria de solicitar um orçamento para o serviço de *${formData.service}*.\n\n*Contato:*\n- E-mail: ${formData.email}\n- Tel: ${formData.phone}\n\n*Detalhes do Pedido:*\n${formData.message}`;
        const whatsappUrl = `https://wa.me/5516991890567?text=${encodeURIComponent(whatsappText)}`;
        
        // Reset form formatting
        inputs.forEach(input => {
          input.classList.remove('success');
        });
        contactForm.reset();
        
        // Redirect after a short delay so they see the success message
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
        
      }, 1200);
    });
  }

  /* ==========================================================================
     7. SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add active class if element in viewport, check reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (entry.isIntersecting) {
        if (prefersReducedMotion) {
          entry.target.style.transition = 'none';
          entry.target.style.transform = 'none';
          entry.target.style.opacity = '1';
        } else {
          entry.target.classList.add('active');
        }
        revealObserver.unobserve(entry.target); // Animates only once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before it gets to the bottom
    threshold: 0.1
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
});
