const validateConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disable',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_active'
};

// {inputElement}, formElement?

const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, validateConfig) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(validateConfig.inactiveButtonClass);
  } else {
      buttonElement.classList.remove(validateConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validateConfig.errorClass);
  inputElement.classList.add(validateConfig.inputErrorClass);
};

const hideInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(validateConfig.errorClass);
  inputElement.classList.remove(validateConfig.inputErrorClass);
};

const checkInput = (formElement, inputElement, validateConfig) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validateConfig);
  } else {
    showInputError(formElement, inputElement, validateConfig);
  }
};

const setInputListeners = (formElement, validateConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
  
  inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
          checkInput(formElement, inputElement, validateConfig);
          toggleButtonState(inputList, buttonElement, validateConfig);
      });
      toggleButtonState(inputList, buttonElement, validateConfig);
  });
};

const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  
  formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => evt.preventDefault());
      setInputListeners(formElement, validateConfig);
  }
  );
};

enableValidation(validateConfig);

const clearValidation = (validateConfig) => {
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