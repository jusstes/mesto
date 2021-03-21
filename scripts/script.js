let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('input[name="name"]');
let jobInput = popup.querySelector('input[name="job"]');
let closeBtn = popup.querySelector('.popup__close');
let editBtn = document.querySelector('.profile__about-edit');
let nameInfo = document.querySelector('.profile__about-name');
let jobInfo = document.querySelector('.profile__about-caption');
let likes = document.querySelectorAll('.element__button-like');
let addBtn = document.querySelector('.profile__add');
let delBtn = document.querySelector('.element__button-delete');


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

for (let i = 0; i < likes.length; i++) {
  likes[i].addEventListener('click', function () {
    likes[i].classList.toggle('element__button-like_active');
  });
}

const initialCards = [
  {
    name: 'Эгейское море',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/markos-mant-unsplash.jpg'
  },
  {
    name: 'Сибирь',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/vadim-sadovski-unsplash.jpg'
  },
  {
    name: 'Домбай',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/kirill-pershin-unsplash.jpg'
  },
  {
    name: 'Сидней',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/ivan-tsaregorodtsev-unsplash.jpg'
  }
  ,
  {
    name: 'Лондон',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/watcharlie-unsplash.jpg'
  }
  ,
  {
    name: 'Калифорния',
    link: 'https://raw.githubusercontent.com/jusstes/mesto/main/images/logan-weaver-unsplash.jpg'
  }
]