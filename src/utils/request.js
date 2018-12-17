function get(url) {
  return fetch(url, { credentials: 'include' }).then(response => response.json())
}

module.exports = {
  get,
}
