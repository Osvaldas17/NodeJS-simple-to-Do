let url = 'http://localhost:3000/api/v1'


document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    if (!email || !password) return alert('Enter email and password')

    let body = {
        email,
        password
    }
    try {
        let response = await fetch(`${url}/user/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.status != 200) throw await response.json()
        let token = response.headers.get('todoauth')
        localStorage.setItem('todoauth', token)
        localStorage.setItem('todo-user',await JSON.stringify( await response.json()))
        window.location.href = './toDo.html'
    } catch (e) {
        alert(e.message)
    }

})