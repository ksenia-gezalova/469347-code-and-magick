'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
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

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

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
