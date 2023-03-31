document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority-select");
  let tasks = [];

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("new-task-description");
    const taskPriority = prioritySelect.value;
    const newTask = createTask(taskInput.value, taskPriority);
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  });

  taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      const taskId = event.target.parentNode.dataset.id;
      removeTask(taskId);
      renderTasks();
    } else if (event.target.tagName === "SPAN") {
      const taskId = event.target.parentNode.dataset.id;
      const task = tasks.find(task => task.id === taskId);
      const taskInput = event.target.parentNode.querySelector(".edit-task-input");
      const taskText = event.target.parentNode.querySelector(".task-text");
      if (taskInput.style.display === "none") {
        taskInput.value = task.text;
        taskInput.style.display = "inline-block";
        taskText.style.display = "none";
      } else {
        const newTaskText = taskInput.value;
        if (newTaskText !== task.text) {
          task.text = newTaskText;
          renderTasks();
        } else {
          taskInput.style.display = "none";
          taskText.style.display = "inline-block";
        }
      }
    }
  });

  function createTask(text, priority) {
    return { id: Date.now().toString(), text, priority };
  }

  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
  }

  function sortTasksByPriority(tasks) {
    return tasks.sort((taskA, taskB) => {
      if (taskA.priority === "High" && taskB.priority !== "High") {
        return -1;
      } else if (taskA.priority !== "High" && taskB.priority === "High") {
        return 1;
      } else if (taskA.priority === "Medium" && taskB.priority === "Low") {
        return -1;
      } else if (taskA.priority === "Low" && taskB.priority === "Medium") {
        return 1;
      } else {
        return 0;
      }
    });
  }

  function renderTasks() {
    taskList.innerHTML = "";
    sortTasksByPriority(tasks).forEach(function(task) {
      const taskItem = document.createElement("li");
      taskItem.dataset.id = task.id;
      const taskText = document.createElement("span");
      taskText.classList.add("task-text");
      taskText.innerText = task.text;
      taskItem.appendChild(taskText);
      const taskPriority = document.createElement("span");
      taskPriority.classList.add("task-priority");
      taskPriority.innerText = task.priority;
      taskItem.appendChild(taskPriority);
      const editTaskInput = document.createElement("input");
      editTaskInput.classList.add("edit-task-input");
      editTaskInput.type = "text";
      taskItem.appendChild(editTaskInput);
      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("delete-task-button");
      deleteTaskButton.innerText = "Delete";
      taskItem.appendChild(deleteTaskButton);
      taskList.appendChild(taskItem);
    });
  }
});

