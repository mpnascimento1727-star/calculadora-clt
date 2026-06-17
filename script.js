/*====================================================
 CALCULADORA CLT 2026 - VERSION FIXED
 calculos.js + app.js + utils + theme (organizado)
=====================================================*/

/*====================================================
 CLASSE DE CÁLCULO
=====================================================*/

class CalculadoraCLT {

    constructor() {
        this.salario = 0;
        this.dependentes = 0;
        this.outros = 0;
    }

    calcular(salario, dependentes = 0, outros = 0) {

        this.salario = Number(salario) || 0;
        this.dependentes = Number(dependentes) || 0;
        this.outros = Number(outros) || 0;

        const inss = this.calcularINSS();
        const irrf = this.calcularIRRF(inss);
        const fgts = this.calcularFGTS();

        const descontos = inss + irrf + this.outros;

        const liquido = Math.max(
            this.salario - descontos,
            0
        );

        return {
            bruto: this.salario,
            inss,
            irrf,
            fgts,
            outros: this.outros,
            descontos,
            liquido
        };
    }

    calcularFGTS() {
        return this.salario * 0.08;
    }

    calcularINSS() {

        const s = this.salario;
        let d = 0;

        if (s <= 1518) {
            d = s * 0.075;

        } else if (s <= 2793.88) {
            d = (1518 * 0.075) +
                ((s - 1518) * 0.09);

        } else if (s <= 4190.83) {
            d = (1518 * 0.075) +
                ((2793.88 - 1518) * 0.09) +
                ((s - 2793.88) * 0.12);

        } else {
            d = (1518 * 0.075) +
                ((2793.88 - 1518) * 0.09) +
                ((4190.83 - 2793.88) * 0.12) +
                ((s - 4190.83) * 0.14);
        }

        return Number(d.toFixed(2));
    }

    calcularIRRF(inss) {

        const base =
            this.salario -
            inss -
            (this.dependentes * 189.59);

        if (base <= 2428.80) return 0;

        if (base <= 2826.65)
            return (base * 0.075) - 182.16;

        if (base <= 3751.05)
            return (base * 0.15) - 394.16;

        if (base <= 4664.68)
            return (base * 0.225) - 675.49;

        return (base * 0.275) - 908.73;
    }
}

const calculadora = new CalculadoraCLT();

/*====================================================
 APP (EVENTOS)
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCalculo");

    if (!form) return;

    form.addEventListener("submit", calcularSalario);
});

/*====================================================
 FUNÇÃO PRINCIPAL
=====================================================*/

function calcularSalario(event) {

    event.preventDefault();

    const salario = getNumber("salario");
    const dependentes = getNumber("dependentes");
    const outros = getNumber("outros");

    if (salario <= 0) {
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

/*====================================================
 ATUALIZA UI
=====================================================*/

function atualizarResultado(dados) {

    setText("salarioLiquido", moeda(dados.liquido));
    setText("salarioBrutoResultado", moeda(dados.bruto));
    setText("totalDescontos", moeda(dados.descontos));

    setText("valorInss", moeda(dados.inss));
    setText("valorIrrf", moeda(dados.irrf));
    setText("valorOutros", moeda(dados.outros));
    setText("valorTotal", moeda(dados.descontos));

    setText("economiaMensal", moeda(dados.liquido));
    setText("salarioAnual", moeda(dados.liquido * 12));
    setText("mediaDiaria", moeda(dados.liquido / 30));

    setText("sideInss", moeda(dados.inss));
    setText("sideIrrf", moeda(dados.irrf));
    setText("sideTotal", moeda(dados.descontos));
    setText("sideLiquido", moeda(dados.liquido));

    atualizarBarra(dados);

    if (typeof atualizarGrafico === "function") {
        atualizarGrafico(dados);
    }

    if (typeof salvarHistorico === "function") {
        salvarHistorico(dados);
    }
}

/*====================================================
 BARRA DE PROGRESSO (SEGURA)
=====================================================*/

function atualizarBarra(dados) {

    const barra = document.getElementById("barraSalario");

    if (!barra) return;

    const percentual = dados.bruto > 0
        ? (dados.liquido / dados.bruto) * 100
        : 0;

    barra.style.width = percentual.toFixed(1) + "%";

    setText("percentualRecebido", percentual.toFixed(1) + "%");
}

/*====================================================
 HELPERS
=====================================================*/

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function getNumber(id) {
    const el = document.getElementById(id);
    return el ? Number(el.value) || 0 : 0;
}

/*====================================================
 MOEDA (SEGURA)
=====================================================*/

function moeda(valor) {

    const v = Number(valor) || 0;

    return v.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/*====================================================
 DARK MODE
=====================================================*/

(function initTheme() {

    const btn = document.querySelector(".btn-theme");

    if (btn) {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );
        });
    }

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        document.body.classList.add("dark");
    }

})();