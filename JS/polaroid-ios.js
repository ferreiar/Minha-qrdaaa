document.addEventListener('DOMContentLoaded', function() {
    // Detectar se é um dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        // Selecionar elementos
        const polaroidCarousel = document.querySelector('.polaroid-carousel');
        const polaroids = document.querySelectorAll('.polaroid');
        
        // Adicionar classe específica para iOS
        if (polaroidCarousel) {
            polaroidCarousel.classList.add('ios-fix');
        }
        
        // Função para aplicar correções específicas para iOS
        function applyIOSFixes() {
            polaroids.forEach(polaroid => {
                // Forçar hardware acceleration
                polaroid.style.webkitBackfaceVisibility = 'hidden';
                polaroid.style.backfaceVisibility = 'hidden';
                polaroid.style.webkitPerspective = '1000';
                polaroid.style.perspective = '1000';
                
                // Garantir que as transformações funcionem corretamente no iOS
                if (polaroid.style.transform) {
                    polaroid.style.webkitTransform = polaroid.style.transform + ' translateZ(0)';
                    polaroid.style.transform += ' translateZ(0)';
                }
                
                // Ajustar z-index para evitar problemas de sobreposição
                if (polaroid.classList.contains('prev')) {
                    polaroid.style.zIndex = '6';
                } else if (polaroid.classList.contains('active')) {
                    polaroid.style.zIndex = '10';
                } else if (polaroid.classList.contains('next')) {
                    polaroid.style.zIndex = '6';
                }
            });
        }
        
        // Aplicar correções iniciais
        applyIOSFixes();
        
        // Observar mudanças nas classes das polaroids
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class' || 
                    mutation.attributeName === 'style') {
                    // Pequeno atraso para garantir que as mudanças de estilo sejam aplicadas
                    setTimeout(applyIOSFixes, 10);
                }
            });
        });
        
        // Observar todas as polaroids
        polaroids.forEach(polaroid => {
            observer.observe(polaroid, { attributes: true });
        });
        
        // Adicionar listeners para os botões de navegação
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                setTimeout(applyIOSFixes, 50);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                setTimeout(applyIOSFixes, 50);
            });
        }
        
        // Aplicar novamente após um tempo para garantir que tudo esteja carregado
        setTimeout(applyIOSFixes, 500);
    }
});