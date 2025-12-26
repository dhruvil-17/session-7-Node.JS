let todos = [];

// Load todos when page loads
window.onload = function() {
    loadTodos();
};

// Load todos from server
function loadTodos() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(data => {
            todos = data;
            displayTodos();
        })
        .catch(error => {
            console.error('Error loading todos:', error);
        });
}

// Display todos on the page
function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Add new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a todo!');
        return;
    }
    
    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(newTodo => {
        todos.push(newTodo);
        displayTodos();
        input.value = '';
    })
    .catch(error => {
        console.error('Error adding todo:', error);
        alert('Error adding todo!');
    });
}

// Toggle todo completion
function toggleTodo(id) {
    fetch(`/api/todos/${id}`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(updatedTodo => {
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            displayTodos();
        }
    })
    .catch(error => {
        console.error('Error updating todo:', error);
        alert('Error updating todo!');
    });
}

// Delete todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            todos = todos.filter(t => t.id !== id);
            displayTodos();
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
            alert('Error deleting todo!');
        });
    }
}

// Allow adding todo with Enter key
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});