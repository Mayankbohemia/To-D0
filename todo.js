const showModal = document.querySelector(".btn__add");
const taskModal = document.querySelector(".task__modal");
const editModal = document.querySelector(".edit__modal");
const addForm = document.querySelector(".add__form");
const editForm = document.querySelector(".edit__form");
const error = document.querySelector(".error");
const backdrop = document.querySelector(".backdrop");
const addTask = document.querySelector("#todo-lane");
const icons = document.querySelectorAll(".icons");
const deleteHandler = document.querySelectorAll(".deletebtn");
const editHandler = document.querySelectorAll(".editbtn");

showModal.addEventListener("click", function () {
  taskModal.classList.add("show__modal");
  backdrop.classList.add("blur");
});

backdrop.addEventListener("click", function () {
  taskModal.classList.remove("show__modal");
  backdrop.classList.remove("blur");
  editModal.classList.remove("show__modal");
  editModal.classList.remove("blur");
});

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  // console.log(date);
  const displayDate = document.querySelectorAll(".date");
  displayDate.forEach((curr) => {
    curr.innerHTML = date[1] + "/" + date[2] + "/" + date[3];
  });
}
displayDate();

// -----------------Vallidation--------------
function taskValidate() {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = document.forms["addForm"]["task"];
    
    if (task.value.trim() !== "") {
      // ------------Adding Tasks------
      taskModal.classList.remove("show__modal");
      backdrop.classList.remove("blur");

      const todoDiv = document.createElement("div");
      
      todoDiv.classList.add("task");
      todoDiv.setAttribute("draggable", "true");
      const editDiv = document.createElement('div');
      editDiv.classList.add("editable__text");
      todoDiv.appendChild(editDiv);
      editDiv.innerText = task.value;
      

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

      const iconsHolder = document.createElement("div");
      iconsHolder.classList.add("icons");
      const deleteIcon = document.createElement("img");
      const editIcon = document.createElement("img");    
      
      deleteIcon.classList.add("deletebtn");
      deleteIcon.setAttribute("src", "bin.png");
      editIcon.classList.add("editbtn");
      editIcon.setAttribute("src", "edit.png");
      iconsHolder.appendChild(deleteIcon);
      iconsHolder.appendChild(editIcon);
      todoDiv.appendChild(iconsHolder);

      deleteIcon.addEventListener("click", function () {
        const removeElement = this.closest(".task");
        removeElement.remove();
      });
      editIcon.addEventListener("click", function () {
        editModal.classList.add("show__modal");
        backdrop.classList.add("blur");
        const parentEle = this.parentElement.parentElement;
        // console.log(parentEle)
        const editData = parentEle.querySelector(".editable__text");
        console.log(editData)
        editValidate(editData);
      });
      task.value = "";
    } else if (task.value.trim() === "") {
      error.innerHTML = "*task cannot be empty";
    }
    task.addEventListener("focus", function () {
      error.innerHTML = "";
    });
  });
}
taskValidate();

function editValidate(data) {
  
  if (!data) {
    return;
  }
  editForm.addEventListener("submit", function (e) {
    console.log(data)
    e.preventDefault();    
    editModal.classList.remove("show__modal");
    backdrop.classList.remove("blur");
    const inputValue = document.forms[1]["edit"];
    data.innerText = inputValue.value;     
    data = null;
  });
}
editValidate();

// --------delete-------
deleteHandler.forEach((curr) => {
  curr.addEventListener("click", function () {
    const removeElement = curr.closest(".task");
    removeElement.remove();
  });
});

// -------------edit----------
editHandler.forEach((curr) => {
  curr.addEventListener("click", function () {
    editModal.classList.add("show__modal");
    backdrop.classList.add("blur");
    const parentEle = curr.parentElement.parentElement;
    const editData = parentEle.querySelector(".editable__text");
    // console.log(editData)
    editValidate(editData);
  });
});
