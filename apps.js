
var firebaseConfig = {
    apiKey: "AIzaSyCQTx03Jo7RXfxkvraUe5sjX4OkVTOXjyM",
    authDomain: "todolist-6efc4.firebaseapp.com",
    projectId: "todolist-6efc4",
    storageBucket: "todolist-6efc4.appspot.com",
    messagingSenderId: "689386200956",
    appId: "1:689386200956:web:aa0e92ad93421de7780ef9",
    databaseURL:"https://console.firebase.google.com/u/0/project/todolist-6efc4/settings/general/web:NjU0NTJlOGUtNmExNC00MjIzLTlhZDctZTM2ZmU2ZmYyNDNh"
};
firebase.initializeApp(firebaseConfig);


var database = firebase.database().ref("todos");


var todoInput = document.getElementById("todo-input");
var addTodoBtn = document.getElementById("add-todo-btn");
var todoList = document.getElementById("todo-list");


addTodoBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var todoText = todoInput.value;
    if (todoText.trim() !== "") {
        var todo = {
            text: todoText,
            completed: false
        };
        database.push(todo);
        todoInput.value = "";
    }
});


database.on("value", function(snapshot) {

    todoList.innerHTML = "";

    snapshot.forEach(function(childSnapshot) {
        var todo = childSnapshot.val();
        var todoKey = childSnapshot.key;

        var li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add("completed");
        }

        var toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.completed ? "Mark as incomplete" : "Mark as complete";
        toggleBtn.addEventListener("click", function() {
            var updatedTodo = {
                text: todo.text,
                completed: !todo.completed
            };
            database.child(todoKey).set(updatedTodo);
        });

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            database.child(todoKey).remove();
        });

        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
});