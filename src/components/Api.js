export class Api {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _getResponseData(result) {
    if(!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    })
      .then(result => this._getResponseData(result))
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    })
      .then(result => this._getResponseData(result))
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
      .then(result => this._getResponseData(result))
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
      .then(result => this._getResponseData(result))
  }

  updateAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(result => this._getResponseData(result))
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => this._getResponseData(result))
  }

  addLikeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(result => this._getResponseData(result))
  }

  removeLikeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => this._getResponseData(result))
  }
}