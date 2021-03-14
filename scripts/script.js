let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let editBtn = document.querySelector('.profile__about-edit');
let closeBtn = document.querySelector('.popup__close');
let name = document.querySelector('.profile__about-name');
let job  = document.querySelector('.profile__about-caption');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

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

// навеяно вебинаром. не заставите убирать? :)

let liked = document.querySelectorAll('.element__button-like');

for (let i = 0; i < liked.length; i++ ) {
  liked[i].addEventListener('click', function() {
  liked[i].classList.toggle('element__button-like_active');
  });
}
