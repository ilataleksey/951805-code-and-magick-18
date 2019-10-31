'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var coatColorInput = userDialog.querySelector('input[name=coat-color]');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');

  window.colorize(wizardCoat, coatColorInput, window.util.COATCOLORS);
  window.colorize(wizardEyes, eyesColorInput, window.util.EYESCOLORS);
  window.colorize(wizardFireball, fireballColorInput, window.util.FIREBALLCOLORS);

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.backend.URL, new FormData(form), successSaveHandler, errorHandler);
  });

  var successLoadHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    var setupSimilar = document.querySelector('.setup-similar');
    setupSimilar.classList.remove('hidden');
  };

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

  var successSaveHandler = function () {
    userDialog.classList.add('hidden');
  };

  window.backend.load(window.backend.URL, successLoadHandler, errorHandler);

})();
