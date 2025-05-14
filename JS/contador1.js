function atualizarContador() {
    const dataInicial = new Date("2024-05-14T09:18:00");
    const agora = new Date();
    
    if (dataInicial > agora) {
        resetarContador();
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
    
    document.getElementById("years").textContent = anos;
    document.getElementById("months").textContent = meses;
    document.getElementById("days").textContent = dias;
    document.getElementById("hours").textContent = horasTotal.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutosTotal.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = segundosTotal.toString().padStart(2, '0');
}

function resetarContador() {
    document.getElementById("years").textContent = "0";
    document.getElementById("months").textContent = "0";
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
}

setInterval(atualizarContador, 1000);
atualizarContador();