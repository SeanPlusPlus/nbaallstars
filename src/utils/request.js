function get(url) {
  return fetch(url, { credentials: 'include' }).then(response => response.json())
}

function remove(url) {
  return fetch(url, { credentials: 'include', method: 'delete' }).then(response => response.json())
}

function post(url) {
  return fetch(url, { credentials: 'include', method: 'post' }).then(response => response.json())
}

module.exports = {
  get,
  remove,
  post,
}
