import {
  whileLoading,
  buttons,
  deletePopup,
  avatar,
  profile,
  validateConfig,
  popupEditConfig,
  popupAddConfig,
  imagePreviewConfig,
  cardConfig
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidate} from '../components/FormValidate.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';
import './index.css';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';

const formEditValidate = new FormValidate(validateConfig, popupEditConfig.editPopup);
formEditValidate.enableValidation();
const formAddValidate = new FormValidate(validateConfig, popupAddConfig.popupAdd);
formAddValidate.enableValidation();
const formAvatarValidate = new FormValidate(validateConfig, avatar)
formAvatarValidate.enableValidation();

const userInfo = new UserInfo(popupEditConfig.nameInfo, popupEditConfig.jobInfo, profile.image);

const popupImage = new PopupWithImage(imagePreviewConfig.photoModal);

const popupAdd = new PopupWithForm(popupAddConfig.popupAdd, {
  submitHandler: (data) => {
    buttons.add.textContent = 'Сохранение ...';
    api.addCard(data.place, data.link)
      .then(result => {
        const addCard = createCard(result);
        renderList.addItem(addCard, 'prepend');
        popupAdd.close();
      })
      .catch(result => console.log(`${result} при отправке карточки`))
      .finally(() => {
        buttons.add.textContent = 'Сохранить'
      })
  }
});

const popupEdit = new PopupWithForm(popupEditConfig.editPopup, {
  submitHandler: (data) => {
    buttons.edit.textContent = 'Сохранение ...';
    api.editUserData(data.name, data.about)
      .then(result => {
        userInfo.setUserInfo(result.name, result.about)
        popupEdit.close()
      })
      .catch(result => console.log(`${result} при отправке данных пользователя`))
      .finally(() => {
        buttons.edit.textContent = 'Сохранить'
      })
  }
});

const popupAvatar = new PopupWithForm(avatar, {
  submitHandler: (data => {
    buttons.avatar.textContent = 'Сохранение ...';
    api.updateAvatar(data.avatar)
      .then(result => {
        userInfo.setUserAvatar(result.avatar);
        popupAvatar.close();
      })
      .catch(result => console.log(`${result} при обновлении аватара пользователя`))
      .finally(() => {
        buttons.avatar.textContent = 'Сохранить'
      })
  })
})

const popupDelete = new PopupWithConfirm(deletePopup, {
  submitHandler: (cardId) => {
    buttons.delete.textContent = 'Удаление ...';
    api.deleteCard(popupDelete.cardId().id)
      .then(() => {
        popupDelete.cardId().remove();
        popupDelete.close();
      })
      .catch(result => console.log(`${result} при удалении фотографии`))
      .finally(() => {
        buttons.delete.textContent = 'Да'
      })
  }
})

const renderList = new Section({
  renderer: (item) => {
    const newElement = createCard(item);
    renderList.addItem(newElement, 'append');
  }
}, '.elements');

function createCard(item) {
  const userId = userInfo.getUserId()
  const element = new Card(item, {
    handlePreviewImage: (link, alt) => {
      popupImage.open({link, alt});
    },
    handleDeleteCard: (cardId) => {
      popupDelete.open(cardId)
    },
    toggleLike: (cardId) => {
      if (cardId.querySelector(cardConfig.elementLike).classList.contains(cardConfig.LikeActive)) {
        api.removeLikeCard(cardId.id)
          .then(result => element.removeLike(cardId, result.likes))
          .catch(result => console.log(`${result} при удалении лайка`))
      } else {
        api.addLikeCard(cardId.id)
          .then(result => element.addLike(cardId, result.likes))
          .catch(result => console.log(`${result} при удалении лайка`))
      }
    }
  }, cardConfig, '#template-element', userId);
  const card = element.generateCard();
  return card;
}

function handlePopupAdd() {
  formAddValidate.clearValidationState();
  popupAdd.open();
}

function handlePopupAvatar() {
  formAvatarValidate.clearValidationState();
  popupAvatar.open();
}

function handlePopupEdit() {
  const profileInfo = userInfo.getUserInfo();
  popupEditConfig.nameInput.value = profileInfo.name;
  popupEditConfig.jobInput.value = profileInfo.about;
  formEditValidate.clearValidationState();
  popupEdit.open();
}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'bee39071-754c-4935-a369-72c9b603883d',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserAvatar(userData.avatar);
    renderList.renderItems(cards)
    return renderList;
  })
  .catch(result => console.log(`${result} при загрузке данных`))
  .finally(function () {
    whileLoading.profile.style.display = 'flex';
    whileLoading.footer.style.display = 'flex';
    whileLoading.loading.style.display = 'none';
  })

profile.button.addEventListener('click', handlePopupAvatar);
popupAddConfig.addButton.addEventListener('click', handlePopupAdd);
popupEditConfig.editBtn.addEventListener('click', handlePopupEdit);

popupAvatar.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();