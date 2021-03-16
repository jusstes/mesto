let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
let closeBtn = popup.querySelector('.popup__close');
let editBtn = document.querySelector('.profile__about-edit');
// Вами предлагается поиск по атрибуту name. Это
// getElementsByTagName? насколько часто он используется в работе?
let name = document.querySelector('.profile__about-name');
let job = document.querySelector('.profile__about-caption');

editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose();
}