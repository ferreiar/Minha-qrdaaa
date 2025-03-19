 // Script para o carrossel automático
 const carouselInner = document.querySelector('.carousel-inner');
 const carouselItems = document.querySelectorAll('.carousel-item');
 let currentIndex = 0;

 function moveCarousel() {
     currentIndex = (currentIndex + 1) % carouselItems.length;
     carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
 }

 setInterval(moveCarousel, 3000); // Muda a cada 3 segundos