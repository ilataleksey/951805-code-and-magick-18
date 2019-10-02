'use strict';

var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardCount = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValue = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

var getHeros = function (arrNames, arrSurnames, arrCoatColors, arrEyesColors) {
  var heros = [];
  for (var i = 0; i < wizardCount; i++) {
    var hero = {
      name: getRandomValue(arrNames) + ' ' + getRandomValue(arrSurnames),
      coatColor: getRandomValue(arrCoatColors),
      eyesColor: getRandomValue(arrEyesColors)
    };
    heros.push(hero);
  }
  return heros;
};

var wizards = getHeros(names, surnames, coatColors, eyesColors);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = (wizard.coatColor);
  wizardElement.querySelector('.wizard-eyes').style.fill = (wizard.eyesColor);

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizardCount; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
