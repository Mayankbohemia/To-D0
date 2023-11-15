const draggableTasks = document.querySelectorAll('.task');
const droppedTasks = document.querySelectorAll('.swim-lane');


let draggedTaskIdentify = null
console.log(droppedTasks) 
draggableTasks.forEach(task => {
    task.addEventListener('dragstart', function() {
        console.log(this)
        draggedTaskIdentify = this;
        task.classList.add('is-dragging')
    });
    task.addEventListener('dragend', function() {
        draggedTaskIdentify = null;
        task.classList.remove('is-dragging')
    })
});


droppedTasks.forEach(curr => {
    curr.addEventListener('dragover', function(e) {
        // console.log('dropover')
        e.preventDefault();

    })
    curr.addEventListener('drop', function(e) {
        this.appendChild(draggedTaskIdentify)
        console.log(this)

    })
})