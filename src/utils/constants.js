export { validateConfig, popupsConfig, popupEditConfig, popupAddConfig, imagePreviewConfig, cardConfig };

const validateConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorMessageEmptyInput: 'Вы пропустили это поле.',
  errorMessageEmptyUrl: 'Введите адрес сайта.',
  inputUrlClass: 'form__input_type_url'
};

const popupsConfig = {
  popups: document.querySelectorAll('.popup'),
  buttonClosePopup: 'popup__close',
  buttonCloseModal: document.querySelector('.popup__button'),
  popupOpened: 'popup_opened'
};

const popupAddConfig = {
  popupAdd: document.querySelector('.popup_type_add'),
  formAdd: document.querySelector('.form_type_add'),
  closePopupAdd: document.querySelector('.popup__close_type_add'),
  addButton: document.querySelector('.profile__add'),
  inputPlace: document.querySelector('.form__input_type_name'),
  inputSource: document.querySelector('.form__input_type_url')
};

const popupEditConfig = {
  editPopup: document.querySelector('.popup_type_edit'),
  nameInput: document.querySelector('input[name="name"]'),
  jobInput: document.querySelector('input[name="job"]'),
  formEdit: document.querySelector('.form_type_edit'),
  editBtn: document.querySelector('.profile__about-edit'),
  nameInfo: document.querySelector('.profile__about-name'),
  jobInfo: document.querySelector('.profile__about-caption')
};

const imagePreviewConfig = {
  photoModal: document.querySelector('.popup_type_photo'),
  photoImage: document.querySelector('.popup__image'),
  altModal: document.querySelector('.popup__title')
};

const cardConfig = {
  elementImage: ('.element__image'),
  elementTitle: ('.element__title'),
  elementLike: ('.element__button-like'),
  elementDel: ('.element__button-delete'),
  elementsContainer: document.querySelector('.elements')
};