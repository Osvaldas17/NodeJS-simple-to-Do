
let token;
let url = 'http://localhost:3000/api/v1';
let user;

window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('todoauth')

    if (!token) return window.location.href = './toDoLogIn.html'

    user = JSON.parse(localStorage.getItem('todo-user'))

    getMyTasks()
})

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault()

    let content = document.getElementById('content').value
    if (!content) return alert('provide content')

    let body = {
        content
    }

    try {
        let response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'todoauth': token
            },
            body: JSON.stringify(body)
        })

        if (response.status != 200) throw await response.json()

        let data = await response.json()
        console.log(data)

        document.getElementById('content').value = ''
        window.location.href = './toDo.html'
    } catch (e) {
        alert(e)
    }

})

const getMyTasks = async () => {
    let response = await fetch(`${url}/myTasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'todoauth': token
        }
    })

    let tasks = await response.json()
    showTasks(tasks)
}

const showTasks = (tasks) => {
     tasks.forEach((task) => {
         console.log(task)
         const div1 = document.createElement('div')
         div1.className = 'card mb-3 p-3 w-75'
         const div2 = document.createElement('div')
         div2.className = 'row g-0'
         const div3 = document.createElement('div')
         div3.className = 'col-md-10'
         const div4 = document.createElement('div')
         div4.className = 'card-body d-flex justify-content-between align-items-center'
         const checkBox = document.createElement('input')
         if (task.checked % 2 === 0) {
             checkBox.checked = true
         }
         checkBox.type = 'checkbox'
         checkBox.addEventListener('click',() => {
             checkTask((task._id))
         })
         const h2 = document.createElement('h2')
         h2.textContent = task.content
         const delBtn = document.createElement('button')
         delBtn.textContent = 'X'
         delBtn.addEventListener('click',() => {
             window.location.reload();
             deleteTask(this, task._id)
         })
         let cardContainer = document.getElementById('cardContainer')
         cardContainer.append(div1)
         div1.append(div2)
         div2.append(div3)
         div3.append(div4)
         div4.append(checkBox, h2, delBtn)
     })}


const deleteTask = (el,id) => {

    let body = {
        _id: id
    }
    fetch(`${url}/deleteTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'todoauth': token
        },
        body: JSON.stringify(body)
    })
}


const checkTask = (id) => {

    let body = {
        _id: id
    }
    fetch(`${url}/task/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'todoauth': token
        },
        body: JSON.stringify(body)
    })
}



const logOut = () => {

    fetch(`${url}/user/logOut`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'todoauth': token
        }
    })

    localStorage.removeItem('todoauth')
    localStorage.removeItem('todo-user')


    window.location.href = './toDoLogIn.html'
}
