let chart;

async function convert() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currencies').value;
    const resultElement = document.getElementById('result');
    const apiUrl = `https://mindicador.cl/api/${currency}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.serie[0].valor;
    const result = amount * rate;

    resultElement.innerText = `Resultado: ${result.toFixed(2)} pesos`;

    const reversedSerie = data.serie.reverse();
    const labels = reversedSerie.map(item => new Date(item.fecha).toLocaleDateString());
    const values = reversedSerie.map(item => item.valor);

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Valor del ${currency} en los últimos 30 días`,
                data: values,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
}
