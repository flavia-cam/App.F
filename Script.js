let gastos = JSON.parse(localStorage.getItem("gastos")) || []
let receitas = JSON.parse(localStorage.getItem("receitas")) || []
let cartoes = JSON.parse(localStorage.getItem("cartoes")) || []

if(!localStorage.getItem("senha")){

localStorage.setItem("senha","1234")

}

function verificarSenha(){

let senha = document.getElementById("senha").value

if(senha === localStorage.getItem("senha")){

document.getElementById("login").style.display="none"
document.getElementById("app").style.display="block"

atualizarDashboard()
listarCartoes()
listarGastos()
criarGrafico()

}else{

alert("Senha errada")

}

}



function salvarGasto(){

let desc = document.getElementById("descGasto").value
let valor = document.getElementById("valorGasto").value
let categoria = document.getElementById("categoria").value
let cartao = document.getElementById("cartaoSelect").value

let data = new Date()

let gasto={

desc,
valor,
categoria,
cartao,
mes:data.getMonth()+1,
ano:data.getFullYear()

}

gastos.push(gasto)

localStorage.setItem("gastos",JSON.stringify(gastos))

listarGastos()
atualizarDashboard()
criarGrafico()

}



function salvarReceita(){

let desc = document.getElementById("descReceita").value
let valor = document.getElementById("valorReceita").value

let receita={

desc,
valor

}

receitas.push(receita)

localStorage.setItem("receitas",JSON.stringify(receitas))

atualizarDashboard()

}



function criarCartao(){

let nome = document.getElementById("nomeCartao").value
let limite = document.getElementById("limiteCartao").value

let cartao={

nome,
limite

}

cartoes.push(cartao)

localStorage.setItem("cartoes",JSON.stringify(cartoes))

listarCartoes()

}



function listarCartoes(){

let lista = document.getElementById("listaCartoes")
let select = document.getElementById("cartaoSelect")

lista.innerHTML=""
select.innerHTML=""

cartoes.forEach(c=>{

let li=document.createElement("li")
li.innerHTML=c.nome+" - limite "+c.limite

lista.appendChild(li)

let option=document.createElement("option")
option.value=c.nome
option.textContent=c.nome

select.appendChild(option)

})

}



function listarGastos(){

let lista=document.getElementById("listaGastos")

lista.innerHTML=""

gastos.forEach(g=>{

let li=document.createElement("li")

li.innerHTML=g.desc+" - R$"+g.valor+" ("+g.categoria+")"

lista.appendChild(li)

})

}



function atualizarDashboard(){

let totalReceita=0
let totalGasto=0

receitas.forEach(r=>{

totalReceita+=Number(r.valor)

})

gastos.forEach(g=>{

totalGasto+=Number(g.valor)

})

document.getElementById("totalReceitas").innerHTML=totalReceita
document.getElementById("totalGastos").innerHTML=totalGasto
document.getElementById("saldoTotal").innerHTML=totalReceita-totalGasto

}



function criarGrafico(){

let categorias={}

gastos.forEach(g=>{

if(!categorias[g.categoria]){

categorias[g.categoria]=0

}

categorias[g.categoria]+=Number(g.valor)

})

new Chart(

document.getElementById("grafico"),

{

type:"doughnut",

data:{

labels:Object.keys(categorias),

datasets:[{

data:Object.values(categorias)

}]

}

})

}