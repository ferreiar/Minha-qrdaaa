document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('cabeca');
    
    // Definir variável para a cor da linha
    document.documentElement.style.setProperty('--line-color', '#F4D03F');
    
    // Função para verificar qual seção está visível
    function checkSections() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        // Verificar qual seção está visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Ajustar a navbar com base na seção atual
        if (scrollPosition > 50) {
            // Se estiver na seção 4 (polaroids), manter transparente
            if (current === 'fourt-section') {
                navbar.classList.remove('bg-[#0C1445]');
                navbar.classList.remove('shadow-lg');
                navbar.classList.add('bg-transparent');
                
                // Adicionar uma sombra sutil para melhorar a legibilidade
                navbar.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
            } else {
                // Para outras seções, aplicar o fundo quando não estiver no topo
                navbar.classList.remove('bg-transparent');
                navbar.classList.add('bg-[#0C1445]');
                navbar.classList.add('shadow-lg');
                navbar.style.textShadow = 'none';
            }
        } else {
            // No topo da página, sempre transparente
            navbar.classList.remove('bg-[#0C1445]');
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('bg-transparent');
            navbar.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
        }
        
        // Atualizar links ativos
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-link');
            }
        });
    }
    
    // Verificar seções ao carregar e ao rolar
    window.addEventListener('scroll', checkSections);
    
    // Executar uma vez no carregamento da página
    setTimeout(checkSections, 100);
    
    // Rolagem suave para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});