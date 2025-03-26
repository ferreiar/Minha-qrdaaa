document.addEventListener('DOMContentLoaded', function() {
    // Detectar se é um dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        console.log("Dispositivo iOS detectado - aplicando correções específicas");
        
        // Selecionar elementos
        const polaroidCarousel = document.querySelector('.polaroid-carousel');
        const polaroids = document.querySelectorAll('.polaroid');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        // Adicionar classe específica para iOS
        if (polaroidCarousel) {
            polaroidCarousel.classList.add('ios-fix');
        }
        
        // Substituir completamente a lógica do carrossel para iOS
        let currentIndex = 0;
        let isAnimating = false;
        
        // Função para atualizar as polaroids no iOS
        function updateIOSPolaroids() {
            // Esconder todas as polaroids primeiro
            polaroids.forEach(polaroid => {
                polaroid.style.display = 'none';
                polaroid.classList.remove('active', 'prev', 'next');
            });
            
            // Calcular índices
            const prevIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
            const nextIndex = (currentIndex + 1) % polaroids.length;
            
            // Configurar polaroid anterior (esquerda)
            const prevPolaroid = polaroids[prevIndex];
            if (prevPolaroid) {
                prevPolaroid.style.display = 'block';
                prevPolaroid.classList.add('prev');
                prevPolaroid.style.position = 'absolute';
                prevPolaroid.style.left = '50%';
                prevPolaroid.style.top = '50%';
                prevPolaroid.style.marginLeft = '-125px';
                prevPolaroid.style.marginTop = '-150px';
                prevPolaroid.style.transform = 'translateX(-200px) scale(0.8) rotate(-15deg)';
                prevPolaroid.style.webkitTransform = 'translateX(-200px) scale(0.8) rotate(-15deg)';
                prevPolaroid.style.opacity = '0.6';
                prevPolaroid.style.zIndex = '6';
                prevPolaroid.style.transition = 'none';
                // Forçar repaint
                void prevPolaroid.offsetWidth;
                prevPolaroid.style.transition = 'all 0.3s ease-in-out';
            }
            
            // Configurar polaroid ativa (central)
            const activePolaroid = polaroids[currentIndex];
            if (activePolaroid) {
                activePolaroid.style.display = 'block';
                activePolaroid.classList.add('active');
                activePolaroid.style.position = 'absolute';
                activePolaroid.style.left = '50%';
                activePolaroid.style.top = '50%';
                activePolaroid.style.marginLeft = '-125px';
                activePolaroid.style.marginTop = '-150px';
                activePolaroid.style.transform = 'translateX(0) scale(1) rotate(0deg)';
                activePolaroid.style.webkitTransform = 'translateX(0) scale(1) rotate(0deg)';
                activePolaroid.style.opacity = '1';
                activePolaroid.style.zIndex = '10';
                activePolaroid.style.transition = 'none';
                // Forçar repaint
                void activePolaroid.offsetWidth;
                activePolaroid.style.transition = 'all 0.3s ease-in-out';
            }
            
            // Configurar próxima polaroid (direita)
            const nextPolaroid = polaroids[nextIndex];
            if (nextPolaroid) {
                nextPolaroid.style.display = 'block';
                nextPolaroid.classList.add('next');
                nextPolaroid.style.position = 'absolute';
                nextPolaroid.style.left = '50%';
                nextPolaroid.style.top = '50%';
                nextPolaroid.style.marginLeft = '-125px';
                nextPolaroid.style.marginTop = '-150px';
                nextPolaroid.style.transform = 'translateX(200px) scale(0.8) rotate(15deg)';
                nextPolaroid.style.webkitTransform = 'translateX(200px) scale(0.8) rotate(15deg)';
                nextPolaroid.style.opacity = '0.6';
                nextPolaroid.style.zIndex = '6';
                nextPolaroid.style.transition = 'none';
                // Forçar repaint
                void nextPolaroid.offsetWidth;
                nextPolaroid.style.transition = 'all 0.3s ease-in-out';
            }
        }
        
        // Função para ir para a polaroid anterior
        function goToPrev() {
            if (isAnimating || polaroids.length <= 1) return;
            
            isAnimating = true;
            currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
            updateIOSPolaroids();
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }
        
        // Função para ir para a próxima polaroid
        function goToNext() {
            if (isAnimating || polaroids.length <= 1) return;
            
            isAnimating = true;
            currentIndex = (currentIndex + 1) % polaroids.length;
            updateIOSPolaroids();
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }
        
        // Substituir os event listeners dos botões
        if (prevBtn) {
            prevBtn.removeEventListener('click', window.goToPrev);
            prevBtn.addEventListener('click', goToPrev);
        }
        
        if (nextBtn) {
            nextBtn.removeEventListener('click', window.goToNext);
            nextBtn.addEventListener('click', goToNext);
        }
        
        // Inicializar o carrossel para iOS
        updateIOSPolaroids();
        
        // Sobrescrever as funções globais para iOS
        window.updatePolaroids = updateIOSPolaroids;
        window.goToPrev = goToPrev;
        window.goToNext = goToNext;
        
        console.log("Correções para iOS aplicadas com sucesso");
    }
});