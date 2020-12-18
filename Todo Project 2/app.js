const todoInput = document.querySelector("#görev-input");
const form =  document.querySelector("#todo-form");
const firstcard =  document.querySelectorAll(".card-body")[0];
const secondcard =  document.querySelectorAll(".card-body")[1];
const thirdcard =  document.querySelectorAll(".card-body")[2];
const fourthcard =  document.querySelectorAll(".card-body")[3];
const todoList =  document.querySelectorAll(".list-group")[0];
const todoList1 =  document.querySelectorAll(".list-group")[1];
const todoList2 =  document.querySelectorAll(".list-group")[2];
const filter =  document.querySelectorAll("#filter")[0];
const deleteButton =  document.querySelector("#delete-button");
const cards = [firstcard,secondcard,thirdcard,fourthcard];
eventListeners();


function eventListeners(){

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUı);
   cards.forEach(e => {
       e.addEventListener("click",doneTodos);
       e.addEventListener("click",deleteTodo);
   });
    deleteButton.addEventListener("click",clearAllTodos);
    filter.addEventListener("keyup",filterTodos);
    thirdcard.addEventListener("click",updateTodos);
}

function addTodo(e){

    const ntodo = todoInput.value.trim();
    let todos = getTodosFromStorage();

    if(ntodo === ""){
        showAlert("danger","Lütfen bir todo giriniz");
    }
    else if (todos.indexOf(ntodo) != -1) {
        showAlert("danger", "Var olan todo'yu tekrar ekleyemezsiniz !");
      }
    else{
        addTodoToUı(ntodo);
        addTodoToStorage(ntodo);
       showAlert("success","Todo eklendi");
    } 

    e.preventDefault();
}
function addTodoToUı(ntodo){

    const listıtem = document.createElement("li");
    const link =  document.createElement("a");
    const link1 =  document.createElement("a");

    

    link.href = "#";
    link.className = "update-item float-right";
    link.style ="margin-left: 15px;";
    link.innerHTML = "<i class='fas fa-trash-alt'></i>";

    link1.href = "#";
    link1.className = "delete-item float-right";
    link1.innerHTML = " <i class='fas fa-check'></i>";

    listıtem.className = "list-group-item";

    listıtem.appendChild(document.createTextNode(ntodo));
    listıtem.appendChild(link);
    listıtem.appendChild(link1);

    const ab = listıtem.cloneNode(true);
    const a = listıtem.cloneNode(true);

    todoList.appendChild(ab);
    todoList2.appendChild(a);
    todoList1.appendChild(listıtem)
    link1.innerHTML = " <i class='fa fa-cog'></i>";

    todoInput.value = "";
}

function showAlert(type,message){
    const alert =  document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstcard.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(ntodo){
    let todos = getTodosFromStorage();
    todos.push(ntodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUı(){
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUı(todo);
    });
}
function deleteTodo(e){
    if(e.target.className === "fas fa-trash-alt"){
        e.target.parentElement.parentElement.remove();
        const deletetodo = e.target.parentElement.parentElement.textContent.trim();
        deleteTodoFromStorage(deletetodo);
        showAlert("warning","Todo başarıyla silindi");
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function clearAllTodos(){
    if (confirm("Tümünü silmek istermisiniz ?")){
        
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        while(todoList1.firstElementChild != null){
            todoList1.removeChild(todoList1.firstElementChild);
        }
        while(todoList2.firstElementChild != null){
            todoList2.removeChild(todoList2.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){

    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(item){
    
        const text = item.textContent.toLowerCase();

        if(text.indexOf(filtervalue) === -1){
            item.setAttribute("style","display : none !important");
        }
        else{
            item.setAttribute("style","display : block")
        }
    })
}

function doneTodos(e){

    if(e.target.className === "fas fa-check"){
        e.target.parentElement.parentElement.setAttribute("style","text-decoration: line-through;");
    }
    
}

function updateTodos(e){
    if(e.target.className === "fa fa-cog"){
        const todo = e.target.parentElement.parentElement.textContent.trim();
        const updatedtodo = prompt("What's your sign?");
        
        if(updatedtodo === null){
            showAlert("danger","Lütfen bir veri girin");
        }else{
            editTodoFromStorage(todo,updatedtodo);
            e.target.parentElement.parentElement.innerHTML = `${updatedtodo} <a href = "#" class="update-item float-right" style="margin-left: 15px;">
            <i class="fas fa-trash-alt"></i>
          </a>
          <a href = "#" class ="delete-item float-right">
            <i class="fa fa-cog"></i>
          </a>`;
            showAlert("Todo başarıyla düzenlendi");
        }
    }
}
function editTodoFromStorage(oldtodo,newtodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(a,index){
         if(a === oldtodo){
            todos[index] = newtodo;
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
