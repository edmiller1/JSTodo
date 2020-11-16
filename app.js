//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);



//Functions
function addTodo(event) {
    if(todoInput.value === '') {
        alert('The fuck you doin son?!?');
    }
    else {
        //Stop button from submitting
        event.preventDefault();
        //Create a Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create an Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);
        //Checked Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Delete Button
        const deletedButton = document.createElement('button');
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
        deletedButton.classList.add('delete-btn');
        todoDiv.appendChild(deletedButton);
        //Attach todoDiv to todoList
        todoList.appendChild(todoDiv);
        //Clear TodoInput value
        todoInput.value = '';
    }
}

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo 
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentNode;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    //Complete Todo
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentNode;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    //CHECK
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create an Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Delete Button
        const deletedButton = document.createElement('button');
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
        deletedButton.classList.add('delete-btn');
        todoDiv.appendChild(deletedButton);
        //Attach todoDiv to todoList
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}