let tasks = [];

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch('/tasks')
        .then(res => res.json())
        .then(data => {
            tasks = data;
            renderTasks();
        });
}

function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.editing) {
            li.innerHTML = `
                <input type="text" id="edit-${index}" value="${task.text}" />
                <button onclick="saveEdit(${index})">Save</button>
                <button onclick="cancelEdit(${index})">Cancel</button>
            `;
        } else {
            li.innerHTML = `
                <span class="${task.done ? 'done' : ''}" onclick="toggleDone(${index})">
                    ${task.text}
                </span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
        }

        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("new-task");
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    input.value = '';
    saveTasks();
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function editTask(index) {
    tasks[index].editing = true;
    renderTasks();
}

function cancelEdit(index) {
    delete tasks[index].editing;
    renderTasks();
}

function saveEdit(index) {
    const newText = document.getElementById(`edit-${index}`).value.trim();
    if (newText) {
        tasks[index].text = newText;
    }
    delete tasks[index].editing;
    saveTasks();
}

function saveTasks() {
    fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks)
    })
    .then(() => renderTasks());
}
