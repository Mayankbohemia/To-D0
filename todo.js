const showModal = document.querySelector(".btn__add");
const taskModal = document.querySelector(".task__modal");
const editModal = document.querySelector(".edit__modal");
const addForm = document.querySelector(".add__form");
const editForm = document.querySelector(".edit__form");
const error = document.querySelector(".error");
const backdrop = document.querySelector(".backdrop");
const addTask = document.querySelector("#todo-lane");
const taskError = document.querySelector("#error__edit");
const theme = document.querySelector(".theme");
const showPreviewModal = document.querySelector('.preview__modal')

//------------------Local Storage--------------------------
const allItemsdata = localStorage.getItem("all_items")
  ? JSON.parse(localStorage.getItem("all_items"))
  : [];
localStorage.setItem("all_items", JSON.stringify(allItemsdata));

const progressItemsData = localStorage.getItem("progress_items")
  ? JSON.parse(localStorage.getItem("progress_items"))
  : [];
localStorage.setItem("progess_items", JSON.stringify(progressItemsData));

const completedItemsData = localStorage.getItem("completed_items")
  ? JSON.parse(localStorage.getItem("completedItemsData"))
  : [];
localStorage.setItem("completed_item", JSON.stringify(completedItemsData));

const themeSwitch = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : 'start';
localStorage.setItem('theme', themeSwitch)

//-------------------------------Modal------------------------
showModal.addEventListener("click", function () {
  taskModal.classList.add("show__modal");
  backdrop.classList.add("blur");
  document.querySelector(".add__focus").focus();
});

backdrop.addEventListener("click", function () {
  taskModal.classList.remove("show__modal");
  backdrop.classList.remove("blur");
  editModal.classList.remove("show__modal");
  editModal.classList.remove("blur");
  showPreviewModal.classList.remove('preview')
});

//---------------------Date-----------------------------------
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  const displayDate = document.querySelectorAll(".date");
  displayDate.forEach((curr) => {
    curr.innerHTML = `${date[1]}/${date[2]}/${date[3]}`;
  });
}
displayDate();

// -----------------Vallidation------------------------------------
function taskValidate() {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = document.forms["addForm"]["task"];
    const description = document.forms["addForm"]["description"];    
    if (task.value.trim() !== "") {
      taskModal.classList.remove("show__modal");
      backdrop.classList.remove("blur");
      allItemsdata.push({
        id: Date.now(),
        todo: task.value,
        description: description.value,
      });
      localStorage.setItem("all_items", JSON.stringify(allItemsdata));
      location.reload();
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

function editValidate(data, i, localData) {
  if (!data) {
    return;
  }
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputValue = document.forms[1]["edit"];
    if (inputValue.value.trim() === "") {
      taskError.innerText = "*task cannot be empty";
      return;
    }
    taskError.innerText = "";
    editModal.classList.remove("show__modal");
    backdrop.classList.remove("blur");
    data.innerText = inputValue.value;
    localData[i].todo = inputValue.value;
    localStorage.setItem("all_items", JSON.stringify(localData));
    data = null;
  });
}
editValidate();

//====================All Tasks=======================================
function allTasks() {
  let html = "";
  allItemsdata.forEach((curr) => {
    console.log(curr)
    html += `
  <div class="task" draggable="true" >
            <div class="editable__text" data-test-id="123" value=${curr.description}>
              ${curr.todo}
            </div>
            
            <div class="icons">
              <img class="deletebtn" src="bin.png" alt="deletebutton">
              <img class="editbtn" src="edit.png" alt="editbutton">
              </div> 
            <span class="date">12/12/2023</span>
          </div>  `;
  });
  addTask.insertAdjacentHTML("beforeend", html);
  deleteTodoHandler(allItemsdata);
  editTodoHandler(allItemsdata);
}
allTasks();

//====================Progress Tasks--------------------------//
function progress() {
  let html = "";
}

function deleteTodoHandler(data) {
  const deletebtn = document.querySelectorAll(".deletebtn");
  deletebtn.forEach((curr, i) => {
    curr.addEventListener("click", () => deleteItem(i, data));
  });
}

function deleteItem(i, data) {
  data.splice(i, 1);
  localStorage.setItem("all_items", JSON.stringify(data));
  location.reload();
}

function editTodoHandler(localData) {
  const editbtn = document.querySelectorAll(".editbtn");
  editbtn.forEach((curr, i) => {
    curr.addEventListener("click", function () {
      editModal.classList.add("show__modal");
      backdrop.classList.add("blur");
      document.getElementById("edit__focus").focus();
      const parentEle = curr.parentElement.parentElement;
      const editData = parentEle.querySelector(".editable__text");
      const input = document.forms[1]["edit"];
      input.value = editData.innerText;
      editValidate(editData, i, localData);
    });
  });
};

// ----------------------------Drag------------------------------
drag();

// --------------------------------Theme-------------------------------
theme.querySelector(".switch").addEventListener("click", function () {
  theme.classList.toggle("position__theme");
});

// ------------------------Preview--------------------------------------
const tasks = document.querySelectorAll('.task')
tasks.forEach(curr => {
  curr.addEventListener('click', function() {
     showPreviewModal.classList.add('preview');
     backdrop.classList.add("blur");
  });
});


