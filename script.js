//---------------------- VALORES ----------------------------
var input = document.getElementById('myInput'); //Input
var table = document.getElementById('myTable'); //Tabela
var category = document.querySelectorAll('.category > th'); //Cabeçalho
var listTR = document.querySelectorAll('tr:not(.category)');

var comparacao = []; //Datas
var TR_pen = []; //Tarefas Pendentes
var options = { //Formato 'Date'
  dateStyle: 'short',
  timeStyle: 'medium'
};


// ---------------------- DADOS GUARDADOS -------------------------------
for (var i = 0; i < localStorage.length; i++) {
  var keys_array = [];
  var keys = Object.keys(localStorage);

  //Lê os dados do 'locaStorage' 
  var Tarefas = localStorage.getItem(keys[i]);
  //Transforma em objeto
  var item = JSON.parse(Tarefas);
  
  //Criações
  var AddTR = document.createElement('tr');
  var AddTD_id = document.createElement('td');
  var AddTD_item = document.createElement('td');
  var AddTD_data = document.createElement('td');
  var close = document.createElement('td');
  var text = document.createTextNode('\u2716');

  if (item.status == true) {
    //ID
    AddTD_id.append(item.id);
    AddTD_id.classList.add('id');
    //TAREFA
    AddTD_item.append(item.tarefa);
    AddTD_item.classList.add('item');
    //DATA
    AddTD_data.append(item.data);
    AddTD_data.classList.add('data');
    //CLOSE
    close.append(text);
    close.classList.add('close');

    AddTR.append(AddTD_id, AddTD_item, AddTD_data, close);
    table.append(AddTR);

    //Envia o 'Timestamp' e a tarefa para a 'array'
    comparacao.push(item.data);
    TR_pen.push(AddTR);
  } else {
    console.log('Error')
  }

}
pendencia()

//---------------------------- CRIAR TAREFA ---------------------------------
function newElement() {
    
  var keys_array = [];
  var keys = Object.keys(localStorage);
  for (var id = 0; id < keys.length; id++) {
    keys_array.push(Number(keys[id]));
  }

  //Valores da Tarefa
  if (keys_array.length != 0) {
    var chave = Math.max(...keys_array) + 1;
  } else {
    keys_array.push(0);
    var chave = Math.max(...keys_array);
  }
  
  
  var inputText = input.value;
  var agora = new Date();
  var item_hora = agora.toLocaleString('pt-br', options);

  console.log(keys_array)

  //Modelo guardado
  var tarefa = {
    id: chave,
    tarefa: inputText,
    data: item_hora,
    status: true
  }

  if (input.value != "") {

    //Guarda as tarefas no 'localStorage'
    localStorage.setItem(chave, JSON.stringify(tarefa));
    //Lê os dados do 'locaStorage' 
    var Tarefas = localStorage.getItem(chave);
    //Transforma em objeto
    var item = JSON.parse(Tarefas);

    //Criações
    var inputText = document.createTextNode(input.value);
    var AddTR = document.createElement('tr');
    var AddTD_id = document.createElement('td');
    var AddTD_item = document.createElement('td');
    var AddTD_data = document.createElement('td');//Cria elemento e texto 'close'
    var close = document.createElement('td');
    var text = document.createTextNode('\u2716');

    //ID
    AddTD_id.append(item.id);
    AddTD_id.classList.add('id');
    //TAREFA
    AddTD_item.append(item.tarefa);
    AddTD_item.classList.add('item');
    //DATA
    AddTD_data.append(item.data);
    AddTD_data.classList.add('data');
    //CLOSE
    close.appendChild(text);
    close.classList.add('close');

    AddTR.append(AddTD_id, AddTD_item, AddTD_data, close);
    table.append(AddTR);

    //Envia o 'Timestamp' e a tarefa para a 'array'
    comparacao.push(item.data);
    TR_pen.push(AddTR);

    //Muda a cor e o texto do 'Header'
    document.querySelector('#myDIV').style.backgroundColor = 'var(--azul_1)';
    document.querySelector('.addBtn').style.backgroundColor = 'var(--azul_3)';
    input.placeholder = "Tarefa...";
    input.value = "";

  } else {
    //Muda a cor e o texto do 'Header', caso vazio
    document.querySelector('#myDIV').style.backgroundColor = 'var(--Hvazio)';
    document.querySelector('.addBtn').style.backgroundColor = 'var(--Bvazio)';
    input.placeholder = "Digite a Tarefa !!!";
  }

  pendencia()
}

