/*====================================================
 CALCULADORA CLT 2026
 calculos.js
=====================================================*/

class CalculadoraCLT {

    constructor() {

        this.salario = 0;

        this.dependentes = 0;

        this.outros = 0;

    }

    calcular(salario, dependentes = 0, outros = 0) {

        this.salario = Number(salario);

        this.dependentes = Number(dependentes);

        this.outros = Number(outros);

        const inss = this.calcularINSS();

        const irrf = this.calcularIRRF(inss);

        const fgts = this.calcularFGTS();

        const liquido =

            this.salario -

            inss -

            irrf -

            this.outros;

        return {

            bruto: this.salario,

            inss,

            irrf,

            fgts,

            outros: this.outros,

            liquido,

            descontos:

                inss +

                irrf +

                this.outros

        };

    }

    calcularFGTS() {

        return this.salario * 0.08;

    }

    calcularINSS() {

        const salario = this.salario;

        let desconto = 0;

        if (salario <= 1518.00) {

            desconto = salario * 0.075;

        }

        else if (salario <= 2793.88) {

            desconto =

                1518 * 0.075 +

                (salario - 1518) * 0.09;

        }

        else if (salario <= 4190.83) {

            desconto =

                1518 * 0.075 +

                (2793.88 - 1518) * 0.09 +

                (salario - 2793.88) * 0.12;

        }

        else {

            desconto =

                1518 * 0.075 +

                (2793.88 - 1518) * 0.09 +

                (4190.83 - 2793.88) * 0.12 +

                (salario - 4190.83) * 0.14;

        }

        return Number(desconto.toFixed(2));

    }

    calcularIRRF(inss) {

        const base =

            this.salario -

            inss -

            (this.dependentes * 189.59);

        if (base <= 2428.80)

            return 0;

        if (base <= 2826.65)

            return base * 0.075 - 182.16;

        if (base <= 3751.05)

            return base * 0.15 - 394.16;

        if (base <= 4664.68)

            return base * 0.225 - 675.49;

        return base * 0.275 - 908.73;

    }

}

const calculadora = new CalculadoraCLT();
/*=====================================================
  APP.JS
  Controla toda a aplicação
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCalculo");

    if (!form) return;

    form.addEventListener("submit", calcularSalario);

});

/*=====================================================
CALCULAR
======================================================*/

function calcularSalario(event){

    event.preventDefault();

    const salario =
        Number(document.getElementById("salario").value);

    const dependentes =
        Number(document.getElementById("dependentes").value);

    const outros =
        Number(document.getElementById("outros").value);

    if(salario <= 0){

        alert("Informe um salário válido.");

        return;

    }

    const dados = calculadora.calcular(

        salario,

        dependentes,

        outros

    );

    atualizarResultado(dados);

}

/*=====================================================
ATUALIZAR RESULTADO
======================================================*/

function atualizarResultado(dados){

    $("#salarioLiquido", moeda(dados.liquido));

    $("#salarioBrutoResultado", moeda(dados.bruto));

    $("#totalDescontos", moeda(dados.descontos));

    $("#valorInss", moeda(dados.inss));

    $("#valorIrrf", moeda(dados.irrf));

    $("#valorOutros", moeda(dados.outros));

    $("#valorTotal", moeda(dados.descontos));

    $("#economiaMensal", moeda(dados.liquido));

    $("#salarioAnual", moeda(dados.liquido * 12));

    $("#mediaDiaria", moeda(dados.liquido / 30));

    $("#sideInss", moeda(dados.inss));

    $("#sideIrrf", moeda(dados.irrf));

    $("#sideTotal", moeda(dados.descontos));

    $("#sideLiquido", moeda(dados.liquido));

    atualizarBarra(dados);

    atualizarGrafico(dados);

    salvarHistorico(dados);

}

/*=====================================================
BARRA
======================================================*/

function atualizarBarra(dados){

    const percentual =

        (dados.liquido / dados.bruto) * 100;

    const barra =

        document.getElementById("barraSalario");

    barra.style.width = percentual + "%";

    $("#percentualRecebido",

        percentual.toFixed(1) + "%"

    );

}

/*=====================================================
ATALHO
======================================================*/

function $(id, valor){

    const elemento =

        document.getElementById(id);

    if(elemento)

        elemento.innerHTML = valor;

}

/*=====================================================
MOEDA
======================================================*/

function moeda(valor){

    return valor.toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}/*=====================================================
 DARK MODE
======================================================*/

const btnTheme =

document.querySelector(".btn-theme");

if(btnTheme){

    btnTheme.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark")

            ? "dark"

            : "light"

        );

    });

}

window.addEventListener("load",()=>{

    const tema=

    localStorage.getItem("theme");

    if(tema==="dark"){

        document.body.classList.add("dark");

    }

});