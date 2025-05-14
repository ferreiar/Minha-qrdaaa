function atualizarContador2() {
    const dataInicial = new Date("2024-09-01T00:00:00");
    const agora = new Date();
    
    if (dataInicial > agora) {
        resetarContador2();
        return;
    }
    
    // Calcular a diferença em milissegundos
    const diferenca = agora - dataInicial;
    
    // Calcular anos, meses e dias de forma mais precisa
    let anos = 0;
    let meses = 0;
    let dias = 0;
    
    // Criar uma data temporária para calcular
    let tempDate = new Date(dataInicial);
    
    // Calcular anos completos
    while (true) {
        const nextYear = new Date(tempDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        if (nextYear <= agora) {
            anos++;
            tempDate = nextYear;
        } else {
            break;
        }
    }
    
    // Calcular meses completos
    while (true) {
        const nextMonth = new Date(tempDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        if (nextMonth <= agora) {
            meses++;
            tempDate = nextMonth;
        } else {
            break;
        }
    }
    
    // Calcular dias restantes
    dias = Math.floor((agora - tempDate) / (1000 * 60 * 60 * 24));
    
    // Calcular horas, minutos e segundos
    const horasTotal = Math.floor((agora - tempDate) / (1000 * 60 * 60)) % 24;
    const minutosTotal = Math.floor((agora - tempDate) / (1000 * 60)) % 60;
    const segundosTotal = Math.floor((agora - tempDate) / 1000) % 60;
    
    document.getElementById("years2").textContent = anos;
    document.getElementById("months2").textContent = meses;
    document.getElementById("days2").textContent = dias;
    document.getElementById("hours2").textContent = horasTotal.toString().padStart(2, '0');
    document.getElementById("minutes2").textContent = minutosTotal.toString().padStart(2, '0');
    document.getElementById("seconds2").textContent = segundosTotal.toString().padStart(2, '0');
}

function resetarContador2() {
    document.getElementById("years2").textContent = "0";
    document.getElementById("months2").textContent = "0";
    document.getElementById("days2").textContent = "0";
    document.getElementById("hours2").textContent = "00";
    document.getElementById("minutes2").textContent = "00";
    document.getElementById("seconds2").textContent = "00";
}

setInterval(atualizarContador2, 1000);
document.addEventListener('DOMContentLoaded', function() {
    atualizarContador2();
});