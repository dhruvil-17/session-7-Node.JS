class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        
        this.init();
    }
    
    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        this.loadTodos();
    }
    
    async loadTodos() {
        try {
            this.showLoading();
            const response = await fetch('/api/todos');
            const todos = await response.json();
            this.renderTodos(todos);
        } catch (error) {
            console.error('Error loading todos:', error);
            this.showError('Failed to load todos');
        }
    }
    
    async addTodo() {
        const title = this.todoInput.value.trim();
        if (!title) return;
        
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            
            if (response.ok) {
                this.todoInput.value = '';
                this.loadTodos();
            } else {
                throw new Error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            this.showError('Failed to add todo');
        }
    }
    
    async toggleTodo(id, completed) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
            
            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            this.showError('Failed to update todo');
        }
    }
    
    async deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            this.showError('Failed to delete todo');
        }
    }
    
    async editTodo(id, currentTitle) {
        const newTitle = prompt('Edit todo:', currentTitle);
        if (!newTitle || newTitle === currentTitle) return;
        
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })
            });
            
            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('Failed to edit todo');
            }
        } catch (error) {
            console.error('Error editing todo:', error);
            this.showError('Failed to edit todo');
        }
    }
    
    renderTodos(todos) {
        this.todoList.innerHTML = '';
        
        if (todos.length === 0) {
            this.todoList.innerHTML = '<li class="loading">No todos yet. Add one above!</li>';
            return;
        }
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.title}</span>
                <div class="todo-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            const checkbox = li.querySelector('.todo-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', () => {
                this.toggleTodo(todo._id, checkbox.checked);
            });
            
            editBtn.addEventListener('click', () => {
                this.editTodo(todo._id, todo.title);
            });
            
            deleteBtn.addEventListener('click', () => {
                this.deleteTodo(todo._id);
            });
            
            this.todoList.appendChild(li);
        });
    }
    
    showLoading() {
        this.todoList.innerHTML = '<li class="loading">Loading todos...</li>';
    }
    
    showError(message) {
        this.todoList.innerHTML = `<li class="loading" style="color: #e74c3c;">${message}</li>`;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});