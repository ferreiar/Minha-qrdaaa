const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

menuButton.addEventListener("click", function() {
    // Alterna a visibilidade do menu
    mobileMenu.classList.toggle("hidden");

    // Alterna o ícone do botão
    if (mobileMenu.classList.contains("hidden")) {
        menuIcon.classList.remove("fa-times"); // Remove o ícone de "X"
        menuIcon.classList.add("fa-bars"); // Adiciona o ícone de "barras"
    } else {
        menuIcon.classList.remove("fa-bars"); // Remove o ícone de "barras"
        menuIcon.classList.add("fa-times"); // Adiciona o ícone de "X"
    }
});