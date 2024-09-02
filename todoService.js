const fs = require('fs');
const path = require('path');

const todosFilePath = path.join(__dirname, 'todos.json');

// Read todos from file
const getTodos = () => {
    if (!fs.existsSync(todosFilePath)) {
        return [];
    }
    const todos = fs.readFileSync(todosFilePath, 'utf8');
    return JSON.parse(todos || '[]');
};

// Write todos to file
const saveTodos = (todos) => {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
};

module.exports = { getTodos, saveTodos };
