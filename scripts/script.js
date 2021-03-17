let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('input[name="name"]');
let jobInput = popup.querySelector('input[name="job"]');
let closeBtn = popup.querySelector('.popup__close');
let editBtn = document.querySelector('.profile__about-edit');
let nameInfo = document.querySelector('.profile__about-name');
let jobInfo = document.querySelector('.profile__about-caption');

editBtn.addEventListener('click', popupToggle);
closeBtn.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

function popupToggle() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  popupToggle();
}
