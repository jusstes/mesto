import {cardConfig} from "../utils/constants";

export class Card {
  constructor({name, link, likes, owner, _id}, {
    handlePreviewImage,
    handleDeleteCard,
    toggleLike
  }, cardConfig, templateSelector, userId) {
    this._templateElement = document.querySelector(templateSelector);
    this._element = this._getTemplate();
    this._image = link;
    this._title = name;
    this._cardImage = cardConfig.elementImage;
    this._cardTitle = cardConfig.elementTitle;
    this._cardLike = cardConfig.elementLike;
    this._cardDel = cardConfig.elementDel;
    this._handlePreviewImage = handlePreviewImage;
    this._likes = likes;
    this._idElement = _id;
    this._owner = owner._id;
    this._userId = userId;
    this._openPopupDelete = handleDeleteCard;
    this._toggleLike = toggleLike;
    this._likeCounter = this._element.querySelector(cardConfig.likeCounter)
  }

  _setEventListeners() {
    this._element.querySelector(this._cardDel).addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector(this._cardLike).addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector(this._cardImage).addEventListener('click', () => this._handlePreviewImage(this._image, this._title));
  }

  _handleDeleteCard() {
    this._openPopupDelete(this._element);
  }

  _handleLikeCard() {
    this._toggleLike(this._element);
  }

  _getTemplate() {
    const newElement = this._templateElement.content.children[0].cloneNode(true);
    return newElement;
  }

  removeLike(cardId, likes) {
    cardId.querySelector(cardConfig.elementLike).classList.remove(cardConfig.LikeActive);
    cardId.querySelector(cardConfig.likeCounter).textContent = likes.length;
  }

  addLike(cardId, likes) {
    cardId.querySelector(cardConfig.elementLike).classList.add(cardConfig.LikeActive);
    cardId.querySelector(cardConfig.likeCounter).textContent = likes.length;
  }

  generateCard() {
    this._setEventListeners();
    this._element.querySelector(this._cardImage).src = this._image;
    this._element.querySelector(this._cardImage).alt = this._title;
    this._element.querySelector(this._cardTitle).textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    this._element.id = this._idElement;
    if (this._userId === this._owner) {
      this._element.querySelector(this._cardDel).classList.add(cardConfig.elementDelVisible);
    }
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._element.querySelector(this._cardLike).classList.add(cardConfig.LikeActive);
      }
    })
    return this._element;
  }
}