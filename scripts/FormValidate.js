export class FormValidate {
  constructor(validateConfig, formElement) {
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(validateConfig.inputSelector));
    this._submitButtonSelector = this._form.querySelector(validateConfig.submitButtonSelector);
    this._inactiveButtonClass = validateConfig.inactiveButtonClass;
    this._inputErrorClass = validateConfig.inputErrorClass;
    this._errorClass = validateConfig.errorClass;
    this._errorMessageEmptyInput = validateConfig.errorMessageEmptyInput;
    this._errorMessageEmptyUrl = validateConfig.errorMessageEmptyUrl;
    this._inputUrlClass = validateConfig.inputUrlClass;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._setCustomError(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.setAttribute('disabled', true);
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonSelector.removeAttribute('disabled');
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _setCustomError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains(this._inputUrlClass)) {
      errorElement.textContent = this._errorMessageEmptyUrl;
    }
    else if (!inputElement.value.length <= 0) {
      errorElement.textContent = inputElement.validationMessage;
    }
    else {
      errorElement.textContent = this._errorMessageEmptyInput;
    }
  }

  enableValidation() {
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
    this._setEventListeners();
    this._toggleButtonState();
  }
}