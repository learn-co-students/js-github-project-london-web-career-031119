const formEl = document.querySelector('#github-form')
const ulEl = document.querySelector('#user-list')

state = {
    users: [],
    selectedUser: null
}

const triggerRender = () => {
    formEl.addEventListener('submit', event => {
        event.preventDefault()
        const search = formEl.search.value
        getUsers(search)
        .then((users) =>{
            state.users = users
            renderUsers()
        })

    })
}

const renderUsers = () => {
    ulEl.innerHTML = ''
    state.users.items.forEach(renderUser)
}

const renderUser = (user) => {
    const li = document.createElement('li')
    li.innerHTML = `
    <h2><a href= ${user.html_url} >${user.login} </a></h2>
    <img src= ${user.avatar_url} alt="Click to view Repo's">
    `
    ulEl.append(li)

    const img = ulEl.firstElementChild.firstElementChild.firstElementChild

    img.addEventListener('click', () =>{
        const reposList = document.querySelector('#repos-list')
        const li2 = document.createElement('li')
        state.selectedUser = user
        li2.innerHTML = `
        

        `
        reposList.append(li2)
    })
}

const init = () => {
    triggerRender()
}

init()