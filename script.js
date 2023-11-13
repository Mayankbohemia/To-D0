const showModal = document.querySelector('.btn__add');
const taskModal = document.querySelector('.task__modal ');
const addForm = document.querySelector('.add__form');
const error = document.querySelector('.error');
const backdrop = document.querySelector('.backdrop');



let taskArr = []
showModal.addEventListener('click', function () {
    taskModal.classList.add('show__modal');
    backdrop.classList.add('blur')
})

backdrop.addEventListener('click', function () {
    taskModal.classList.remove('show__modal');
    backdrop.classList.remove('blur');
})




// ------------------------------Validation-------------------------------------------

function taskValidate() {
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = document.forms['addForm']['task']
        if (task.value.trim() !== '') {

            taskModal.classList.remove('show__modal');
            backdrop.classList.remove('blur');
            taskArr = []
            taskArr.push(task.value.trim())
            addTask()
            const allTasks = document.querySelector('.all__tasks')
            dragStart(allTasks)
            task.value = ''
        }
        else if (task.value.trim() === '') {
            error.innerHTML = '*task cannot be empty';

        }
        task.addEventListener('focus', function () {
            error.innerHTML = ''

        })

    });
}
taskValidate();



// -----------------------------------------Displaying All Tasks------------------------------//

function addTask() {
    let container = document.querySelector('.task__conntainer');

    taskArr.forEach(ele => {
        const html = `<div id=${ele} class="todo all__tasks" draggable="true">
         <h5>${ele}</h5>
    
    </div>`

        container.insertAdjacentHTML('beforeend', html)
    })

}
addTask();


// ------------------------------Drag and Drop------------------- //

function dragStart(ele) {

    ele.addEventListener('dragstart', function (ev) {
        console.log(ev.target);
        ev.dataTransfer.setData("text", ev.target);

    })

}



