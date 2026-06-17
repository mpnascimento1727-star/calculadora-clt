// Formata para moeda BRL

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Anima números

function animarNumero(elemento, valorFinal) {

    let inicio = 0;

    let duracao = 1000;

    let incremento = valorFinal / (duracao / 16);

    const timer = setInterval(() => {

        inicio += incremento;

        if (inicio >= valorFinal) {

            inicio = valorFinal;

            clearInterval(timer);

        }

        elemento.innerText = formatarMoeda(inicio);

    }, 16);
}

// Validação

function validarNumero(valor) {
    return !isNaN(valor) && valor > 0;
}