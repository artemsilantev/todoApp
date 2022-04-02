let buttonNewToDo = document.getElementById('buttonAddToDo')
let tasksBody = document.getElementById('todoBodyTasks')
let textAreaForTodo = document.getElementById('todoFooterText')

let inProgressTasks = [];
let completedTasks = [];
let deletedTasks = [];

buttonNewToDo.addEventListener('click', toggleTextArea)

function toggleTextArea() {
    if (textAreaForTodo.style.display === 'block') {
        textAreaForTodo.style.display = 'none'
        let text = textAreaForTodo.value.trim()
        if (text.length > 0) {
            let task = getTask(textAreaForTodo.value)
            tasksBody.insertAdjacentHTML('beforeend', task)
        }
        textAreaForTodo.value = null
        updateTaskCounter()
    } else {
        textAreaForTodo.style.display = 'block'
    }
}


function getTask(text) {
    return `<div class="todoBodyTask todoBodyTaskInProgress">
                <div class="todoBodyTaskCircle"></div>
                <label class="todoBodyTaskHeader">${text}</label>
                <div class="todoBodyTaskCross"></div>
            </div>`
}