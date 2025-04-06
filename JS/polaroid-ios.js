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
        
        // Função para atualizar as polaroids no iOS com hardware acceleration
        function updateIOSPolaroids() {
            // Calcular índices
            const prevIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
            const nextIndex = (currentIndex + 1) % polaroids.length;
            
            // Importante: Definir todos os estados ANTES de modificar o display
            polaroids.forEach((polaroid, index) => {
                // Remover todas as classes primeiro
                polaroid.classList.remove('active', 'prev', 'next');
                
                // Atribuir novas classes baseadas no índice
                if (index === currentIndex) {
                    polaroid.classList.add('active');
                } else if (index === prevIndex) {
                    polaroid.classList.add('prev');
                } else if (index === nextIndex) {
                    polaroid.classList.add('next');
                }
            });
            
            // Em um segundo passo, atualize o display para evitar a cintilação
            polaroids.forEach((polaroid, index) => {
                if (index === currentIndex || index === prevIndex || index === nextIndex) {
                    polaroid.style.display = 'block';
                    // Forçar repaint para garantir que as transições funcionem
                    void polaroid.offsetWidth;
                } else {
                    // Pequeno atraso antes de esconder elementos não visíveis
                    // para evitar problemas de renderização
                    setTimeout(() => {
                        polaroid.style.display = 'none';
                    }, 50);
                }
            });
        }
        
        // Função para ir para a polaroid anterior
        function goToPrev() {
            if (isAnimating || polaroids.length <= 1) return;
            
            isAnimating = true;
            currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
            
            // Garantir que o elemento anterior esteja visível antes da transição
            const prevIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
            if (polaroids[prevIndex]) {
                polaroids[prevIndex].style.display = 'block';
                void polaroids[prevIndex].offsetWidth;
            }
            
            // Aplicar classes com um pequeno atraso para garantir que o DOM seja atualizado
            requestAnimationFrame(() => {
                updateIOSPolaroids();
                
                // Permitir nova animação após um tempo
                setTimeout(() => {
                    isAnimating = false;
                }, 500); // Tempo ligeiramente aumentado para garantir que a animação termine
            });
        }
        
        // Função para ir para a próxima polaroid
        function goToNext() {
            if (isAnimating || polaroids.length <= 1) return;
            
            isAnimating = true;
            currentIndex = (currentIndex + 1) % polaroids.length;
            
            // Garantir que o próximo elemento esteja visível antes da transição
            const nextIndex = (currentIndex + 1) % polaroids.length;
            if (polaroids[nextIndex]) {
                polaroids[nextIndex].style.display = 'block';
                void polaroids[nextIndex].offsetWidth;
            }
            
            // Aplicar classes com um pequeno atraso para garantir que o DOM seja atualizado
            requestAnimationFrame(() => {
                updateIOSPolaroids();
                
                // Permitir nova animação após um tempo
                setTimeout(() => {
                    isAnimating = false;
                }, 500); // Tempo ligeiramente aumentado para garantir que a animação termine
            });
        }
        
        // Substituir os event listeners dos botões
        if (prevBtn) {
            prevBtn.removeEventListener('click', window.goToPrev);
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToPrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.removeEventListener('click', window.goToNext);
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToNext();
            });
        }
        
        // Adicionar suporte para gestos de swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (polaroidCarousel) {
            polaroidCarousel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            polaroidCarousel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe para a esquerda - próxima polaroid
                goToNext();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe para a direita - polaroid anterior
                goToPrev();
            }
        }
        
        // Inicializar o carrossel para iOS
        // Garantir que todos os elementos necessários estejam visíveis desde o início
        polaroids.forEach((polaroid, index) => {
            if (index === currentIndex || 
                index === (currentIndex - 1 + polaroids.length) % polaroids.length || 
                index === (currentIndex + 1) % polaroids.length) {
                polaroid.style.display = 'block';
            } else {
                polaroid.style.display = 'none';
            }
        });
        updateIOSPolaroids();
        
        // Sobrescrever as funções globais para iOS
        window.updatePolaroids = updateIOSPolaroids;
        window.goToPrev = goToPrev;
        window.goToNext = goToNext;
        
        console.log("Correções para iOS aplicadas com sucesso");
    }
});