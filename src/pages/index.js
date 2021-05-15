import { initialCards } from '../utils/initial-сards.js';
import { validateConfig, popupEditConfig, popupAddConfig, imagePreviewConfig, cardConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidate } from '../components/FormValidate.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import  { PopupWithImage } from '../components/PopupWithImage.js';
import  { PopupWithForm } from '../components/PopupWithForm.js';

import './index.css';

const formEditValidate = new FormValidate(validateConfig, popupEditConfig.editPopup);
formEditValidate.enableValidation();
const formAddValidate = new FormValidate(validateConfig, popupAddConfig.popupAdd);
formAddValidate.enableValidation();

const userInfo = new UserInfo(popupEditConfig.nameInfo, popupEditConfig.jobInfo);

const popupImage = new PopupWithImage(imagePreviewConfig.photoModal);

const popupAdd = new PopupWithForm(popupAddConfig.popupAdd, {
  submitHandler: (data) => {
    const element = createCard({
      name: data.place,
      link: data.link
    })
    renderList.addItem(element, 'prepend');
    popupAdd.close();
  }
});

const popupEdit = new PopupWithForm(popupEditConfig.editPopup, {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  }
});

const renderList = new Section( {
  items: initialCards,
  renderer: (item) => {
    const newElement = createCard(item);
    renderList.addItem(newElement, 'append');
  }}, '.elements');

function createCard(item) {
  const element = new Card(item, {
    handlePreviewImage: (link, alt) => {
      popupImage.open({link, alt});
    }
  }, cardConfig, '#template-element');
  const card = element.generateCard();
  return card;
}

function handlePopupAdd() {
  formAddValidate.clearValidationState();
  popupAdd.open();
}

function handlePopupEdit() {
  const profileInfo = userInfo.getUserInfo();
  popupEditConfig.nameInput.value = profileInfo.name;
  popupEditConfig.jobInput.value = profileInfo.job;
  formEditValidate.clearValidationState();
  popupEdit.open();
}

popupAddConfig.addButton.addEventListener('click', handlePopupAdd);
popupEditConfig.editBtn.addEventListener('click', handlePopupEdit);

renderList.renderItems();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupImage.setEventListeners();