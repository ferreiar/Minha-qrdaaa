document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    const mobileMenu = document.getElementById('mobile-menu');
    const logoLink = document.getElementById('logo-link');
    
    // Função para alternar o menu mobile
    function toggleMenu() {
        mobileMenuContainer.classList.toggle('hidden');
        
        // Pequeno atraso para a animação
        setTimeout(() => {
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        }, 10);
    }
    
    // Event listener para o botão do menu
    menuButton.addEventListener('click', toggleMenu);
    
    // Fechar o menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenuContainer.contains(event.target);
        const isClickOnButton = menuButton.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && !mobileMenuContainer.classList.contains('hidden')) {
            toggleMenu();
        }
    });
    
    // Fazer o logo recarregar a página e voltar para o início
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animação suave antes de recarregar
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s';
        
        setTimeout(() => {
            window.location.href = window.location.pathname + '#first-section';
            location.reload();
        }, 300);
    });
    
    // Detectar a seção atual para ajustar a cor do menu
    function updateMenuColor() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        let currentSection = 1;
        
        // Determinar a seção atual
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = index + 1;
            }
        });
        
        // Remover todas as classes de seção
        document.body.classList.remove('in-section-1', 'in-section-2', 'in-section-3', 'in-section-4');
        
        // Adicionar a classe apropriada
        document.body.classList.add(`in-section-${currentSection}`);
    }
    
    // Atualizar cor do menu ao rolar
    window.addEventListener('scroll', updateMenuColor);
    
    // Inicializar a cor do menu
    updateMenuColor();
});