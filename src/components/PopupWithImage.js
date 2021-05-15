import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open({link, alt}) {
    const photoImage = this._popup.querySelector('.popup__image');
    const altModal = this._popup.querySelector('.popup__title');
    photoImage.src = link;
    photoImage.alt = alt;
    altModal.textContent = alt;
    super.open();
  }
}