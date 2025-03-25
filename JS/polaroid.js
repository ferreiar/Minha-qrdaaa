document.addEventListener('DOMContentLoaded', function() {
    const polaroids = document.querySelectorAll('.polaroid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let isAnimating = false; // Flag para evitar cliques durante a animação
    let autoplayInterval = null;
    
    // Inicializar o carrossel
    function initCarousel() {
        if (polaroids.length === 0) return;
        
        // Definir classes iniciais
        updatePolaroids();
        
        // Adicionar índices para animação
        polaroids.forEach((polaroid, index) => {
            polaroid.style.setProperty('--index', index);
            
            // Definir ângulos de rotação aleatórios para cada polaroid
            const randomAngle = Math.random() * 10 - 5; // Entre -5 e 5 graus
            polaroid.style.setProperty('--rotate-angle', `${randomAngle}deg`);
        });
    }
    
    // Atualizar as classes das polaroids
    function updatePolaroids() {
        polaroids.forEach((polaroid, index) => {
            polaroid.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                polaroid.classList.add('active');
            } else if (index === getPrevIndex()) {
                polaroid.classList.add('prev');
            } else if (index === getNextIndex()) {
                polaroid.classList.add('next');
            }
        });
    }
    
    // Obter o índice anterior
    function getPrevIndex() {
        return (currentIndex - 1 + polaroids.length) % polaroids.length;
    }
    
    // Obter o próximo índice
    function getNextIndex() {
        return (currentIndex + 1) % polaroids.length;
    }
    
    // Ir para a polaroid anterior
    function goToPrev() {
        if (isAnimating || polaroids.length <= 1) return;
        
        isAnimating = true;
        currentIndex = getPrevIndex();
        updatePolaroids();
        
        // Permitir nova animação após um tempo
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Tempo um pouco maior que a duração da transição
    }
    
    // Ir para a próxima polaroid
    function goToNext() {
        if (isAnimating || polaroids.length <= 1) return;
        
        isAnimating = true;
        currentIndex = getNextIndex();
        updatePolaroids();
        
        // Permitir nova animação após um tempo
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Tempo um pouco maior que a duração da transição
    }
    
    // Adicionar event listeners aos botões
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            stopAutoplay(); // Parar autoplay ao clicar
            goToPrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            stopAutoplay(); // Parar autoplay ao clicar
            goToNext();
        });
    }
    
    // Adicionar suporte para swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    const polaroidCarousel = document.querySelector('.polaroid-carousel');
    if (polaroidCarousel) {
        polaroidCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        polaroidCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda - próxima polaroid
            stopAutoplay();
            goToNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita - polaroid anterior
            stopAutoplay();
            goToPrev();
        }
    }
    
    // Funções para autoplay
    function startAutoplay() {
        if (autoplayInterval) return;
        
        autoplayInterval = setInterval(() => {
            goToNext();
        }, 5000); // Mudar a cada 5 segundos
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Inicializar o carrossel
    initCarousel();
    
    // Iniciar autoplay (opcional - remova se não quiser autoplay)
    // startAutoplay();
    
    // Parar autoplay quando a página não estiver visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            // startAutoplay(); // Descomente se quiser reiniciar o autoplay quando a página ficar visível novamente
        }
    });
    
    // Adicionar event listeners para pausar o autoplay ao interagir com o carrossel
    polaroidCarousel?.addEventListener('mouseenter', stopAutoplay);
    // polaroidCarousel?.addEventListener('mouseleave', startAutoplay); // Descomente se quiser reiniciar o autoplay ao sair do mouse
});