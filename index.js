SEARCH_GITHUB_URL = ''

const form = document.querySelector('#github-form')
const renderDiv = document.querySelector('div#user-list')

getUser = (name) => fetch(`https://api.github.com/search/users?q=${name}`,{
   headers: {'Accept': 'application/vnd.github.v3+json'}})
   .then(r => r.json())

const showRepo = repo => {
   const repoDiv = document.querySelector('div#repos')
   if (repo.name != null) {
      repoDiv.innerHTML += `<p>${repo.name}</p>`
   }
}

const showRepos = (repos) => repos.forEach(showRepo)

const getRepos = (name) => fetch(`https://api.github.com/users/${name}/repos`,{headers: {'Accept': 'application/vnd.github.v3+json'}}).then(r => r.json()).then(showRepos)

const showUser = user => {
   const div = document.createElement('div')
   div.className = 'card'
   div.innerHTML=`
   <div class="content">
      <div class="ui avatar image">
         <img src="${user.avatar_url}"> ${user.login}
      </div>
   </div>
   <div id="repos" class="meta"></div>
   <div class="extra content">
      <span class="right floated">Score: ${user.score}</span>
      <span>
         <i class="user icon"></i>
         <a href="${user.html_url}">Profile</a>
      </span>
   </div>`
   renderDiv.append(div)
   getRepos(user.login)
}

form.addEventListener('submit',(e) => {
   e.preventDefault()
   getUser(e.target.search.value)
      .then(d => showUser(d.items[0]))
})