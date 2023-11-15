const showModal = document.querySelector(".btn__add");
const taskModal = document.querySelector(".task__modal ");
const addForm = document.querySelector(".add__form");
const error = document.querySelector(".error");
const backdrop = document.querySelector(".backdrop");
const addTask = document.querySelector("#todo-lane");
console.log(addTask);

showModal.addEventListener("click", function () {
  taskModal.classList.add("show__modal");
  backdrop.classList.add("blur");
});

backdrop.addEventListener("click", function () {
  taskModal.classList.remove("show__modal");
  backdrop.classList.remove("blur");
});

// ------------------------------Validation-------------------------------------------

function taskValidate() {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = document.forms["addForm"]["task"];
    console.log(task.value);
    if (task.value.trim() !== "") {
      taskModal.classList.remove("show__modal");
      backdrop.classList.remove("blur");

      const todoDiv = document.createElement("div");
      todoDiv.innerHTML = task.value;
      todoDiv.classList.add("task");
      todoDiv.setAttribute("draggable", "true");

      addTask.appendChild(todoDiv);
      todoDiv.addEventListener("dragstart", function (e) {
        console.log(this);
        draggedTaskIdentify = this;
        task.classList.add("is-dragging");
      });
      todoDiv.addEventListener("dragend", function (e) {
        draggedTaskIdentify = null;
        task.classList.remove("is-dragging");
      });
    } else if (task.value.trim() === "") {
      error.innerHTML = "*task cannot be empty";
    }
    task.addEventListener("focus", function () {
      error.innerHTML = "";
    });
  });
}
taskValidate();
