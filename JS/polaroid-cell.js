// Script para corrigir problemas específicos em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    // Corrigir problema da polaroid da esquerda em dispositivos móveis
    function fixPolaroidPositioning() {
        const isMobile = window.innerWidth <= 768;
        const polaroids = document.querySelectorAll('.polaroid');
        
        if (isMobile && polaroids.length > 0) {
            // Forçar um reflow para garantir que as polaroids sejam posicionadas corretamente
            polaroids.forEach(polaroid => {
                if (polaroid.classList.contains('prev')) {
                    // Garantir que a polaroid prev tenha o mesmo z-index que a next
                    polaroid.style.zIndex = "5";
                    // Forçar um reflow
                    void polaroid.offsetWidth;
                }
            });
        }
    }
    
    // Executar a correção após o carregamento e em resize
    fixPolaroidPositioning();
    window.addEventListener('resize', fixPolaroidPositioning);
    
    // Executar novamente após um pequeno atraso para garantir que tudo esteja carregado
    setTimeout(fixPolaroidPositioning, 500);
});