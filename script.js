async function convert() {
    const inputValue = document.getElementById('inputValue').value;
    const currency = document.getElementById('currencySelect').value;
    let data;

    try {
        const response = await fetch('https://mindicador.cl/api/');
        data = await response.json();
    } catch (error) {
        console.log('No se pudo obtener los datos de la API, utilizando el archivo JSON local');
        const response = await fetch('miindicador.json');
        data = await response.json();
    }

    let rate = data[currency].valor; // Usamos el valor de la moneda seleccionada como tasa de conversión
    if (currency === 'bitcoin') {
        // Si la moneda seleccionada es Bitcoin, convertimos el valor de dólares a pesos
        rate *= data.dolar.valor;
    }
    const outputValue = inputValue * rate;
    document.getElementById('outputValue').innerHTML = `El valor convertido en pesos chilenos es: ${outputValue}`;
}
