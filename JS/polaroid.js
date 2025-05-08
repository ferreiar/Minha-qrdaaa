document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de polaroid carregado");
    
    const polaroidItems = document.querySelectorAll('.polaroid-item');
    const polaroids = document.querySelectorAll('.polaroid');
    const polaroidCarousel = document.querySelector('.polaroid-carousel');
    
    // Criar o elemento interno do carrossel se não existir
    let carouselInner = document.querySelector('.polaroid-carousel-inner');
    if (!carouselInner) {
        carouselInner = document.createElement('div');
        carouselInner.className = 'polaroid-carousel-inner';
        
        // Mover todas as polaroids para dentro do carouselInner
        while (polaroidCarousel.firstChild) {
            carouselInner.appendChild(polaroidCarousel.firstChild);
        }
        
        polaroidCarousel.appendChild(carouselInner);
    }
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayInterval;
    let rotationAngle = 0;
    
    // Inicializar o carrossel
    function initCarousel() {
        if (polaroidItems.length === 0) return;
        
        // Posicionar as polaroids em círculo
        positionPolaroidsInCircle();
        
        // Iniciar o autoplay
        startAutoplay();
    }
    
    // Posicionar as polaroids em um círculo 3D
    function positionPolaroidsInCircle() {
        const totalItems = polaroidItems.length;
        
        // Aumentar o raio com base no número de itens para criar mais espaçamento
        // Quanto mais itens, maior o raio para evitar sobreposição
        const baseRadius = 1650; // Raio base aumentado para criar mais espaçamento
        const radius = Math.max(baseRadius, totalItems * 20); // Escala o raio com o número de itens
        
        // Calcular o ângulo entre cada item
        const angleStep = 360 / totalItems;
        
        polaroidItems.forEach((item, index) => {
            const angle = angleStep * index;
            const radian = angle * Math.PI / 180;
            
            // Posicionar cada item em um ponto do círculo
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            
            // Contra-rotação para manter a polaroid sempre de frente
            const polaroid = item.querySelector('.polaroid');
            if (polaroid) {
                polaroid.style.transform = `rotateY(${-angle}deg)`;
            }
            
            // Definir o índice como atributo de dados para uso posterior
            item.dataset.index = index;
        });
        
        // Definir a polaroid ativa inicial
        updateActivePolaroid();
    }
    
    // Atualizar qual polaroid está ativa
    function updateActivePolaroid() {
        // Remover a classe ativa de todas as polaroids
        polaroids.forEach(polaroid => {
            polaroid.classList.remove('active');
        });
        
        // Adicionar a classe ativa à polaroid atual
        const activeItem = polaroidItems[currentIndex];
        if (activeItem) {
            const activePolaroid = activeItem.querySelector('.polaroid');
            if (activePolaroid) {
                activePolaroid.classList.add('active');
            }
        }
    }
    
    // Girar o carrossel
    function rotateCarousel(direction = 1) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Atualizar o índice atual
        currentIndex = (currentIndex + direction + polaroidItems.length) % polaroidItems.length;
        
        // Atualizar o ângulo de rotação
        rotationAngle -= direction * (360 / polaroidItems.length);
        
        // Aplicar a rotação ao carrossel
        carouselInner.style.transform = `rotateY(${rotationAngle}deg)`;
        
        // Atualizar a polaroid ativa
        updateActivePolaroid();
        
        // Permitir nova animação após o término da transição
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
    
    // Ir para a próxima polaroid
    function goToNext() {
        rotateCarousel(1);
    }
    
    // Ir para a polaroid anterior
    function goToPrev() {
        rotateCarousel(-1);
    }
    
    // Iniciar o autoplay
    function startAutoplay() {
        // Limpar qualquer intervalo existente
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        
        // Definir novo intervalo para mudar a cada 5 segundos
        autoplayInterval = setInterval(() => {
            goToNext();
        }, 5000);
    }
    
    // Parar o autoplay (caso necessário)
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Pausar o autoplay quando a página estiver em segundo plano
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    
    // Expor funções globalmente para possível uso externo
    window.goToNext = goToNext;
    window.goToPrev = goToPrev;
    window.startAutoplay = startAutoplay;
    window.stopAutoplay = stopAutoplay;
    
    // Inicializar o carrossel
    initCarousel();
});