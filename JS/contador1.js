function atualizarContador() {
    const dataInicial = new Date("2024-05-14T09:18:00");
    const agora = new Date();
    
    if (dataInicial > agora) {
        resetarContador();
        return;
    }
    
    let anos = agora.getFullYear() - dataInicial.getFullYear();
    let meses = agora.getMonth() - dataInicial.getMonth();
    
    if (meses < 0) {
        anos--;
        meses += 12;
    }
    
    let dias = agora.getDate() - dataInicial.getDate();
    
    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            0
        ).getDate();
        dias += ultimoDiaMesAnterior;
        
        if (meses < 0) {
            anos--;
            meses += 12;
        }
    }
    
    let horas = agora.getHours() - dataInicial.getHours();
    let minutos = agora.getMinutes() - dataInicial.getMinutes();
    let segundos = agora.getSeconds() - dataInicial.getSeconds();
    
    if (segundos < 0) {
        minutos--;
        segundos += 60;
    }
    
    if (minutos < 0) {
        horas--;
        minutos += 60;
    }
    
    if (horas < 0) {
        dias--;
        horas += 24;
    }
    
    document.getElementById("years").textContent = anos;
    document.getElementById("months").textContent = meses;
    document.getElementById("days").textContent = dias;
    document.getElementById("hours").textContent = horas.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutos.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = segundos.toString().padStart(2, '0');
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