// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage
    loadTasks();

    // Event Listener for button click
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Event Listener for 'Enter' key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    /**
     * Function to load tasks from Local Storage and display them
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Do not re-save to storage
    }

    /**
     * Function to add a task to the list and optionally save it to Local Storage
     * @param {string} taskText - The text content of the task
     * @param {boolean} save - Whether to save the task to Local Storage (default: true)
     */
    function addTask(taskText, save = true) {
        // Trim the input
        taskText = taskText.trim();

        // If empty, alert user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create task list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task logic
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button and list item to DOM
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * Function to remove a task from Local Storage
     * @param {string} taskText - The task text to be removed
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});

