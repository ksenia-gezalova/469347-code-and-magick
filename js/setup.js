'use strict';

/* Init consts */
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

/* Generate random attributes for wizards - name, coat color and eyes color */
var generateRandomName = function (names, surnames) {
  for (var j = 0; j < names.length && j < surnames.length; j++) {
    var randomName = Math.floor(Math.random() * names.length);
    var randomSurname = Math.floor(Math.random() * surnames.length);
    var fullName = names[randomName] + ' ' + surnames[randomSurname];
  }
  return fullName;
};

var generateRandomCoatColor = function (coatsColor) {
  for (var j = 0; j < coatsColor.length; j++) {
    var randomIndex = Math.floor(Math.random() * coatsColor.length);
    var randomCoatColor = coatsColor[randomIndex];
  }
  return randomCoatColor;
};

var generateRandomEyesColor = function (eyesColor) {
  for (var j = 0; j < eyesColor.length; j++) {
    var randomIndex = Math.floor(Math.random() * eyesColor.length);
    var randomEyesColor = eyesColor[randomIndex];
  }
  return randomEyesColor;
};

/* Create wizard's array of objects */
var wizards = [];
for (var w = 0; w < WIZARDS_AMOUNT; w++) {
  wizards.push({'name': generateRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    'coatColor': generateRandomCoatColor(WIZARD_COATS), 'eyesColor': generateRandomEyesColor(WIZARD_EYES)});
}
console.log(wizards);


/* Show setup window */
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/* Render wizard */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/* Put wizards in fragment and render it in the same time*/
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


