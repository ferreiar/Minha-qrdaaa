function typeText(element, cursorElement, text, speed = 50, delay = 0) {
    let index = 0;
    let tempHTML = "";
    let isTag = false;
    let tagBuffer = "";

    setTimeout(() => {
        function type() {
            if (index < text.length) {
                let char = text[index];

                if (char === "<") {
                    isTag = true;
                    tagBuffer = char;
                } else if (char === ">") {
                    isTag = false;
                    tagBuffer += char;
                    tempHTML += tagBuffer; // Adiciona a tag completa instantaneamente
                } else if (isTag) {
                    tagBuffer += char;
                } else {
                    tempHTML += char;
                }

                element.innerHTML = tempHTML;
                index++;
                setTimeout(type, isTag ? 0 : speed); // Remove o atraso ao processar tags
            } else {
                cursorElement.style.animation = "stop-blink 0.5s forwards";
            }
        }
        type();
    }, delay);
}

// Função para ativar a animação apenas quando a seção estiver visível
function startTypingOnScroll() {
    document.querySelectorAll(".typing-animation").forEach((element) => {
        const cursor = element.nextElementSibling;
        if (!element.dataset.typed) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
            if (isVisible) {
                element.dataset.typed = "true"; // Marca como animado para evitar repetição
                typeText(element, cursor, element.dataset.text);
            }
        }
    });
}

// Ativa a animação no scroll e no carregamento inicial
window.addEventListener("scroll", startTypingOnScroll);
window.addEventListener("load", startTypingOnScroll);