//------------------ EXCLUIR TAREFA -------------------------
document.addEventListener('click', function (e) {
  //Armazena o item clicado
  var td = e.target;
  var tr = td.parentNode;

  //Se clicado em uma Tarefa
  if (tr.tagName == 'TR' && tr.classList != 'category') {
    //Adiciona/Remove o 'checked'
    if (tr.classList.contains('checked')) {
      tr.classList.remove('checked');
    } else {
      tr.classList.add('checked')
    }
    //Se clicado no 'close', remove tarefa
    if (td.classList == 'close') {
      //Pega o 'id'
      var ID_TR = tr.firstChild;
      ID_TR = ID_TR.innerHTML;

      //Transforma 'array' em objeto
      var item = localStorage.getItem(ID_TR);
      item = JSON.parse(item);

      if (item != null) {
        item.status = false;
        localStorage.setItem(ID_TR, JSON.stringify(item));
      }

      tr.remove();
    }
  }

});


//----------------- VERIFICAR PENDENCIA ---------------
function pendencia() {
  var hora = new Date();

  for (var i = 0; i < comparacao.length; i++) {
    //Divide a hora e a data de acesso:
    var acesso_data = comparacao[i].substr(0, 10);
    var acesso_hora = comparacao[i].substr(11);
    //Formata a data:
    const [day, month, year] = acesso_data.split('/');
    acesso_data = [year, month, day].join('/');
    var timeAcesso = `${acesso_data} ${acesso_hora}`
    
    //Calcula as diferença das datas
    timeAcesso = new Date(timeAcesso);
    const timeAtual = hora;
    var diferencaTime = timeAtual - timeAcesso;

    var milissegundosHora = 1000 * 60 * 60;
    var milissegundosDia = milissegundosHora * 24;

    //Adiciona/Remove classe de urgencia
    if (diferencaTime > milissegundosDia) {
      TR_pen[i].classList.add("urgente");
    } 
    /*else if (diferencaTime > milissegundosHora) {
      TR_pen[i].classList.add("pendente");
    }*/
  }
}

pendencia()


//----------------------- ORDENAR -------------------------------
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Define a direção de classificação para crescente:
  dir = "asc";
  /*Faça um loop que continuará até que nenhuma troca seja feita:*/
  while (switching) {
    // comece dizendo: nenhuma troca é feita:
    switching = false;
    rows = table.rows;
    /*Percorre todas as linhas da tabela (exceto a primeira, que contém os cabeçalhos da tabela):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //comece dizendo que não deve haver troca:
      shouldSwitch = false;
      /*Obtenha os dois elementos que deseja comparar, um da linha atual e outro da próxima:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*verifique se as duas linhas devem trocar de lugar, com base na direção, asc ou desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //em caso afirmativo, marque como um interruptor e interrompa o loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //em caso afirmativo, marque como um interruptor e interrompa o loop:
          shouldSwitch = true;
          break;
        }
      } else if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*Se uma troca foi marcada, faça a troca e marque que uma troca foi feita:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Cada vez que uma troca é feita, aumente essa contagem em 1:
      switchcount++;
    } else {
      /*Se nenhuma mudança foi feita E a direção é "asc", defina a direção como "desc" e execute o loop while novamente.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


//--------------------------------------------------

if (localStorage.length >= 100) {
  alert(`Limite de Armazenamento atingido.\nArmazenamento: ${localStorage.length}`)
}

console.log(localStorage.length)
//https://warcontent.com/localstorage-javascript/