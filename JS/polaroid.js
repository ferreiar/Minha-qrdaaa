document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos
    const polaroids = document.querySelectorAll('.polaroid');
    const prevBtn = document.getElementById('prev-polaroid');
    const nextBtn = document.getElementById('next-polaroid');
    const carousel = document.querySelector('.polaroid-carousel');
    
    // Configurar índices iniciais
    let currentIndex = 0;
    let prevIndex = polaroids.length - 1;
    let nextIndex = 1;
    
    // Variáveis para controle de toque
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Inicializar polaroids com atraso para animação
    polaroids.forEach((polaroid, index) => {
        polaroid.style.setProperty('--index', index);
        
        // Definir posições iniciais após um pequeno atraso
        setTimeout(() => {
            if (index === currentIndex) {
                polaroid.classList.add('active');
            } else if (index === prevIndex) {
                polaroid.classList.add('prev');
            } else if (index === nextIndex) {
                polaroid.classList.add('next');
            } else {
                polaroid.style.opacity = '0';
                polaroid.style.transform = `translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 500 + 300}px) 
                                           scale(0.7) 
                                           rotate(${Math.random() * 40 - 20}deg)`;
            }
        }, 100);
    });
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        // Remover todas as classes
        polaroids.forEach(polaroid => {
            polaroid.classList.remove('active', 'prev', 'next');
            polaroid.style.opacity = '0';
        });
        
        // Adicionar classes para os slides atuais
        polaroids[currentIndex].classList.add('active');
        polaroids[prevIndex].classList.add('prev');
        polaroids[nextIndex].classList.add('next');
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        prevIndex = currentIndex;
        currentIndex = nextIndex;
        nextIndex = (nextIndex + 1) % polaroids.length;
        updateCarousel();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        nextIndex = currentIndex;
        currentIndex = prevIndex;
        prevIndex = (prevIndex - 1 + polaroids.length) % polaroids.length;
        updateCarousel();
    }
    
    // Adicionar event listeners aos botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Suporte para gestos de toque (swipe)
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda - próximo slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita - slide anterior
            prevSlide();
        }
    }
    
    // Detectar quando a seção está visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reiniciar animações quando a seção estiver visível
                polaroids.forEach((polaroid, index) => {
                    polaroid.style.animationName = 'none';
                    setTimeout(() => {
                        polaroid.style.animationName = 'polaroidFadeIn';
                    }, 10);
                });
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(document.getElementById('fourt-section'));
    
    // Auto-rotação do carrossel (opcional)
    let autoRotate = setInterval(nextSlide, 5000);
    
    // Parar auto-rotação quando o usuário interagir
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 5000);
    });
    
    // Também parar auto-rotação durante interações de toque
    carousel.addEventListener('touchstart', () => {
        clearInterval(autoRotate);
    }, {passive: true});
    
    carousel.addEventListener('touchend', () => {
        autoRotate = setInterval(nextSlide, 5000);
    }, {passive: true});
    
    // Ajustar para mudanças de orientação do dispositivo
    window.addEventListener('resize', function() {
        // Forçar atualização do carrossel após redimensionamento
        updateCarousel();
    });
});