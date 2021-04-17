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

const showInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  setCustomError(formElement, inputElement, validateConfig);
  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.classList.add(validateConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(validateConfig.errorClass);
  inputElement.classList.remove(validateConfig.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, validateConfig) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validateConfig);
  } else {
      showInputError(formElement, inputElement, validateConfig);
    }
};

const setEventListeners = (formElement, validateConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, validateConfig);
      checkInputValidity(formElement, inputElement, validateConfig);
    });
  });
};

const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, validateConfig);
  });
};

const clearValidationState = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, validateConfig);
    });
    const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validateConfig);
  });
};

function toggleButtonState(inputList, buttonElement, validateConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
  } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function setCustomError(formElement, inputElement, validateConfig) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (inputElement.classList.contains(validateConfig.inputUrlClass)) {
    errorElement.textContent = validateConfig.errorMessageEmptyUrl;
  }
  else if (!inputElement.value.length <= 0) {
    errorElement.textContent = inputElement.validationMessage;
  }
  else {
    errorElement.textContent = validateConfig.errorMessageEmptyInput;
  }
}

enableValidation(validateConfig);