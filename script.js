var bairros = ["Águas Claras","Bateias","Bom Jesus","Botiatuva","Campo do Meio","Centro","Cercadinho","Cristo Rei","Fazendinha","Ferrari","Ferraria","Itaqui","Itaqui de Cima","Jardim Alvorada","Jardim Bela Vista","Jardim Boa Vista","Jardim Busmayer","Jardim Carmela","Jardim Céu Azul","Jardim das Acácias","Jardim das Américas","Jardim das Palmas","Jardim das Palmeiras","Jardim Emília","Jardim Esmeralda","Jardim Florestal","Jardim Guarany","Jardim Iruama","Jardim Itália","Jardim Itaqui","Jardim Keli Cristina","Jardim Lise","Jardim Lorenzete","Jardim Melyane","Jardim Nossa Senhora do Perpétuo Socorro","Jardim Padre José de Anchieta","Jardim Paraíso Mineral","Jardim Rivabem","Jardim Rondinha","Jardim Santa Luzia","Jardim São Vicente","Jardim Social","Jardim Três Rios","Jardim Tropical","Lagoa","Moradias Bom Jesus","Rondinha","São Silvestre","Vila Bancária","Vila Mariano Torres","Vila Miotto","Vila Nossa Senhora do Carmo","Vila Nova","Vila Nova 2","Vila Operária","Vila Otto","Vila Pompéia","Vila Rivabem","Vila Rondinha","Vila Santa Rosa","Vila Santa Terezinha","Vila Santo Onofre","Vila São Luiz","Vila Torres","Vila Vista Alegre"];

var select = document.getElementById("bairro");
select.innerHTML = "<option value=''>Selecione o bairro</option>";
for (var i = 0; i < bairros.length; i++) {
  select.innerHTML += "<option>" + bairros[i] + "</option>";
}

function dinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function tamanho() {
  return document.querySelector("input[name=tamanho]:checked");
}

function extras() {
  return document.querySelectorAll("input[name=extra]:checked");
}

function taxaEntrega() {
  if (select.value == "") return 0;
  if (select.value == "Centro") return 5;
  return 10;
}

function atualizar() {
  var max = Number(tamanho().dataset.max);
  var subtotal = Number(tamanho().value);

  var lista = extras();
  for (var i = 0; i < lista.length; i++) {
    subtotal += Number(lista[i].value);
  }

  var taxa = taxaEntrega();
  document.getElementById("max").textContent = "máximo " + max;
  document.getElementById("subtotal").textContent = dinheiro(subtotal);
  document.getElementById("entrega").textContent = select.value ? dinheiro(taxa) : "informe o bairro";
  document.getElementById("total").textContent = dinheiro(subtotal + taxa);
  return subtotal + taxa;
}

document.addEventListener("change", function (e) {
  var max = Number(tamanho().dataset.max);
  var aviso = document.getElementById("aviso");
  aviso.textContent = "";

  var lista = extras();
  if (lista.length > max) {
    if (e.target.name == "extra") {
      e.target.checked = false;
    } else {
      for (var i = lista.length - 1; i >= max; i--) lista[i].checked = false;
    }
    aviso.textContent = "Esse copo aceita no máximo " + max + " adicionais.";
  }
  atualizar();
});

document.getElementById("confirmar").onclick = function () {
  var nome = document.getElementById("nome").value.trim();
  var telefone = document.getElementById("telefone").value;
  var digitos = telefone.replace(/\D/g, "");
  var erro = document.getElementById("erro");
  var resultado = document.getElementById("resultado");
  resultado.textContent = "";

  if (nome.length < 2) { erro.textContent = "Informe seu nome."; return; }
  if (digitos.length != 10 && digitos.length != 11) { erro.textContent = "Informe o telefone com DDD."; return; }
  if (select.value == "") { erro.textContent = "Informe o bairro."; return; }
  erro.textContent = "";

  var nomes = [];
  var lista = extras();
  for (var i = 0; i < lista.length; i++) nomes.push(lista[i].dataset.nome);

  resultado.textContent =
    "Pedido confirmado!\n" +
    nome + " - " + telefone + "\n" +
    "Copo de " + tamanho().dataset.ml + "ml" + (nomes.length ? " com " + nomes.join(", ") : " sem adicionais") + "\n" +
    "Entrega no bairro " + select.value + ": " + dinheiro(taxaEntrega()) + "\n" +
    "Total a pagar: " + dinheiro(atualizar());
};

atualizar();
