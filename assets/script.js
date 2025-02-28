function calcular(tipo) {
    let valor = parseFloat(document.getElementById(`valor${tipo}`).value) || 0;
    let taxaConcorrente = parseFloat(document.getElementById(`taxaConcorrente${tipo}`).value) || 0;
    let taxaMP = parseFloat(document.getElementById(`taxaMP${tipo}`).value) || 0;
    let parcelas = tipo === 'Parcelado' ? parseInt(document.getElementById('parcelas').value) : 1;

    let gastoConcorrente = (valor * (taxaConcorrente / 100)) * parcelas;
    let gastoMP = (valor * (taxaMP / 100)) * parcelas;
    let economia = gastoConcorrente - gastoMP;

    document.getElementById(`resultado${tipo}`).innerHTML = 
        `Concorrente: R$${gastoConcorrente.toFixed(2)}<br>
         Mercado Pago: R$${gastoMP.toFixed(2)}<br>
         Economia: R$${economia.toFixed(2)}`;

    calcularTotal();
}

function calcularTotal() {
    let valores = ['Debito', 'Credito', 'Parcelado'];
    let totalConcorrente = 0;
    let totalMP = 0;
    
    valores.forEach(tipo => {
        let resultado = document.getElementById(`resultado${tipo}`).innerHTML;
        if (resultado) {
            let valoresExtraidos = resultado.match(/R\$(\d+\.\d+)/g);
            if (valoresExtraidos) {
                totalConcorrente += parseFloat(valoresExtraidos[0].replace('R$', ''));
                totalMP += parseFloat(valoresExtraidos[1].replace('R$', ''));
            }
        }
    });
    
    let totalEconomia = totalConcorrente - totalMP;
    document.getElementById('resultadoTotal').innerHTML = 
        `Total Anual Concorrente: R$${totalConcorrente.toFixed(2)}<br>
         Total Anual Mercado Pago: R$${totalMP.toFixed(2)}<br><br>
         Economia Anual Total: R$${totalEconomia.toFixed(2)}`;
}