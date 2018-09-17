'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizards = [];
var userDialog = document.querySelector('.setup');
var userOpen = document.querySelector('.setup-open');
var userClose = document.querySelector('.setup-close');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var userNameInput = userDialog.querySelector('.setup-user-name');
var userSubmit = userDialog.querySelector('.setup-submit');
var userForm = userDialog.querySelector('.setup-wizard-form');
var wizardSetup = document.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardCoatValue = document.querySelector('[name="coat-color"]');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardEyesValue = document.querySelector('[name="eyes-color"]');
var fireball = document.querySelector('.setup-fireball-wrap');
var fireballValue = document.querySelector('[name="fireball-color"]');


var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
};

for (var w = 0; w < WIZARDS_AMOUNT; w++) {
  wizards.push({'name': getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
    'coatColor': getRandomElement(WIZARD_COATS), 'eyesColor': getRandomElement(WIZARD_EYES)});
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

userOpen.addEventListener('click', function () {
  openPopup();
});

userOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userOpen.addEventListener('focus', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userClose.addEventListener('click', function () {
  closePopup();
});

userClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userClose.addEventListener('focus', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    userNameInput.blur();
  }
});

userSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    userForm.submit();
  }
});

userSubmit.addEventListener('click', function () {
  userForm.submit();
});

wizardCoat.addEventListener('click', function () {
  var coatColor = getRandomElement(WIZARD_COATS);
  wizardCoat.style.fill = coatColor;
  wizardCoatValue.value = coatColor;
});

wizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomElement(WIZARD_EYES);
  wizardEyes.style.fill = eyesColor;
  wizardEyesValue.value = eyesColor;
});

fireball.addEventListener('click', function () {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  fireball.style.background = fireballColor;
  fireballValue.value = fireballColor;
});
