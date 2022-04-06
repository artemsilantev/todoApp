let buttonNewToDo = document.getElementById('buttonAddToDo')
let bodyHeader = document.getElementById('bodyHeaderText')
let tasksBody = document.getElementById('todoBodyTasks')
let textAreaForTodo = document.getElementById('todoFooterText')
let dropDownItems = document.getElementsByClassName('todoBodyHeaderDropDownItem')

const TASK_STATE = {DELETED: 'Removed', COMPLETED: 'Completed', IN_PROGRESS: 'In Progress'}
const HEADER = {DELETED: 'Removed list', COMPLETED: 'Completed list', IN_PROGRESS: 'To do list'}

const taskInProgressClass = 'todoBodyTaskInProgress'
const taskDeletedClass = 'todoBodyTaskDeleted'
const taskCompletedClass = 'todoBodyTaskCompleted'


buttonNewToDo.addEventListener('click', toggleTextArea)
window.addEventListener('keypress', function (event){
    if(event.key === 'Enter'){
        toggleTextArea()
    }
})
Array.from(dropDownItems).forEach(element => element.onclick = toggleDisplayTasks)

function toggleDisplayTasks(event) {
    updateTaskBody(event.target.innerHTML)
}

function toggleTextArea() {
    if (textAreaForTodo.style.display === 'block') {
        textAreaForTodo.style.display = 'none'
        let text = textAreaForTodo.value.trim()
        if (text.length > 0) {
            let task = getTask(textAreaForTodo.value)
            tasksBody.insertAdjacentHTML('beforeend', task)
        }
        textAreaForTodo.value = ''
        updateTaskBody(TASK_STATE.IN_PROGRESS)
    } else {
        textAreaForTodo.style.display = 'block'
        textAreaForTodo.focus()
    }
}

function getTask(text) {
    return `<div class="todoBodyTask todoBodyTaskInProgress">
                <div class="todoBodyTaskCircle" onclick="completed(this)"></div>
                <label class="todoBodyTaskHeader">${text}</label>
                <div class="todoBodyTaskCross" onclick="deleted(this)"></div>
            </div>`
}

function completed(element) {
    let parentDiv = element.parentElement
    element.onclick = null;
    parentDiv.classList.remove(taskInProgressClass)
    let cross = parentDiv.querySelector("[class='todoBodyTaskCross']")
    cross.style.display = 'none'
    let circle = parentDiv.querySelector("[class='todoBodyTaskCircle']")
    circle.onclick = null;
    parentDiv.classList.add(taskCompletedClass)
    parentDiv.style.display = 'none'
    updateTaskCounter()
}

function deleted(element) {
    let parentDiv = element.parentElement
    parentDiv.classList.remove(taskInProgressClass)
    let cross = parentDiv.querySelector("[class='todoBodyTaskCross']")
    cross.style.display = 'none'
    let circle = parentDiv.querySelector("[class='todoBodyTaskCircle']")
    circle.onclick = null;
    parentDiv.classList.add(taskDeletedClass)
    parentDiv.style.display = 'none'
    updateTaskCounter()
}

function updateTaskBody(taskState) {
    if (taskState == null) {
        return
    }
    let classToEnable = null
    let header = null
    switch (taskState) {
        case TASK_STATE.DELETED:
            classToEnable = taskDeletedClass
            header = HEADER.DELETED
            break
        case TASK_STATE.IN_PROGRESS:
            classToEnable = taskInProgressClass
            header = HEADER.IN_PROGRESS
            break
        case TASK_STATE.COMPLETED:
            classToEnable = taskCompletedClass
            header = HEADER.COMPLETED
            break
    }
    let tasks = document.getElementsByClassName('todoBodyTask')
    Array.from(tasks).forEach(task => {
        if (task.classList.contains(classToEnable)) {
            task.style.display = 'flex'
        } else {
            task.style.display = 'none'
        }
    })
    bodyHeader.innerText = header
    updateTaskCounter()
}