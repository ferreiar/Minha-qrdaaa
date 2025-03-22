document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('butterfly-container');
    const section = document.getElementById('third-section');
    
    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    // Ajustar número de borboletas baseado no dispositivo
    const butterflyCount = isMobile ? 8 : 15;
    
    // Tamanhos variados para as borboletas (menores para mobile)
    const sizes = isMobile ? [20, 25, 30, 35, 40] : [30, 40, 50, 60, 70];
    
    // Criar borboletas iniciais
    for (let i = 0; i < butterflyCount; i++) {
        createButterfly();
    }
    
    // Função para criar uma borboleta
    function createButterfly() {
        const butterfly = document.createElement('img');
        butterfly.src = 'imgs/Borboleta Azul.png';
        butterfly.classList.add('butterfly');
        
        // Posição inicial aleatória
        const startPositionX = Math.random() * 100; // % da largura
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Estilo da borboleta
        butterfly.style.position = 'absolute';
        butterfly.style.left = `${startPositionX}%`;
        butterfly.style.top = '-100px';
        butterfly.style.width = `${size}px`;
        butterfly.style.height = 'auto';
        butterfly.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2); // Opacidade entre 0.5 e 1
        butterfly.style.zIndex = '5';
        butterfly.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        
        // Adicionar ao container
        container.appendChild(butterfly);
        
        // Animar a borboleta
        animateButterfly(butterfly);
    }
    
    function animateButterfly(butterfly) {
        // Duração da animação (entre 15 e 30 segundos)
        // Mais rápido em dispositivos móveis para melhor desempenho
        const duration = isMobile ? 
            (Math.random() * 10000 + 10000) : 
            (Math.random() * 15000 + 15000);
        
        // Velocidade de oscilação (quanto menor, mais rápido)
        const oscillationSpeed = Math.random() * 5 + 3;
        
        // Amplitude da oscilação (menor em dispositivos móveis)
        const oscillationAmplitude = isMobile ? 
            (Math.random() * 50 + 25) : 
            (Math.random() * 100 + 50);
        
        // Posição inicial
        const startX = parseFloat(butterfly.style.left);
        
        // Timestamp inicial
        let startTime = null;
        
        // Função de animação
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            
            // Tempo decorrido
            const elapsed = timestamp - startTime;
            
            // Progresso da animação (0 a 1)
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Obter altura atual da seção (para responsividade)
                const sectionHeight = section.offsetHeight;
                
                // Movimento vertical
                const newY = (sectionHeight * progress);
                
                // Movimento horizontal (oscilação)
                const oscillation = Math.sin(progress * oscillationSpeed * Math.PI * 2) * oscillationAmplitude;
                const newX = startX + oscillation;
                
                // Aplicar posição
                butterfly.style.top = `${newY}px`;
                butterfly.style.left = `${newX}%`;
                
                // Rotação suave
                butterfly.style.transform = `rotate(${Math.sin(progress * 3) * 15}deg)`;
                
                // Continuar animação
                requestAnimationFrame(animate);
            } else {
                // Remover borboleta e criar uma nova
                butterfly.remove();
                createButterfly();
            }
        }
        
        // Iniciar animação
        requestAnimationFrame(animate);
    }
    
    // Ajustar quando a janela for redimensionada
    window.addEventListener('resize', function() {
        // Atualizar flag de dispositivo móvel
        const wasMobile = isMobile;
        const nowMobile = window.innerWidth <= 768;
        
        // Se mudou entre mobile e desktop, recarregar a página
        // para ajustar o número e tamanho das borboletas
        if (wasMobile !== nowMobile) {
            location.reload();
        }
    });
    
    // Otimização para dispositivos móveis: pausar animação quando a seção não estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Remover todas as borboletas quando a seção não estiver visível
                const butterflies = container.querySelectorAll('.butterfly');
                butterflies.forEach(b => b.remove());
            } else {
                // Recriar borboletas quando a seção ficar visível novamente
                if (container.querySelectorAll('.butterfly').length === 0) {
                    for (let i = 0; i < butterflyCount; i++) {
                        createButterfly();
                    }
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(section);
});