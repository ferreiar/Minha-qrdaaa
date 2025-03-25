document.addEventListener('DOMContentLoaded', function() {
    // Configurações para os girassóis
    const girassolImgSrc = 'imgs/Logo girassol.png'; // Caminho para a imagem do girassol
    const girassolContainer = document.getElementById('fourt-section'); // Apenas na seção 4
    
    // Ajustar número de girassóis com base no tamanho da tela
    const isMobile = window.innerWidth <= 768;
    const numGirassois = isMobile ? 5 : 10; // Menos girassóis em dispositivos móveis
    
    // Variável para controlar se os girassóis estão ativos
    let girassoisAtivos = false;
    let girassoisCriados = [];
    
    // Função para criar um girassol
    function criarGirassol() {
        if (!girassoisAtivos) return;
        
        const girassol = document.createElement('img');
        girassol.src = girassolImgSrc;
        girassol.classList.add('girassol');
        girassol.style.position = 'absolute'; // Absolute em vez de fixed para ficar dentro da seção
        girassol.style.zIndex = '5';
        girassol.style.pointerEvents = 'none'; // Evita que o girassol interfira com cliques
        girassol.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))';
        
        // Tamanho aleatório entre 15px e 40px (menor em dispositivos móveis)
        const tamanhoMax = isMobile ? 25 : 40;
        const tamanhoMin = isMobile ? 15 : 20;
        const tamanho = Math.random() * (tamanhoMax - tamanhoMin) + tamanhoMin;
        girassol.style.width = `${tamanho}px`;
        girassol.style.height = 'auto';
        
        // Posição inicial aleatória no topo da seção
        girassol.style.left = `${Math.random() * 100}%`;
        girassol.style.top = '-50px';
        
        // Velocidade de queda aleatória (mais lenta em dispositivos móveis para melhor desempenho)
        const velocidadeMax = isMobile ? 1.5 : 2;
        const velocidade = Math.random() * velocidadeMax + 0.8;
        girassol.dataset.velocidade = velocidade;
        
        // Velocidade de rotação aleatória
        const rotacao = Math.random() * 5 - 2.5;
        girassol.dataset.rotacao = rotacao;
        
        // Adicionar ao DOM
        girassolContainer.appendChild(girassol);
        girassoisCriados.push(girassol);
        
        // Iniciar animação
        animarGirassol(girassol);
        
        // Remover após sair da tela
        setTimeout(() => {
            if (girassol.parentNode) {
                girassol.parentNode.removeChild(girassol);
                const index = girassoisCriados.indexOf(girassol);
                if (index > -1) {
                    girassoisCriados.splice(index, 1);
                }
                
                // Criar um novo girassol para substituir se ainda estiver ativo
                if (girassoisAtivos) {
                    criarGirassol();
                }
            }
        }, 15000); // 15 segundos é tempo suficiente para cair pela tela
    }
    
    // Função para animar o girassol caindo
    function animarGirassol(girassol) {
        let posY = parseFloat(girassol.style.top);
        let rotacao = 0;
        const velocidade = parseFloat(girassol.dataset.velocidade);
        const velocidadeRotacao = parseFloat(girassol.dataset.rotacao);
        
        function mover() {
            if (!girassol.parentNode) return; // Parar se o girassol foi removido
            
            posY += velocidade;
            rotacao += velocidadeRotacao;
            
            girassol.style.top = `${posY}px`;
            girassol.style.transform = `rotate(${rotacao}deg)`;
            
            // Continuar animação se ainda estiver na tela
            if (posY < girassolContainer.clientHeight) {
                requestAnimationFrame(mover);
            } else {
                // Remover quando sair da tela
                if (girassol.parentNode) {
                    girassol.parentNode.removeChild(girassol);
                    const index = girassoisCriados.indexOf(girassol);
                    if (index > -1) {
                        girassoisCriados.splice(index, 1);
                    }
                    
                    // Criar um novo girassol para substituir se ainda estiver ativo
                    if (girassoisAtivos) {
                        criarGirassol();
                    }
                }
            }
        }
        
        requestAnimationFrame(mover);
    }
    
    // Usar Intersection Observer para detectar quando a seção 4 está visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Iniciar chuva de girassóis quando a seção estiver visível
                girassoisAtivos = true;
                
                // Criar girassóis iniciais
                for (let i = 0; i < numGirassois; i++) {
                    // Atraso aleatório para criar os girassóis iniciais
                    setTimeout(criarGirassol, Math.random() * 3000);
                }
            } else {
                // Parar chuva de girassóis quando a seção não estiver visível
                girassoisAtivos = false;
                
                // Remover todos os girassóis existentes
                girassoisCriados.forEach(girassol => {
                    if (girassol.parentNode) {
                        girassol.parentNode.removeChild(girassol);
                    }
                });
                girassoisCriados = [];
            }
        });
    }, { threshold: 0.2 }); // Detecta quando pelo menos 20% da seção está visível
    
    // Observar a seção 4
    observer.observe(girassolContainer);
    
    // Ajustar para mudanças de orientação do dispositivo
    window.addEventListener('resize', function() {
        // Atualizar a detecção de dispositivo móvel
        const wasMobile = isMobile;
        const newIsMobile = window.innerWidth <= 768;
        
        // Se houve mudança entre mobile e desktop, ajustar a quantidade de girassóis
        if (wasMobile !== newIsMobile && girassoisAtivos) {
            // Remover todos os girassóis existentes
            girassoisCriados.forEach(girassol => {
                if (girassol.parentNode) {
                    girassol.parentNode.removeChild(girassol);
                }
            });
            girassoisCriados = [];
            
            // Recriar com a nova quantidade
            const newNumGirassois = newIsMobile ? 5 : 10;
            for (let i = 0; i < newNumGirassois; i++) {
                setTimeout(criarGirassol, Math.random() * 2000);
            }
        }
    });
});