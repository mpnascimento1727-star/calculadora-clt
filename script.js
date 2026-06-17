
document.getElementById("calcular").addEventListener("click", calcular);

function calcular(){

// ENTRADAS
let salario = parseFloat(document.getElementById("salario").value) || 0;
let dependentes = parseInt(document.getElementById("dependentes").value) || 0;
let outros = parseFloat(document.getElementById("descontos").value) || 0;

if(salario <= 0){
alert("Digite um salário válido");
return;
}

// ======================
// INSS (simplificado)
let inss = salario * 0.11;

// teto básico simulado
if(inss > 908){
inss = 908;
}

// ======================
// BASE IRRF
let baseIR = salario - inss - (dependentes * 189.59);

// IRRF (simplificado)
let irrf = 0;

if(baseIR <= 2259.20){
irrf = 0;
}
else if(baseIR <= 2826.65){
irrf = baseIR * 0.075;
}
else if(baseIR <= 3751.05){
irrf = baseIR * 0.15;
}
else if(baseIR <= 4664.68){
irrf = baseIR * 0.225;
}
else{
irrf = baseIR * 0.275;
}

// ======================
// SALÁRIO LÍQUIDO
let liquido = salario - inss - irrf - outros;

// ======================
// FORMATAÇÃO BR
function format(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
});
}

// ======================
// EXIBIR NA TELA

document.getElementById("valorBruto").innerText = format(salario);
document.getElementById("valorINSS").innerText = format(inss);
document.getElementById("valorIRRF").innerText = format(irrf);
document.getElementById("valorDescontos").innerText = format(outros);
document.getElementById("liquido").innerText = format(liquido);
document.getElementById("valorFinal").innerText = format(liquido);

}