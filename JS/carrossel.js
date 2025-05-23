document.addEventListener('DOMContentLoaded', function() {
    // Script para o carrossel automático da segunda seção
    const carouselInner = document.querySelector('#second-section .carousel-inner');
    const carouselItems = document.querySelectorAll('#second-section .carousel-item');
    
    if (!carouselInner || carouselItems.length === 0) return;
    
    let currentIndex = 0;
    
    function moveCarousel() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setInterval(moveCarousel, 3000); // Muda a cada 3 segundos
});