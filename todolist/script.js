document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const title = document.getElementById('task-title').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    if (title === '' || deadline === '') {
        alert('Kérjük, töltse ki a feladat címét és határidejét.');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        deadline,
        priority,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    loadTasks();

    document.getElementById('task-title').value = '';
    document.getElementById('task-deadline').value = '';
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add(`priority-${task.priority}`);

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.innerHTML = `<span>${task.title}</span><span>Határidő: ${task.deadline}</span>`;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.onclick = () => deleteTask(task.id);

        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);
    });
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    loadTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks() {
    const search = document.getElementById('search').value.toLowerCase();
    const filterPriority = document.getElementById('filter-priority').value;
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search);
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        return matchesSearch && matchesPriority;
    });
    displayTasks(filteredTasks);
}

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add(`priority-${task.priority}`);

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.innerHTML = `<span>${task.title}</span><span>Határidő: ${task.deadline}</span>`;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.onclick = () => deleteTask(task.id);

        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);
    });
}
