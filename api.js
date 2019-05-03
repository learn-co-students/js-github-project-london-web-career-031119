const url = 'https://api.github.com/search/users?q='

const getUsers = (search) =>
    fetch(url + search)
    .then(resp => resp.json())
