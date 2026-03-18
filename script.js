// State Management
let tasks = [
    { id: 1, text: "Attend HOD Lecture", tag: "Work", done: false },
    { id: 2, text: "Register for Quiz", tag: "Personal", done: true },
    { id: 3, text: "Take Driving Lessons", tag: "Personal", done: false }
];

// DOM Elements
const listContainer = document.getElementById('task-list');
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const counter = document.getElementById('counter');

// Core Render Function
function render() {
    listContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-card ${task.done ? 'completed' : ''}`;
        
        div.innerHTML = `
            <div class="task-left">
                <div class="circle-check"></div>
                <div class="task-info">
                    <span class="task-text">${task.text}</span>
                    <span class="task-tag">${task.tag}</span>
                </div>
            </div>
            <div class="actions">
                <i class="ph ph-pencil-simple btn-edit"></i>
                <i class="ph ph-trash btn-delete"></i>
            </div>
        `;

        // Event Listeners for dynamic elements
        div.querySelector('.circle-check').addEventListener('click', () => toggleTask(task.id));
        div.querySelector('.btn-edit').addEventListener('click', () => editTask(task.id));
        div.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));

        listContainer.appendChild(div);
    });

    counter.innerText = `${tasks.length} Objectives`;
}

// Logic: Add
function addNewTask() {
    const text = input.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        tag: "New",
        done: false
    };

    tasks.push(newTask);
    input.value = "";
    render();
}

// Logic: Toggle
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    render();
}

// Logic: Delete
function deleteTask(id) {
    const element = document.querySelector(`[onclick="deleteTask(${id})"]`)?.closest('.task-card');
    // Simple filter for deletion logic
    tasks = tasks.filter(t => t.id !== id);
    render();
}

// Logic: Edit
function editTask(id) {
    const taskToEdit = tasks.find(t => t.id === id);
    const newText = prompt("Update objective:", taskToEdit.text);
    
    if (newText !== null && newText.trim() !== "") {
        tasks = tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
        render();
    }
}

// Event Listeners
addBtn.addEventListener('click', addNewTask);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask();
});

// Initial Load
render();