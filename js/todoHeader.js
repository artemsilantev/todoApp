let header = document.getElementById('headerTime')
let headerTaskCount = document.getElementById('taskCount')
window.addEventListener('load', setDate)

function setDate() {
    let day = getDateText({weekday: 'long'})
    let month = getDateText({month: 'long'})
    let dayNumber = getDateText({day: 'numeric'})
    let year = getDateText({year: 'numeric'})
    header.innerText = `${day}, ${month} ${dayNumber}, ${year}`
}


function getDateText(options) {
    return new Intl.DateTimeFormat('en-Us', options).format(new Date());
}


function updateTaskCounter() {
    let count = 0
    let tasks = document.getElementsByClassName('todoBodyTask')
    Array.from(tasks).forEach(task => {
        if (task.style.display !== 'none') {
            count++
        }
    })
    headerTaskCount.innerText = `${count} tasks`
}