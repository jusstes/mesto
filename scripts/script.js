const editPopup = document.querySelector('.popup_type_edit');
const photoModal = document.querySelector('.popup_type_photo')
const photoImage = photoModal.querySelector('.popup__image');
const btnCloseModal = photoModal.querySelector('.popup__button');
const altModal = photoModal.querySelector('.popup__title');
const closeBtn = editPopup.querySelector('.popup__close');
const popupAdd = document.querySelector('.popup_type_add');
const closePopupAdd = document.querySelector('.popup__close_type_add');

const nameInput = editPopup.querySelector('input[name="name"]');
const jobInput = editPopup.querySelector('input[name="job"]');

const addBtn = document.querySelector('.profile__add');
const editBtn = document.querySelector('.profile__about-edit');
const nameInfo = document.querySelector('.profile__about-name');
const jobInfo = document.querySelector('.profile__about-caption');

const formEdit = editPopup.querySelector('.form_type_edit');
const formAdd = popupAdd.querySelector('.form_type_add');
const inputPlace = popupAdd.querySelector('.form__input_type_name');
const inputSource = popupAdd.querySelector('.form__input_type_url');

const elementsContainer = document.querySelector('.elements');

const popups = document.querySelectorAll('.popup');

function closePopupByClick() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if(evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    })
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handlePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  clearValidationState(validateConfig);
  openPopup(editPopup);
}

function handlePopupAdd() {
  formAdd.reset();
  clearValidationState(validateConfig);
  openPopup(popupAdd)
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  clearValidationState(validateConfig);
  closePopup(editPopup);
}

function createCard(item) {
  const templateEl = document.querySelector('#template-element').content;
  const newElement = templateEl.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');
  const elementLike = newElement.querySelector('.element__button-like');
  const elementDel = newElement.querySelector('.element__button-delete');

  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  elementDel.addEventListener('click', handleDeleteCard);
  elementLike.addEventListener('click', handleLikeCard);
  elementImage.addEventListener('click', () => handlePreviewImage(item.link, item.name));

  return newElement;
}

function handleDeleteCard(evt) {
  evt.target.closest('.element').remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function renderList() {
  const result = initialCards.map(item => {
    const newElement = createCard(item);
    return newElement;
  });
  elementsContainer.append(...result);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const element = createCard({name: inputPlace.value, link: inputSource.value});
  elementsContainer.prepend(element);
  closePopup(popupAdd);
  formAdd.reset();
}

function handlePreviewImage(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  altModal.textContent = alt;
  openPopup(photoModal);
}

renderList();

document.addEventListener('click', closePopupByClick);
editBtn.addEventListener('click', handlePopupEdit);
addBtn.addEventListener('click', handlePopupAdd);
formAdd.addEventListener('submit', handleAddCardFormSubmit);
formEdit.addEventListener('submit', handleProfileSubmit);