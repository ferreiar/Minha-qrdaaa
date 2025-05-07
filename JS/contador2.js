function atualizarContador2() {
    const dataInicial = new Date("2024-09-01T00:00:00");
    const agora = new Date();
    
    if (dataInicial > agora) {
        resetarContador2();
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
    
    document.getElementById("years2").textContent = anos;
    document.getElementById("months2").textContent = meses;
    document.getElementById("days2").textContent = dias;
    document.getElementById("hours2").textContent = horas.toString().padStart(2, '0');
    document.getElementById("minutes2").textContent = minutos.toString().padStart(2, '0');
    document.getElementById("seconds2").textContent = segundos.toString().padStart(2, '0');
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