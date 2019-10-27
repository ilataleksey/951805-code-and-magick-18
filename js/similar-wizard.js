'use strict';

window.similarWizard = (function () {
  var WIZARDCOUNT = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  window.getHeros = function (arrNames, arrSurnames, arrCoatColors, arrEyesColors) {
    var heros = [];
    for (var i = 0; i < WIZARDCOUNT; i++) {
      var hero = {
        name: window.getRandomValue(arrNames) + ' ' + window.getRandomValue(arrSurnames),
        coatColor: window.getRandomValue(arrCoatColors),
        eyesColor: window.getRandomValue(arrEyesColors)
      };
      heros.push(hero);
    }
    return heros;
  };

  var wizards = window.getHeros(window.util.NAMES, window.util.SURNAMES, window.util.COATCOLORS, window.util.EYESCOLORS);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = (wizard.coatColor);
    wizardElement.querySelector('.wizard-eyes').style.fill = (wizard.eyesColor);

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDCOUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

})();
