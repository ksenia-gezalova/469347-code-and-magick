'use strict';

(function () {
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_AMOUNT = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardSetup = document.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardCoatValue = document.querySelector('[name="coat-color"]');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesValue = document.querySelector('[name="eyes-color"]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballValue = document.querySelector('[name="fireball-color"]');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.util.getRandomElement(WIZARD_COATS);
    wizardCoat.style.fill = coatColor;
    wizardCoatValue.value = coatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var eyesColor = window.util.getRandomElement(WIZARD_EYES);
    wizardEyes.style.fill = eyesColor;
    wizardEyesValue.value = eyesColor;
  });

  fireball.addEventListener('click', function () {
    var fireballColor = window.util.getRandomElement(FIREBALL_COLORS);
    fireball.style.background = fireballColor;
    fireballValue.value = fireballColor;
  });

  // обработка успешного запроса
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  // обработка ошибок при запросе
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.setup = {
    renderWizard: renderWizard
  };
})();
