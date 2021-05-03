import { initialCards } from '../scripts/initial-сards.js';
import { validateConfig, popupsConfig, popupEditConfig, popupAddConfig, imagePreviewConfig, cardConfig } from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidate } from '../scripts/FormValidate.js';
import './index.css';

const formEditValidate = new FormValidate(validateConfig, popupEditConfig.editPopup);
formEditValidate.enableValidation();
const formAddValidate = new FormValidate(validateConfig, popupAddConfig.popupAdd);
formAddValidate.enableValidation();

function openPopup(popup) {
  popup.classList.add(popupsConfig.popupOpened);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove(popupsConfig.popupOpened);
  document.removeEventListener('keydown', closePopupByEsc);
}

(function closePopupByClick() {
  popupsConfig.popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains(popupsConfig.popupOpened)) {
        closePopup(popup);
      }
      if(evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    })
  })
})();

function closePopupByEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handlePopupEdit() {
  popupEditConfig.nameInput.value = popupEditConfig.nameInfo.textContent;
  popupEditConfig.jobInput.value = popupEditConfig.jobInfo.textContent;
  formEditValidate.clearValidationState();
  openPopup(popupEditConfig.editPopup);
}

function handlePopupAdd() {
  popupAddConfig.formAdd.reset();
  formAddValidate.clearValidationState();
  openPopup(popupAddConfig.popupAdd)
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  popupEditConfig.nameInfo.textContent = popupEditConfig.nameInput.value;
  popupEditConfig.jobInfo.textContent = popupEditConfig.jobInput.value;
  closePopup(popupEditConfig.editPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const element = createCard({name: popupAddConfig.inputPlace.value, link: popupAddConfig.inputSource.value});
  cardConfig.elementsContainer.prepend(element);
  closePopup(popupAddConfig.popupAdd);
}

function handlePreviewImage(link, alt) {
  imagePreviewConfig.photoImage.src = link;
  imagePreviewConfig.photoImage.alt = alt;
  imagePreviewConfig.altModal.textContent = alt;
  openPopup(imagePreviewConfig.photoModal);
}

function createCard(item) {
  const element = new Card(item, handlePreviewImage, cardConfig, '#template-element');
  const card = element.generateCard();
  return card;
}

(function renderList() {
  initialCards.forEach((item) => {
    const newElement = createCard(item);
    cardConfig.elementsContainer.append(newElement);
  })
})();

popupAddConfig.addButton.addEventListener('click', handlePopupAdd);
popupAddConfig.formAdd.addEventListener('submit', handleAddCardFormSubmit);
popupEditConfig.formEdit.addEventListener('submit', handleProfileSubmit);
popupEditConfig.editBtn.addEventListener('click', handlePopupEdit);