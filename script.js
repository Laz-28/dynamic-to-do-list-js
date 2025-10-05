document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addButton = document.getElementById('add-task-btn');

    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            // Extracts the task text (first child node, which is the text node)
            const text = item.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask(taskText, isNewTask = true) {
        taskText = taskText.trim();
        
        if (!taskText) {
            if (isNewTask) alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(taskText));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (isNewTask) {
            taskInput.value = '';
            saveTasksToLocalStorage();
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Initialization
    loadTasks(); 

    // Event Listeners
    if (addButton) {
        addButton.addEventListener('click', () => {
            addTask(taskInput.value);
        });
    }

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
