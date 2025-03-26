document.addEventListener('DOMContentLoaded', function() {
    const polaroids = document.querySelectorAll('.polaroid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let isAnimating = false;
    
    // Inicializar o carrossel
    function initCarousel() {
        if (polaroids.length === 0) return;
        
        // Esconder todas as polaroids inicialmente
        polaroids.forEach(polaroid => {
            polaroid.style.display = 'none';
        });
        
        // Mostrar apenas as três polaroids iniciais (prev, active, next)
        updatePolaroids();
    }
    
    // Atualizar as polaroids visíveis
    function updatePolaroids() {
        // Esconder todas as polaroids
        polaroids.forEach(polaroid => {
            polaroid.style.display = 'none';
            polaroid.classList.remove('active', 'prev', 'next');
        });
        
        // Calcular índices
        const prevIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        const nextIndex = (currentIndex + 1) % polaroids.length;
        
        // Configurar polaroid anterior
        if (polaroids[prevIndex]) {
            const prevPolaroid = polaroids[prevIndex];
            prevPolaroid.style.display = 'block';
            prevPolaroid.classList.add('prev');
            prevPolaroid.style.transform = 'translateX(-200px) scale(0.8) rotate(-15deg)';
            prevPolaroid.style.opacity = '0.6';
            prevPolaroid.style.zIndex = '5';
            prevPolaroid.style.position = 'absolute';
            prevPolaroid.style.left = '50%';
            prevPolaroid.style.top = '50%';
            prevPolaroid.style.marginLeft = '-125px'; // Metade da largura
            prevPolaroid.style.marginTop = '-150px'; // Metade da altura aproximada
        }
        
        // Configurar polaroid ativa (central)
        if (polaroids[currentIndex]) {
            const activePolaroid = polaroids[currentIndex];
            activePolaroid.style.display = 'block';
            activePolaroid.classList.add('active');
            activePolaroid.style.transform = 'translateX(0) scale(1) rotate(0deg)';
            activePolaroid.style.opacity = '1';
            activePolaroid.style.zIndex = '10';
            activePolaroid.style.position = 'absolute';
            activePolaroid.style.left = '50%';
            activePolaroid.style.top = '50%';
            activePolaroid.style.marginLeft = '-125px'; // Metade da largura
            activePolaroid.style.marginTop = '-150px'; // Metade da altura aproximada
        }
        
        // Configurar próxima polaroid
        if (polaroids[nextIndex]) {
            const nextPolaroid = polaroids[nextIndex];
            nextPolaroid.style.display = 'block';
            nextPolaroid.classList.add('next');
            nextPolaroid.style.transform = 'translateX(200px) scale(0.8) rotate(15deg)';
            nextPolaroid.style.opacity = '0.6';
            nextPolaroid.style.zIndex = '5';
            nextPolaroid.style.position = 'absolute';
            nextPolaroid.style.left = '50%';
            nextPolaroid.style.top = '50%';
            nextPolaroid.style.marginLeft = '-125px'; // Metade da largura
            nextPolaroid.style.marginTop = '-150px'; // Metade da altura aproximada
        }
    }
    
    // Ir para a polaroid anterior
    function goToPrev() {
        if (isAnimating || polaroids.length <= 1) return;
        
        isAnimating = true;
        currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        updatePolaroids();
        
        // Permitir nova animação após um tempo
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Ir para a próxima polaroid
    function goToNext() {
        if (isAnimating || polaroids.length <= 1) return;
        
        isAnimating = true;
        currentIndex = (currentIndex + 1) % polaroids.length;
        updatePolaroids();
        
        // Permitir nova animação após um tempo
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Adicionar event listeners aos botões
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNext);
    }
    
    // Inicializar o carrossel
    initCarousel();
});