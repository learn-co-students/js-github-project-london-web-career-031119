//get the data from the server
const userList = document.querySelector('#user-list')
 getInfo = (username) => {
   return fetch(`https://api.github.com/search/users?q=${username}`)
   .then(resp => resp.json())

 }

//find the form
const gitForm = document.querySelector('#github-form')

//attach event listener to submit
gitForm.addEventListener('submit', event => {
  event.preventDefault()
  getInfo(gitForm.search.value)
  .then(obj =>renderUser(obj.items[0]))
  // .then((users) => renderUser(users[0]))
})

//render information of user
renderUser = user => {
  const singleUser = document.createElement('li')
  singleUser.innerHTML = `
  <h2>${user.login}</h2>
  <img src= ${user.avatar_url}/>
  <p>${user.url}</p>
  `
  userList.append(singleUser)
}
