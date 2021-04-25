export class Card {
  constructor(item, handlePreviewImage, cardConfig, templateSelector) {
    this._templateSelector = document.querySelector(templateSelector); 
    this._image = item.link;
    this._title = item.name;
    this._cardImage = cardConfig.elementImage;
    this._cardTitle = cardConfig.elementTitle;
    this._cardLike = cardConfig.elementLike;
    this._cardDel = cardConfig.elementDel;
    this._handlePreviewImage = handlePreviewImage;    
  }

  _setEventListeners() {
    this._element.querySelector(this._cardDel).addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector(this._cardLike).addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector(this._cardImage).addEventListener('click', () => this._handlePreviewImage(this._image, this._title));
  }
  
  _handleDeleteCard() {
    this._element.remove();
  }
  
  _handleLikeCard() {
    this._element.querySelector(this._cardLike).classList.toggle('element__button-like_active');
  }
  
  _getTemplate() {
    const newElement = this._templateSelector.content.children[0].cloneNode(true);
    return newElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(this._cardImage).src = this._image;
    this._element.querySelector(this._cardImage).alt = this._title;
    this._element.querySelector(this._cardTitle).textContent = this._title;
    return this._element;
  }
}