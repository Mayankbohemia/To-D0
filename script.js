const showModal = document.querySelector('.btn__add');
const taskModal = document.querySelector('.task__modal ');
const addForm = document.querySelector('.add__form');
const error = document.querySelector('.error');
const backdrop = document.querySelector('.backdrop');


const taskArr = []
showModal.addEventListener('click', function () {
    taskModal.classList.add('show__modal');
    backdrop.classList.add('blur')
})

backdrop.addEventListener('click', function() {
    taskModal.classList.remove('show__modal');
    backdrop.classList.remove('blur')
})



// ------------------------------Validation-------------------------------------------
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = document.forms['addForm']['task']
    if (task.value.trim() !== '') {
        taskModal.classList.remove('show__modal')
        backdrop.classList.remove('blur')
    }
    if (task.value.trim() === '') {
        error.innerHTML = '*enter valid task!'

    }
    task.addEventListener('focus', function() {
        error.innerHTML = ''

    })

});



