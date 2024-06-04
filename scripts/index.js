document.getElementById('task-form').addEventListener('submit', addTask);

function removeAccentAndApplyLowerCase(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    const allListItems = document.querySelectorAll(`li`);
    
    const allListItemsData = []

    allListItems.forEach(item => {
        allListItemsData.push(removeAccentAndApplyLowerCase(item.textContent));
    });

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    } else if (allListItemsData.includes(removeAccentAndApplyLowerCase(`${taskText}X`))) {
        alert('Essa tarefa ja existe!');
        taskInput.value = '';
        return;
    }else {
        addTaskToDom(taskText);
        taskInput.value = '';
    } 
}

function addTaskToDom(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', toggleTaskCompletion);

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(li);
}
document.getElementById('task-form').addEventListener('submit', addTask);

function removeAccentAndApplyLowerCase(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    const allListItems = document.querySelectorAll('li');
    const allListItemsData = [];

    allListItems.forEach(item => {
        allListItemsData.push(removeAccentAndApplyLowerCase(item.textContent));
    });

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    } else if (allListItemsData.includes(removeAccentAndApplyLowerCase(`${taskText}X`))) {
        alert('Essa tarefa já existe!');
        taskInput.value = '';
        return;
    } else {
        addTaskToDom(taskText);
        taskInput.value = '';

        // Save task to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function addTaskToDom(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', toggleTaskCompletion);

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(li);
}

function toggleTaskCompletion(e) {
    e.target.classList.toggle('completed');
}

function deleteTask(e) {
    const li = e.target.parentElement;
    li.remove();

    // Remove task from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = li.textContent;
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Load tasks from local storage on page load
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        addTaskToDom(taskText);
    });
});
function toggleTaskCompletion(e) {
    e.target.classList.toggle('completed');
}

function deleteTask(e) {
    const li = e.target.parentElement;
    li.remove();
}