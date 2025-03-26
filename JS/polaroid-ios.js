// Script para corrigir problemas específicos em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    // Detectar se é um dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Corrigir problema da polaroid da esquerda em dispositivos iOS
    function fixPolaroidPositioning() {
        const polaroids = document.querySelectorAll('.polaroid');
        
        if (isIOS && polaroids.length > 0) {
            // Aplicar correções específicas para iOS
            polaroids.forEach(polaroid => {
                // Forçar hardware acceleration em todos os elementos polaroid
                polaroid.style.transform = `${polaroid.style.transform} translateZ(0)`;
                polaroid.style.backfaceVisibility = 'hidden';
                
                if (polaroid.classList.contains('prev')) {
                    // Aumentar o z-index da polaroid à esquerda para garantir que fique acima
                    polaroid.style.zIndex = "6";
                }
            });
            
            // Adicionar classe específica para iOS ao container
            document.querySelector('.polaroid-carousel').classList.add('ios-fix');
        }
    }
    
    // Executar a correção após o carregamento
    fixPolaroidPositioning();
    
    // Observar mudanças nas classes das polaroids para reajustar quando necessário
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                // Reajustar z-index quando as classes mudarem (ao navegar no carrossel)
                setTimeout(fixPolaroidPositioning, 10);
            }
        });
    });
    
    // Observar todas as polaroids
    polaroids.forEach(polaroid => {
        observer.observe(polaroid, { attributes: true });
    });
    
    // Executar novamente após um pequeno atraso para garantir que tudo esteja carregado
    setTimeout(fixPolaroidPositioning, 500);
});