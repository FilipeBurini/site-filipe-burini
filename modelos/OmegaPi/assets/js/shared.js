document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Topbar & Header & Footer
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    const isHomePage = window.location.pathname.endsWith("index.html") || 
                       window.location.pathname === "/" || 
                       window.location.pathname.endsWith("OmegaPi/") || 
                       window.location.pathname.endsWith("OmegaPi");

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
      <!-- Topbar -->
      <div class="topbar">
        <div class="container topbar-content">
          <div class="topbar-info">
            <span><i class="fa-solid fa-clock"></i> Seg - Sex: 8:00 - 17:00</span>
            <span><i class="fa-solid fa-phone"></i> (16) 3720-5384</span>
          </div>
          <ul class="topbar-links">
            <li><a href="https://backup.omegapi.com.br/login" target="_blank"><i class="fa-solid fa-cloud"></i> Backup</a></li>
            <li><a href="https://track.omegapi.com.br/" target="_blank"><i class="fa-solid fa-truck"></i> Rastreamento</a></li>
            <li><a href="https://cliente.omegapi.com.br/" target="_blank"><i class="fa-solid fa-user-check"></i> Área do Cliente</a></li>
          </ul>
        </div>
      </div>
      <!-- Header -->
      <header class="header ${isHomePage ? 'header-transparent' : ''}" id="main-header">
        <div class="container header-content">
          <a href="index.html" class="logo">
            <img src="https://omegapi.com.br/wp-content/uploads/2019/06/Logo-OmegaPi-certo_transparent-1024x777.png" alt="OmegaPi Soluções Integradas">
          </a>
          <nav>
            <button class="mobile-toggle" id="mobile-menu-btn" aria-label="Abrir Menu">
              <i class="fa-solid fa-bars"></i>
            </button>
            <ul class="nav-menu" id="nav-menu">
              <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="loja.html" class="nav-link"><i class="fa-solid fa-cart-shopping"></i> Loja</a></li>
              
              <!-- Dropdown: Soluções -->
              <li class="nav-item">
                <a href="#" class="nav-link">Soluções <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 2px;"></i></a>
                <ul class="dropdown-menu">
                  <li class="dropdown-item">
                    <a href="#" class="dropdown-link">Automação Comercial <i class="fa-solid fa-chevron-right" style="font-size: 8px;"></i></a>
                    <ul class="submenu-menu">
                      <li><a href="easyassist-para-foodservice.html" class="dropdown-link">EasyAssist FoodService</a></li>
                      <li><a href="sistemas-web.html" class="dropdown-link">Sistemas Web</a></li>
                      <li><a href="syspdv-para-lojas-mercados.html" class="dropdown-link">SysPDV Lojas & Mercados</a></li>
                    </ul>
                  </li>
                  <li><a href="automacao-residencial.html" class="dropdown-link">Automação Residencial</a></li>
                  <li class="dropdown-item">
                    <a href="#" class="dropdown-link">Monitoramento <i class="fa-solid fa-chevron-right" style="font-size: 8px;"></i></a>
                    <ul class="submenu-menu">
                      <li><a href="monitoramento-2.html" class="dropdown-link">Alarmes com Imagens</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-item">
                    <a href="#" class="dropdown-link">Rastreamento Veicular <i class="fa-solid fa-chevron-right" style="font-size: 8px;"></i></a>
                    <ul class="submenu-menu">
                      <li><a href="rastreamento-veicular.html" class="dropdown-link">Rastreamento</a></li>
                      <li><a href="f-mobile.html" class="dropdown-link">F/Mobile</a></li>
                      <li><a href="empresas-delivery.html" class="dropdown-link">Empresas Delivery</a></li>
                      <li><a href="f-dispatch.html" class="dropdown-link">F/Dispatch</a></li>
                    </ul>
                  </li>
                </ul>
              </li>

              <!-- Dropdown: Espaço do Cliente -->
              <li class="nav-item">
                <a href="#" class="nav-link">Espaço do Cliente <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 2px;"></i></a>
                <ul class="dropdown-menu">
                  <li><a href="link-sistemas.html" class="dropdown-link">Acesso aos Sistemas</a></li>
                  <li><a href="https://nuvem.omegapi.com.br/" target="_blank" class="dropdown-link">Gravação em Nuvem</a></li>
                  <li><a href="https://cliente.omegapi.com.br/" target="_blank" class="dropdown-link">Meus Boletos</a></li>
                  <li><a href="http://backup.omegapi.com.br/" target="_blank" class="dropdown-link">Sistema de Backup</a></li>
                  <li><a href="acesso-rastreamento.html" class="dropdown-link">Sistema de Rastreamento</a></li>
                  <li><a href="suporte.html" class="dropdown-link">Suporte Remoto</a></li>
                  <li><a href="https://wa.me/message/BV7HBHPLWLXIE1" target="_blank" class="dropdown-link">WhatsApp OmegaPi</a></li>
                </ul>
              </li>
              
              <li class="nav-item"><a href="index.html#contact" class="btn btn-primary" style="font-size: 12px; padding: 8px 16px; margin-left: 8px; color: #fff;">Fale Conosco</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div class="logo">
              <img src="https://omegapi.com.br/wp-content/uploads/2019/06/Logo-OmegaPi-certo_transparent-1024x777.png" alt="OmegaPi" style="height: 48px; filter: brightness(0) invert(1);">
            </div>
            <p>Descomplicando soluções em tecnologia, automação e segurança eletrônica para Franca e região.</p>
            <div class="footer-socials">
              <a href="https://www.facebook.com/omegapisolucoes" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://instagram.com/omegapisolucoesintegradas" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://www.youtube.com/channel/UCtdaZbGPVzNJclKL7Vh2TOg" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          
          <div class="footer-col">
            <h4>Soluções</h4>
            <ul>
              <li><a href="easyassist-para-foodservice.html">Automação Comercial</a></li>
              <li><a href="automacao-residencial.html">Automação Residencial</a></li>
              <li><a href="monitoramento-2.html">Segurança Eletrônica</a></li>
              <li><a href="rastreamento-veicular.html">Rastreamento Veicular</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="loja.html">Nossos Planos</a></li>
              <li><a href="suporte.html">Suporte Técnico</a></li>
              <li><a href="link-sistemas.html">Acesso aos Sistemas</a></li>
              <li><a href="index.html#team">Conheça Nossa Equipe</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h4>Contato</h4>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="display: flex; gap: 12px; text-align: left;">
                <i class="fa-solid fa-map-pin" style="color: var(--brand-primary); margin-top: 4px;"></i>
                <span>Av. Paulo VI, 2060, Sl 02<br>Franca - SP, Brasil</span>
              </div>
              <div style="display: flex; gap: 12px; text-align: left;">
                <i class="fa-solid fa-phone" style="color: var(--brand-primary); margin-top: 4px;"></i>
                <span>(16) 3720-5384</span>
              </div>
              <div style="display: flex; gap: 12px; text-align: left;">
                <i class="fa-solid fa-envelope" style="color: var(--brand-primary); margin-top: 4px;"></i>
                <span>contato@omegapi.com.br</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container footer-bottom">
          <p>&copy; ${new Date().getFullYear()} OmegaPi Soluções Integradas em Segurança Eletrônica Ltda. CNPJ: 30.035.121/0001-30. Todos os direitos reservados.</p>
          <ul>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Privacidade</a></li>
          </ul>
        </div>
      </footer>
    `;
    }

    // 2. Setup Sticky Header scroll event
    const mainHeader = document.getElementById("main-header");
    if (mainHeader) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add("scrolled");
            } else {
                mainHeader.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);
        // Run initial check
        handleScroll();
    }

    // 3. Mobile Navigation Menu Toggle Action
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("open")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }
        });
    }

    // 4. Accordion drop-down logic on Mobile screen sizes
    const setupMobileMenu = () => {
        if (window.innerWidth <= 992) {
            const navItems = document.querySelectorAll(".nav-item");
            navItems.forEach(item => {
                const link = item.querySelector(".nav-link");
                const dropdown = item.querySelector(".dropdown-menu");
                if (link && dropdown) {
                    // Remove old listener if any to prevent duplicate binding
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    newLink.addEventListener("click", (e) => {
                        e.preventDefault();
                        item.classList.toggle("active");
                    });
                }
            });

            const dropdownItems = document.querySelectorAll(".dropdown-item");
            dropdownItems.forEach(item => {
                const link = item.querySelector(".dropdown-link");
                const submenu = item.querySelector(".submenu-menu");
                if (link && submenu) {
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    newLink.addEventListener("click", (e) => {
                        e.preventDefault();
                        item.classList.toggle("active");
                    });
                }
            });
        }
    };
    setupMobileMenu();
    window.addEventListener("resize", setupMobileMenu);
});
