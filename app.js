document.addEventListener("DOMContentLoaded", () => {

    const botaoCalcular =
        document.getElementById("calcular");

    botaoCalcular.addEventListener(
        "click",
        calcular
    );

    document
        .getElementById("salario")
        .addEventListener(
            "keyup",
            e => {

                if (e.key === "Enter") {

                    calcular();

                }

            }
        );

});

// ======================

function calcular() {

    let salario =
        parseFloat(
            document.getElementById("salario").value
        ) || 0;

    let dependentes =
        parseInt(
            document.getElementById("dependentes").value
        ) || 0;

    let descontos =
        parseFloat(
            document.getElementById("descontos").value
        ) || 0;

    if (!validarNumero(salario)) {

        alert("Digite um salário válido");

        return;

    }

    let inss = salario * 0.11;

    if (inss > 908) {

        inss = 908;

    }

    let baseIR =
        salario -
        inss -
        (dependentes * 189.59);

    let irrf = 0;

    if (baseIR > 2259.20)
        irrf = baseIR * 0.075;

    let liquido =
        salario -
        inss -
        irrf -
        descontos;

    animarNumero(
        document.getElementById("liquido"),
        liquido
    );

    document.getElementById(
        "valorBruto"
    ).innerText =
        formatarMoeda(salario);

    document.getElementById(
        "valorINSS"
    ).innerText =
        formatarMoeda(inss);

    document.getElementById(
        "valorIRRF"
    ).innerText =
        formatarMoeda(irrf);

    document.getElementById(
        "valorDescontos"
    ).innerText =
        formatarMoeda(descontos);

    document.getElementById(
        "valorFinal"
    ).innerText =
        formatarMoeda(liquido);

}

// ======================
// Compartilhar

async function compartilhar() {

    if (navigator.share) {

        await navigator.share({

            title: "Calculadora CLT",

            text: "Veja meu cálculo salarial",

            url: window.location.href

        });

    }

}

// ======================
// Imprimir

function imprimirResultado() {

    window.print();

}