document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize Lucide Icons if loaded
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".nav-mobile-link");

  function toggleMobileMenu() {
    const isExpanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    menuToggleBtn.setAttribute("aria-expanded", !isExpanded);
    mobileNav.setAttribute("aria-hidden", isExpanded);
    mobileNav.classList.toggle("open");
    
    // Toggle class on menu button to transform hamburger bars
    menuToggleBtn.classList.toggle("active");
  }

  if (menuToggleBtn && mobileNav) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking any navigation link
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (mobileNav.classList.contains("open")) {
          toggleMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside of the header
    document.addEventListener("click", (e) => {
      if (mobileNav.classList.contains("open") && !mobileNav.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        toggleMobileMenu();
      }
    });
  }

  /* ==========================================================================
     COST SAVINGS CALCULATOR (LOCAÇÃO DE IMPRESSORAS)
     ========================================================================== */
  const volumeRange = document.getElementById("volume-range");
  const volumeVal = document.getElementById("volume-val");
  const printersRange = document.getElementById("printers-range");
  const printersVal = document.getElementById("printers-val");
  
  const ownCostVal = document.getElementById("own-cost-val");
  const masterCostVal = document.getElementById("master-cost-val");
  const savingsPercentVal = document.getElementById("savings-percent-val");
  const savingsAmountVal = document.getElementById("savings-amount-val");

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function calculateSavings() {
    if (!volumeRange || !printersRange) return;

    const volume = parseInt(volumeRange.value, 10);
    const printers = parseInt(printersRange.value, 10);

    // Update slider label texts
    volumeVal.textContent = volume.toLocaleString("pt-BR") + " páginas";
    printersVal.textContent = printers === 1 ? "1 impressora" : `${printers} impressoras`;

    /* 
       CALCULATION MODEL
       Own cost:
       - R$ 0.12 per page printed (toner, cylinder, paper wear, repairs)
       - R$ 130 per machine monthly depreciation/amortization
       
       Locação (Master cost):
       - R$ 0.055 per page printed (all parts, toner, logistics included)
       - R$ 85 per machine rental fee
    */
    const ownCostPageRate = 0.12;
    const ownCostMachineRate = 130;
    const ownTotalCost = (volume * ownCostPageRate) + (printers * ownCostMachineRate);

    const masterCostPageRate = 0.055;
    const masterCostMachineRate = 85;
    const masterTotalCost = (volume * masterCostPageRate) + (printers * masterCostMachineRate);

    const savingsAmount = ownTotalCost - masterTotalCost;
    const savingsPercent = Math.round((savingsAmount / ownTotalCost) * 100);

    // Update screen display
    if (ownCostVal) ownCostVal.textContent = formatCurrency(ownTotalCost);
    if (masterCostVal) masterCostVal.textContent = formatCurrency(masterTotalCost);
    if (savingsPercentVal) savingsPercentVal.textContent = `${savingsPercent}% de Redução`;
    if (savingsAmountVal) savingsAmountVal.textContent = formatCurrency(savingsAmount);
  }

  if (volumeRange && printersRange) {
    volumeRange.addEventListener("input", calculateSavings);
    printersRange.addEventListener("input", calculateSavings);
    // Initial run
    calculateSavings();
  }

  /* ==========================================================================
     TESTIMONIALS SLIDER (STACKED CARD DECK CAROUSEL)
     ========================================================================== */
  const reviewsDeck = document.getElementById("reviews-deck");
  const deckCards = document.querySelectorAll(".review-stack-card");
  const deckPrevBtn = document.getElementById("deck-btn-prev");
  const deckNextBtn = document.getElementById("deck-btn-next");
  const deckCounter = document.getElementById("deck-counter");

  let deckActiveIndex = 0;
  const totalDeckCards = deckCards.length;
  let isDeckAnimating = false;

  function getCardAtRelativeIndex(offset) {
    return (deckActiveIndex + offset + totalDeckCards) % totalDeckCards;
  }

  function updateDeckLayout(animate = true) {
    if (totalDeckCards === 0) return;

    if (deckCounter) {
      deckCounter.textContent = `${String(deckActiveIndex + 1).padStart(2, "0")} / ${String(totalDeckCards).padStart(2, "0")}`;
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGsap = typeof gsap !== "undefined";

    const idxTop = getCardAtRelativeIndex(0);
    const idxMid = getCardAtRelativeIndex(1);
    const idxBot = getCardAtRelativeIndex(2);

    deckCards.forEach((card) => {
      card.classList.remove("active-card");
      card.style.pointerEvents = "none";
    });

    deckCards[idxTop].classList.add("active-card");
    deckCards[idxTop].style.pointerEvents = "auto";

    if (hasGsap && !isReduced) {
      // Top Card Slot
      gsap.to(deckCards[idxTop], {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        zIndex: 3,
        duration: animate ? 0.55 : 0,
        ease: "power2.out"
      });

      // Middle Card Slot
      gsap.to(deckCards[idxMid], {
        x: 0,
        y: 16,
        scale: 0.95,
        rotate: 2,
        opacity: 0.85,
        zIndex: 2,
        duration: animate ? 0.55 : 0,
        ease: "power2.out"
      });

      // Bottom Card Slot
      gsap.to(deckCards[idxBot], {
        x: 0,
        y: 32,
        scale: 0.9,
        rotate: -2,
        opacity: 0.55,
        zIndex: 1,
        duration: animate ? 0.55 : 0,
        ease: "power2.out"
      });
    } else {
      deckCards.forEach((card) => {
        card.style.transform = "";
        card.style.opacity = "";
        card.style.zIndex = "";
      });
      deckCards[idxTop].style.zIndex = "3";
      deckCards[idxTop].style.opacity = "1";
      
      deckCards[idxMid].style.zIndex = "2";
      deckCards[idxMid].style.opacity = "0.85";
      deckCards[idxMid].style.transform = "scale(0.95) translateY(16px) rotate(2deg)";

      deckCards[idxBot].style.zIndex = "1";
      deckCards[idxBot].style.opacity = "0.55";
      deckCards[idxBot].style.transform = "scale(0.9) translateY(32px) rotate(-2deg)";
    }
  }

  function slideNextDeckCard() {
    if (isDeckAnimating || totalDeckCards === 0) return;
    isDeckAnimating = true;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGsap = typeof gsap !== "undefined";

    const topCard = deckCards[getCardAtRelativeIndex(0)];

    if (hasGsap && !isReduced) {
      gsap.to(topCard, {
        x: 280,
        rotate: 12,
        opacity: 0,
        scale: 0.95,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          deckActiveIndex = (deckActiveIndex + 1) % totalDeckCards;
          
          gsap.set(topCard, {
            x: 0,
            y: 32,
            scale: 0.9,
            rotate: -2,
            opacity: 0,
            zIndex: 1
          });

          updateDeckLayout(true);
          
          setTimeout(() => {
            isDeckAnimating = false;
          }, 200);
        }
      });
    } else {
      deckActiveIndex = (deckActiveIndex + 1) % totalDeckCards;
      updateDeckLayout(false);
      isDeckAnimating = false;
    }
  }

  function slidePrevDeckCard() {
    if (isDeckAnimating || totalDeckCards === 0) return;
    isDeckAnimating = true;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGsap = typeof gsap !== "undefined";

    if (hasGsap && !isReduced) {
      const prevIndex = (deckActiveIndex - 1 + totalDeckCards) % totalDeckCards;
      const targetCard = deckCards[prevIndex];

      gsap.set(targetCard, {
        x: -280,
        y: 0,
        scale: 1,
        rotate: -12,
        opacity: 0,
        zIndex: 4
      });

      deckActiveIndex = prevIndex;

      gsap.to(targetCard, {
        x: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      updateDeckLayout(true);

      setTimeout(() => {
        isDeckAnimating = false;
      }, 500);
    } else {
      deckActiveIndex = (deckActiveIndex - 1 + totalDeckCards) % totalDeckCards;
      updateDeckLayout(false);
      isDeckAnimating = false;
    }
  }

  if (deckNextBtn) {
    deckNextBtn.addEventListener("click", () => {
      stopDeckAutoPlay();
      slideNextDeckCard();
    });
  }

  if (deckPrevBtn) {
    deckPrevBtn.addEventListener("click", () => {
      stopDeckAutoPlay();
      slidePrevDeckCard();
    });
  }

  deckCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (card.classList.contains("active-card") && !e.target.closest("a") && !e.target.closest("button")) {
        stopDeckAutoPlay();
        slideNextDeckCard();
      }
    });
  });

  let deckAutoPlayTimer = setInterval(slideNextDeckCard, 10000);

  function stopDeckAutoPlay() {
    clearInterval(deckAutoPlayTimer);
  }

  if (totalDeckCards > 0) {
    updateDeckLayout(false);
  }


  /* ==========================================================================
     QUOTE / CONTACT FORM (WHATSAPP REDIRECT)
     ========================================================================== */
  const quoteForm = document.getElementById("quote-request-form");
  const formStatusMsg = document.getElementById("form-status-msg");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById("form-name").value.trim();
      const phone = document.getElementById("form-phone").value.trim();
      const service = document.getElementById("form-service").value;
      const quantity = document.getElementById("form-quantity").value.trim();
      const message = document.getElementById("form-message").value.trim();

      // Basic validation check
      if (!name || !phone || !service || !message) {
        if (formStatusMsg) {
          formStatusMsg.textContent = "Por favor, preencha todos os campos obrigatórios (*).";
          formStatusMsg.className = "form-status error";
        }
        return;
      }

      // Show success loading state
      if (formStatusMsg) {
        formStatusMsg.textContent = "Processando... Abrindo WhatsApp...";
        formStatusMsg.className = "form-status success";
      }

      // WhatsApp Message Formatting
      const whatsappBaseUrl = "https://wa.me/5516999728466";
      const formattedMessage = 
        `Olá Master Encadernações, gostaria de solicitar um orçamento através do site:\n\n` +
        `*Nome:* ${name}\n` +
        `*WhatsApp:* ${phone}\n` +
        `*Serviço:* ${service}\n` +
        `*Quantidade:* ${quantity || "Não informada"}\n` +
        `*Detalhes:* ${message}`;

      // Encode URL message
      const encodedMsg = encodeURIComponent(formattedMessage);
      const fullUrl = `${whatsappBaseUrl}?text=${encodedMsg}`;

      // Redirect user to WhatsApp in a new tab after a brief delay
      setTimeout(() => {
        window.open(fullUrl, "_blank", "noopener,noreferrer");
        
        // Reset form
        quoteForm.reset();
        if (formStatusMsg) {
          formStatusMsg.textContent = "Sua solicitação foi preparada e enviada ao WhatsApp!";
        }
      }, 1000);
    });
  }

  /* ==========================================================================
     GSAP ENTRANCE ANIMATIONS (SCROLL-TRIGGER)
     ========================================================================== */
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    try {
      // 1. Header Animation (Fade-in and Slide-down)
      gsap.from(".main-header", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // 2. Hero Section Entrance Animation
      const heroTl = gsap.timeline();
      heroTl.from(".hero-eyebrow", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-description", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from(".hero-ctas", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4")
      .from(".hero-trust", {
        opacity: 0,
        duration: 0.5
      }, "-=0.3")
      .from(".hero-image-wrapper", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, "-=0.7");

      // 3. Stagger reveal for Bento Cards
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });

      // 4. Calculator Section entrance
      gsap.from(".calc-text", {
        scrollTrigger: {
          trigger: ".calculator-section",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".calc-card-container", {
        scrollTrigger: {
          trigger: ".calculator-section",
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 5. Testimonials entrance animation (staggered stack entrance)
      gsap.from(".reviews-stack-wrapper", {
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".contact-info-block", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".contact-form-block", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

    } catch (e) {
      console.warn("GSAP layout animation issue, reverting to default layout styles: ", e);
    }
  }

  // Removed 3D card tilt listeners based on user feedback
});
