
const express = require('express');
const { getTodos, saveTodos } = require('./todoService');

const app = express();
const PORT = 3000;

app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
    const todos = getTodos();
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const todos = getTodos();
    const newTodo = req.body;
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const todos = getTodos();
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;

    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index] = updatedTodo;
        saveTodos(todos);
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todos = getTodos();
    const id = parseInt(req.params.id);
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (todos.length !== filteredTodos.length) {
        saveTodos(filteredTodos);
        res.json({ message: 'Todo deleted' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
