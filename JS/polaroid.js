document.addEventListener('DOMContentLoaded', function() {
    const polaroids = document.querySelectorAll('.polaroid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let isAnimating = false;
    
    // Detectar se é um dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
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
        // Primeiro, remover todas as classes
        polaroids.forEach((polaroid) => {
            polaroid.classList.remove('active', 'prev', 'next');
            polaroid.style.zIndex = "1"; // Reset z-index
        });
        
        // Depois, adicionar as classes na ordem correta
        const prevIndex = getPrevIndex();
        const nextIndex = getNextIndex();
        
        // Primeiro, definir next (menor z-index)
        if (polaroids[nextIndex]) {
            polaroids[nextIndex].classList.add('next');
            polaroids[nextIndex].style.zIndex = isIOS ? "5" : "5";
        }
        
        // Depois, definir prev (z-index intermediário)
        if (polaroids[prevIndex]) {
            polaroids[prevIndex].classList.add('prev');
            polaroids[prevIndex].style.zIndex = isIOS ? "6" : "5"; // Maior z-index para iOS
        }
        
        // Por último, definir active (para ficar por cima)
        if (polaroids[currentIndex]) {
            polaroids[currentIndex].classList.add('active');
            polaroids[currentIndex].style.zIndex = "10";
        }
        
        // Forçar um reflow para garantir que as mudanças sejam aplicadas
        void document.querySelector('.polaroid-carousel').offsetWidth;
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
        }, 800);
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
        }, 800);
    }
    
    // Adicionar event listeners aos botões
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToPrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToNext();
        });
    }
    
    // Inicializar o carrossel
    initCarousel();
    
    // Forçar uma atualização após um pequeno atraso para garantir que tudo seja renderizado corretamente
    setTimeout(() => {
        updatePolaroids();
    }, 100);
});