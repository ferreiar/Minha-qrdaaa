const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const menuLinks = document.querySelectorAll("#mobile-menu a"); // Seleciona todos os links do menu

menuButton.addEventListener("click", function() {
    const isHidden = mobileMenu.classList.toggle("hidden"); // Alterna a classe "hidden"

    // Alterna o ícone do botão com base no estado do menu
    if (isHidden) {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    } else {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
    }
});

// Fecha o menu quando um link for clicado
menuLinks.forEach(link => {
    link.addEventListener("click", function() {
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden"); // Fecha o menu
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars"); // Retorna ao ícone de "barras"
        }
    });
});
