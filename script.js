
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    storedTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="task ${task.completed ? "completed" : ""}">${task.text}</span>
        <button class="delete-btn">Delete</button>
      `;

      const deleteButton = taskItem.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => {
        storedTasks.splice(storedTasks.indexOf(task), 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
        renderTasks();
      });

      const checkbox = taskItem.querySelector("input[type=checkbox]");
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
        renderTasks();
      });

      taskList.appendChild(taskItem);
    });
  }

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      storedTasks.push({ text: taskText, completed: false });
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
      renderTasks();
      taskInput.value = "";
    }
  });

  // Initial rendering of tasks
  renderTasks();