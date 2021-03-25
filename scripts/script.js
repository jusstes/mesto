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
];

const elementsContainer = document.querySelector('.elements');

function delElement(evt) {
  evt.target.closest('.element').remove();
}

function likeElement(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function createDomNode(item) {
  const templateEl = document.querySelector('#template-element').content;
  const newElement = templateEl.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');
  const elementLike = newElement.querySelector('.element__button-like');
  const elementDel = newElement.querySelector('.element__button-delete');

  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  elementDel.addEventListener('click', delElement);
  elementLike.addEventListener('click', likeElement);

  return newElement;
}

function renderList() {
  const result = initialCards.map(item => {
    const newElement = createDomNode(item);
    return newElement;
  });
  elementsContainer.append(...result);
}

// дописать добавление карточки сюда

renderList();