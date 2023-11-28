function drag() {
  const draggables = document.querySelectorAll(".task");
  const droppables = document.querySelectorAll(".swim-lane");

  draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
      taskContainer = task.getAttribute("id");
      draggedEle = task;
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
      // location.reload()
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
      const curTask = document.querySelector(".is-dragging");

      const taskTodo = curTask.querySelector(".editable__text");
      const taskDescription = curTask.querySelector(".description");

      const id = zone.id;

      if (id === "progress-lane") {
        progressItemsData.push({
          id: Date.now(),
          todo: taskTodo.innerText,
          description: taskDescription.innerText,
        });
        localStorage.setItem(
          "progress_items",
          JSON.stringify(progressItemsData)
        );
        
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
