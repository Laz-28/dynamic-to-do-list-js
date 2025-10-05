// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn'); 
  const taskInput = document.getElementById('task-input'); 
  const taskList = document.getElementById('task-list');   

  // Create the addTask Function
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    } else{

    // ...existing code...
    // Task Creation
    const li = document.createElement('li'); 
    li.appendChild(document.createTextNode(taskText)); // Correct way

    // Create a Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Assign onclick to remove the task when the button is clicked
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append remove button to li, and li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}
  }

  // Attach Event Listeners
  addButton.addEventListener('click', addTask); // When button is clicked

  taskInput.addEventListener('keypress', (event) => {
    // When Enter key is pressed
    if (event.key === 'Enter') {
      addTask();
    }
  });

  
});
