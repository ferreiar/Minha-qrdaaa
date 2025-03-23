document.addEventListener('DOMContentLoaded', function() {
    // Script para o carrossel automático da terceira seção
    const carouselInner = document.querySelector('#third-section .carousel-inner');
    const carouselItems = document.querySelectorAll('#third-section .carousel-item');
    
    if (!carouselInner || carouselItems.length === 0) return;
    
    let currentIndex = 0;
    
    function moveCarousel() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setInterval(moveCarousel, 3000); // Muda a cada 3 segundos
});