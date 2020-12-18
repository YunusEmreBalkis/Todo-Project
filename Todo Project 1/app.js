//Element seçme
const form = document.querySelector("#todo-form");
const todoınput = document.querySelector("#görev-input");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const todoList = document.querySelector(".list-group")
const secondcardbody = document.querySelector("#veber");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos"); 




eventlListeners();

function eventlListeners(){

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondcardbody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")){
        //Arayüzden todoları silme
        //todoList.innerHTML= ""; Yavaş yöntem ancak proje çok büyük değilse de kullanılabilr 

        while (todoList.firstElementChild != null ){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }



}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){

        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadı

            listItem.setAttribute("style","display : none !important")
        }
        else {
            listItem.setAttribute("style","display : block ")
        }

    })

}
function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","todo başarıyla silindi");
    }

}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Arrrayden değer silme o indexten itaberen 1 değer silinir

        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoToUI(todo); 
    })
}
function addTodo(e){
    const newTodo = todoınput.value.trim();  // trim fonskiyonu baştaki ve sondaki boşlukları siler

    

    if (newTodo === ""){
      showAlert("danger","Lütfen bir todo girin");    
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo); 
        showAlert("success","Todo başarıyla eklendi");
    }


    e.preventDefault();
}
function getTodosFromStorage(){ // Storagedan Bütün Todoları Alma
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstcardBody.appendChild(alert);
    
    //setTimeout metodu 
    setTimeout(function(){
        alert.remove();   
    },1000);// bu metod sayesinde fonksiyon içindeki işi girilen milisaniye sonra yapar

}



function addTodoToUI(newTodo){//Alınan string değerini list item olarak UI'ya (yani arayüze) ekliyecek
//List İtem Oluşturma
const listItem = document.createElement("li");
//Link Oluşturma
const link = document.createElement("a");
link.href = ("#");
link.className = "delete-item float-right";
link.innerHTML = "<i class = 'fa fa-remove'></i>";
const link1 = document.createElement("a");

    link1.href = "#";
    link1.className = "update-item float-right";
    link1.style = "margin-left: 15px;"
    link1.innerHTML = "<i class='fa fa-cog'></i>"



listItem.className ="list-group-item";



//Text Node Ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link1);
listItem.appendChild(link);
//Todo Liste List itemi ekleme
todoList.appendChild(listItem);
todoınput.value="";//todoyu girdikten sonra ınputun boşalması için
}

// function deleteTodo(e){

//     if(e.target.className === "fa fa-remove" ){
//         e.target.parentElement.parentElement.remove();
//         deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
//         showalert("warning","Görev başarıyla silindi.")
//     }
// }

// function deleteTodoFromStorage(deletetodo){
//     let todos = getTodosFromStorage();

//     todos.forEach(function(todo,index){
//      if (todo === deletetodo){    
//         todos.splice(index,1);
//      }
    
//  });

//     localStorage.setItem("todos",JSON.stringify(todos));
// }

// function loadAllTodosToUI(){
//     let todos = getTodosFromStorage();

//     todos.forEach(function(todo){
//         addTodoToUI(todo);
//     })
// }
// function addTodo(e){
//     const newTodo =  todoınput.value.trim();


//     if (newTodo === ""){
//         showAlert("danger","Lütfen bir görev girin");
//     }
//     else {
//         addTodoToUI(newTodo);
//         addTodoToStorage(newTodo);
//         showAlert("success","Görev başarıyla eklendi");
//     }

//     e.preventDefault();
// }

// function getTodosFromStorage(){
//     let todos ;
//     if(localStorage.getItem("todos") === null){

//         todos = [];
//     }
//     else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }
//     return todos;
// }

// function addTodoToStorage(newTodo){
//     let todos = getTodosFromStorage();
//     todos.push(newTodo);

//     localStorage.setItem("todos",JSON.stringify(todos));
// }


// function showAlert(type,message){
//     const alert = document.createElement("div");
//     alert.className = `alert alert-${type}`;
//     alert.textContent = message;
//     firstcardBody.appendChild(alert);

//     setTimeout(function(){
//         alert.remove();
//     },1000);

// }

// function addTodoToUI(newTodo){
//     const listitem = document.createElement("li");
//     const link = document.createElement("a");
//     const link1 = document.createElement("a");

//     link1.href = "#";
//     link1.className = "update-item float-right";
//     link1.style = "margin-left: 15px;"
//     link1.innerHTML = "<i class='fa fa-cog'></i>"

//     link.href = "#";
//     link.className ="delete-item float-right";
//     link.innerHTML = " <i class = 'fa fa-remove'></i>"

//     listitem.className ="list-group-item";

//     listitem.appendChild(document.createTextNode(newTodo));
//     listitem.appendChild(link1);
//     listitem.appendChild(link);
   

   

//     todoList.appendChild(listitem);
//     todoınput.value = "";

// }
