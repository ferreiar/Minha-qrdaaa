const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            // Gera um número aleatório para decidir a cor da linha
            const randomColor = Math.random() < 0.5 ? 'rgba(103, 207, 241, 1)' : 'rgba(255, 221, 51, 1)';
            link.style.setProperty('--line-color', randomColor); // Define a cor da linha
        });

        link.addEventListener('mouseout', () => {
            // Remove a cor de fundo ao sair do mouse
            link.style.setProperty('--line-color', 'transparent'); // Retorna a linha para transparente
        });
    });