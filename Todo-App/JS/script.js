// obtendo todos os elementos necessários
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// evento onkeyup
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //obtendo o valor inserido pelo usuário
  if(userEnteredValue.trim() != 0){ //se o valor do usuário não for apenas espaços
    addBtn.classList.add("active"); //ativando o botão adicionar
  }else{
    addBtn.classList.remove("active"); //desativando o botão adicionar
  }
}

showTasks(); //chamando a função showTask

addBtn.onclick = ()=>{ //quando o usuário clica no botão do ícone de adição
  let userEnteredValue = inputBox.value; //obtendo o valor do campo de entrada
  let getLocalStorageData = localStorage.getItem("New Todo"); //obtendo armazenamento local
  if(getLocalStorageData == null){ //se localstorage não tiver dados
    listArray = []; //criar uma matriz em branco
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transformando a string json em um objeto js
  }
  listArray.push(userEnteredValue); //empurrando ou adicionando novo valor na matriz
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transformando o objeto js em uma string json
  showTasks(); //chamando a função showTask
  addBtn.classList.remove("active"); //desative o botão adicionar uma vez que a tarefa foi adicionada
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passando o comprimento da matriz em pendentetask
  if(listArray.length > 0){ //se o comprimento da matriz for maior que 0
    deleteAllBtn.classList.add("active"); //ative o botão excluir
  }else{
    deleteAllBtn.classList.remove("active"); //desative o botão excluir
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adicionando nova tag li dentro da tag ul
  inputBox.value = ""; //uma vez adicionada a tarefa deixe o campo de entrada em branco
}

// função excluir tarefa
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //excluir ou remover o li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //chamando a função showTasks
}

// função excluir todas as tarefas
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //obtendo armazenamento local
  if(getLocalStorageData == null){ //se localstorage não tiver dados
    listArray = []; //criar uma matriz em branco
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transformando a string json em um objeto js
    listArray = []; //criar uma matriz em branco
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //defina o item no localstorage
  showTasks(); //chamando a função showTasks
}
