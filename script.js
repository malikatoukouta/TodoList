const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = tasks.map((task, index) => `
    <div class="task">
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div>
        <button data-index="${index}" class="checkBtn">✅</button>
        <button data-index="${index}" class="deleteBtn">❌</button>
      </div>
    </div>
  `).join("");

  counter.textContent = `${tasks.length} tâche${tasks.length > 1 ? "s" : ""}`;
}

function addTask() {
  const task = taskInput.value.trim();

  if (task === "") return;

  tasks.push({
    text: task,
    completed: false
  });

  saveTasks();
  displayTasks();

  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", (event) => {
  const index = event.target.dataset.index;

  if (event.target.classList.contains("deleteBtn")) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
  }

  if (event.target.classList.contains("checkBtn")) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
  }
});

displayTasks();