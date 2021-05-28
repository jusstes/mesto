export class Api {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  editUserData(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  addCard(place, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link
      })
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  updateAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  addLikeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
  .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  removeLikeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  .then(result => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }
}