let chart;

// FORMATA VALOR EM REAL
function formatar(valor){
return valor.toLocaleString('pt-BR',{
style:'currency',
currency:'BRL'
});
}

// MOSTRAR ABAS
function mostrar(id){

document.querySelectorAll('.tab').forEach(tab=>{
tab.classList.remove('ativo');
});

document.getElementById(id).classList.add('ativo');
}

// INSS (aproximação realista)
function calcINSS(salario){

if(salario <= 1412) return salario * 0.075;
if(salario <= 2666.68) return salario * 0.09;
if(salario <= 4000.03) return salario * 0.12;
return salario * 0.14;

}

// IRRF (aproximação)
function calcIRRF(base){

if(base <= 2259.20) return 0;
if(base <= 2826.65) return base * 0.075;
if(base <= 3751.05) return base * 0.15;
if(base <= 4664.68) return base * 0.225;
return base * 0.275;

}

// GRÁFICO
function atualizarGrafico(inss, irrf, fgts){

const ctx = document.getElementById('grafico');

if(chart){
chart.destroy();
}

chart = new Chart(ctx, {
type: 'doughnut',
data: {
labels: ['INSS', 'IRRF', 'FGTS'],
datasets: [{
data: [inss, irrf, fgts],
backgroundColor: [
'#ef4444',
'#f59e0b',
'#22c55e'
],
borderWidth: 0
}]
},
options: {
plugins: {
legend: {
labels: {
color: 'white'
}
}
}
}
});

}

// FUNÇÃO PRINCIPAL
function calcular(){

let salario = Number(document.getElementById("inputSalario").value);

if(!salario || salario <= 0){
alert("Digite um salário válido");
return;
}

// DESCONTOS
let inss = calcINSS(salario);
let baseIR = salario - inss;
let irrf = calcIRRF(baseIR);
let fgts = salario * 0.08;
let liquido = salario - inss - irrf;

// BENEFÍCIOS
let ferias = salario + (salario / 3);
let decimo = salario / 12;

// RESCISÃO
let multa = fgts * 0.4;

// EXIBIR RESULTADOS
document.getElementById("inss").innerText = formatar(inss);
document.getElementById("irrf").innerText = formatar(irrf);
document.getElementById("fgts").innerText = formatar(fgts);
document.getElementById("liquido").innerText = formatar(liquido);

document.getElementById("ferias").innerText = formatar(ferias);
document.getElementById("decimo").innerText = formatar(decimo);
document.getElementById("multa").innerText = formatar(multa);

// ATUALIZAR GRÁFICO
atualizarGrafico(inss, irrf, fgts);

}