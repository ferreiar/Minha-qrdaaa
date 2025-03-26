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
                
                // Problema específico: polaroid do lado esquerdo desaparecendo
                if (polaroid.classList.contains('prev')) {
                    // Garantir que a polaroid anterior seja sempre visível
                    polaroid.style.display = 'block';
                    polaroid.style.opacity = '0.6';
                    polaroid.style.zIndex = '6';
                    // Forçar a posição correta
                    polaroid.style.transform = 'translateX(-200px) scale(0.8) rotate(-15deg) translateZ(0)';
                    polaroid.style.position = 'absolute';
                    polaroid.style.left = '50%';
                    polaroid.style.top = '50%';
                    polaroid.style.marginLeft = '-125px';
                    polaroid.style.marginTop = '-150px';
                } else if (polaroid.classList.contains('active')) {
                    polaroid.style.zIndex = '10';
                    polaroid.style.display = 'block';
                    polaroid.style.opacity = '1';
                } else if (polaroid.classList.contains('next')) {
                    polaroid.style.zIndex = '6';
                    polaroid.style.display = 'block';
                    polaroid.style.opacity = '0.6';
                }
            });
        }
        
        // Sobrescrever a função updatePolaroids original para iOS
        if (window.updatePolaroids) {
            const originalUpdatePolaroids = window.updatePolaroids;
            window.updatePolaroids = function() {
                originalUpdatePolaroids();
                if (isIOS) {
                    setTimeout(applyIOSFixes, 10);
                }
            };
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
        // E aplicar periodicamente para garantir consistência
        setInterval(applyIOSFixes, 1000);
    }
});