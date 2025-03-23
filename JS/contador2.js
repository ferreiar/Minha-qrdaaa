function atualizarContador2() {
    // Data de início do relacionamento (24 de dezembro de 2023)
    const dataInicial = new Date("2024-09-01T00:00:00");
    const agora = new Date();
    const diferenca = agora - dataInicial;

    const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)); // Considerando mês médio de 30.44 dias
    const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("years2").textContent = anos;
    document.getElementById("months2").textContent = meses;
    document.getElementById("days2").textContent = dias;
    document.getElementById("hours2").textContent = horas;
    document.getElementById("minutes2").textContent = minutos;
    document.getElementById("seconds2").textContent = segundos;
}

// Atualizar a cada segundo
setInterval(atualizarContador2, 1000);

// Iniciar o contador imediatamente
document.addEventListener('DOMContentLoaded', function() {
    atualizarContador2();
});