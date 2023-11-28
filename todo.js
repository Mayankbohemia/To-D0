const showModal = document.querySelector(".btn__add");
const taskModal = document.querySelector(".task__modal");
const editModal = document.querySelector(".edit__modal");
const addForm = document.querySelector(".add__form");
const editForm = document.querySelector(".edit__form");
const error = document.querySelector(".error");
const backdrop = document.querySelector(".backdrop");
const addTask = document.querySelector("#todo-lane");
const addProgress = document.querySelector("#progress-lane");
const addCompleted = document.querySelector("#completed-tasks");
const taskError = document.querySelector("#error__edit");
const theme = document.querySelector(".theme");
const showPreviewModal = document.querySelector(".preview__modal");
const body = document.querySelector(".body");
const themeToggle = theme.querySelector(".switch");
const taskDesc = document.querySelector(".details");

//------------------Local Storage--------------------------

function setLocalData(dataName, data) {
  return localStorage.setItem(dataName, JSON.stringify(data));
}

const allItemsdata = localStorage.getItem("all_items")
  ? JSON.parse(localStorage.getItem("all_items"))
  : [];

setLocalData("all_items", allItemsdata);

const progressItemsData = localStorage.getItem("progress_items")
  ? JSON.parse(localStorage.getItem("progress_items"))
  : [];

setLocalData("progress_items", progressItemsData);

const completedItemsData = localStorage.getItem("completed_items")
  ? JSON.parse(localStorage.getItem("completed_items"))
  : [];

setLocalData("completed_items", completedItemsData);

const themeSwitch = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "start";
localStorage.setItem("theme", themeSwitch);

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
  showPreviewModal.classList.remove("preview");
});

//---------------------Date-----------------------------------
function displayDate() {
  let date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  // console.log(hours, minutes)
  date = date.toString().split(" ");
  const displayDate = document.querySelectorAll(".date");
  displayDate.forEach((curr) => {
    curr.innerHTML = `${date[1]}/${date[2]}/${date[3]}`;
  });
  const createdTime = document.querySelector(".last__modified");
  createdTime.innerText = `Created at: ${hours}:${minutes}`;
}

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

function editValidate(data, i, localData, str) {
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
    switch (str) {
      case "all":
        // localStorage.setItem("all_items", JSON.stringify(localData));
        setLocalData("all_items",localData)
        break;
      case "progress":
        // localStorage.setItem("progress_items", JSON.stringify(localData));
        setLocalData("progress_items",localData);
        break;
      case "completed":
        // localStorage.setItem("completed_items", JSON.stringify(localData));
        setLocalData("completed_items",localData);
        break;
    }

    data = null;
  });
}
editValidate();

// --------------Adding Tasks----------------------
function renderTasks(data, container, type) {
  let html = "";
  data.forEach((curr) => {
    html += `
      <div class="task" draggable="true" value=${curr.id}>
        <div class="editable__text" data-test-id="123" value=${curr.description}>
          ${curr.todo}
        </div>
        <div class="description">
          ${curr.description}
        </div>
        <div class="icons" value=${curr.description}>
          <img class="deletebtn img" src="bin.png" alt="deletebutton">
          <img class="editbtn img" src="edit.png" alt="editbutton">
        </div>
        <span class="date" value=${curr.description}>12/12/2023</span>
      </div>`;
  });
  container.insertAdjacentHTML("beforeend", html);
  deleteTodoHandler(data, type);
  editTodoHandler(data, type);
  displayDate();
}

function deleteTodoHandler(data, str) {
  const deleteBtns = document.querySelectorAll(`.${str}-lanee .deletebtn`);
  deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", () => deleteItem(i, data, str));
  });
}

function deleteItem(i, data, type) {
  data.splice(i, 1);
  localStorage.setItem(`${type}_items`, JSON.stringify(data));
  location.reload();
}

renderTasks(allItemsdata, addTask, "all");
renderTasks(progressItemsData, addProgress, "progress");
renderTasks(completedItemsData, addCompleted, "completed");

function editTodoHandler(localData, str) {
  let editbtn;
  switch (str) {
    case "all":
      editbtn = addTask.querySelectorAll(".editbtn");
      break;
    case "progress":
      editbtn = addProgress.querySelectorAll(".editbtn");
      break;
    case "completed":
      editbtn = addCompleted.querySelectorAll(".editbtn");
      break;
    default:
      editbtn = [];
  }

  editbtn.forEach((curr, i) => {
    curr.addEventListener("click", function () {
      editModal.classList.add("show__modal");
      backdrop.classList.add("blur");
      document.getElementById("edit__focus").focus();
      const parentEle = curr.parentElement.parentElement;
      const editData = parentEle.querySelector(".editable__text");
      const input = document.forms[1]["edit"];
      input.value = editData.innerText;
      editValidate(editData, i, localData, str);
    });
  });
}

// ----------------------------Drag------------------------------

drag();

// --------------------------------Theme-------------------------------
function switchThemes() {
  if (themeSwitch === "end") {
    theme.classList.add("position__theme");
    body.classList.replace("theme-light", "theme-dark");
  } else {
    theme.classList.remove("position__theme");
    body.classList.replace("theme-dark", "theme-light");
  }
}
switchThemes();

themeToggle.addEventListener("click", function () {
  theme.classList.toggle("position__theme");
  if (theme.classList.contains("position__theme")) {
    localStorage.setItem("theme", "end");
  } else {
    localStorage.setItem("theme", "start");
  }
  location.reload();
});

// ------------------------Preview-------------------------------------
const tasks = document.querySelectorAll(".task");
tasks.forEach((curr) => {
  curr.addEventListener("click", function (e) {
    if (!e.target.classList.contains("img")) {
      showPreviewModal.classList.add("preview");
      backdrop.classList.add("blur");
      const parent = curr.closest(".task");
      const description = parent.querySelector(".description");
      taskDesc.innerText = description.innerText;
    }
  });
});
