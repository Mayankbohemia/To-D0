function drag() {
  const draggables = document.querySelectorAll(".task");
  const droppables = document.querySelectorAll(".swim-lane");

  draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
      taskContainer = task.getAttribute("id");
      draggedEle = task;
      // console.log(taskContainer);
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
      task.classList.add("transition");
      let taskId = task.getAttribute("value");
      const taskIndex = allItemsdata.findIndex(
        (item) => item.id === parseInt(taskId)
      );
      if (taskIndex !== -1) {
        allItemsdata.splice(taskIndex, 1);
        localStorage.setItem("all_items", JSON.stringify(allItemsdata));
      }
      const progressTaskIndex = progressItemsData.findIndex(
        (item) => item.id === parseInt(taskId)
      );

      if (progressTaskIndex !== -1) {
        progressItemsData.splice(progressTaskIndex, 1);
        localStorage.setItem(
          "progress_items",
          JSON.stringify(progressItemsData)
        );
      }

      const completedTaskIndex = completedItemsData.findIndex(
        (item) => item.id === parseInt(taskId)
      );

      if (completedTaskIndex !== -1) {
        completedItemsData.splice(completedTaskIndex, 1);
        localStorage.setItem(
          "completed_items",
          JSON.stringify(completedItemsData)
        );
      }
    });
  });

  droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();

      const bottomTask = insertAboveTask(zone, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (!bottomTask) {
        zone.appendChild(curTask);
      } else {
        zone.insertBefore(curTask, bottomTask);
      }
    });

    zone.addEventListener("drop", function (e) {
      // console.log(this)
      // console.log(zone)
      // console.log("taskcontainer", taskContainer);

      // console.log("curTask", curTask)
      const curTask = document.querySelector(".is-dragging");
      // console.log(curTask)
      // const zoneName =  curTask.querySelector('.task')

      const taskTodo = curTask.querySelector(".editable__text");
      const taskDescription = curTask.querySelector(".description");
      // console.log(taskDescription)
      // console.log(taskTodo.innerText);
      // console.log(zone.id);
      const id = zone.id;
      // console.log(id);

      if (id === "progress-lane") {
        // const data = JSON.parse(localStorage.getItem("progress_items"))
        // console.log(data)
        // console.log(progressItemsData);
        progressItemsData.push({
          id: Date.now(),
          todo: taskTodo.innerText,
          description: taskDescription.innerText,
        });
        localStorage.setItem(
          "progress_items",
          JSON.stringify(progressItemsData)
        );
        // location.reload()
      }

      if (id === "completed-tasks") {
        completedItemsData.push({
          id: Date.now(),
          todo: taskTodo.innerText,
          description: taskDescription.innerText,
        });
        localStorage.setItem(
          "completed_items",
          JSON.stringify(completedItemsData)
        );
      }

      if (id === "todo-lane") {
        // console.log("todolane");
        allItemsdata.push({
          id: Date.now(),
          todo: taskTodo.innerText,
          description: taskDescription.innerText,
        });
        localStorage.setItem("all_items", JSON.stringify(allItemsdata));
      }

      //  const bar = zone.querySelector('')
      // const taskDecs = document.querySelector()
      // const decscription = taskTodo.innerText;
      // console.log('des',decscription)

      // console.log("taskDesc", taskTodo.textContent)

      // console.log(zoneName)
      location.reload();
    });
  });

  const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();

      const offset = mouseY - top;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });
    return closestTask;
  };
}
