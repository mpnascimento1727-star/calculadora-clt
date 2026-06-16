function moeda(valor){

return valor.toLocaleString(
'pt-BR',
{
style:'currency',
currency:'BRL'
}
);

}

function calcular(){

let salario =
Number(
document.getElementById('salario').value
);

if(salario <= 0){

alert("Digite um salário válido");

return;

}

let inss = salario * 0.11;

let baseIR = salario - inss;

let irrf = 0;

if(baseIR > 3000){

irrf = baseIR * 0.075;

}

let fgts = salario * 0.08;

let liquido =
salario - inss - irrf;

document.getElementById("inss")
.innerHTML = moeda(inss);

document.getElementById("irrf")
.innerHTML = moeda(irrf);

document.getElementById("fgts")
.innerHTML = moeda(fgts);

document.getElementById("liquido")
.innerHTML = moeda(liquido);

}