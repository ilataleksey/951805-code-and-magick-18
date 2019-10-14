'use strict';

var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizardCount = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var wizardCoat = userDialog.querySelector('.wizard-coat');
var coatColorInput = userDialog.querySelector('input[name=coat-color]');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    closePopup();
  }
};

setupOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function (evt) {
  evt.preventDefault();
  wizardCoat.style.fill = getRandomValue(coatColors);
  coatColorInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function (evt) {
  evt.preventDefault();
  wizardEyes.style.fill = getRandomValue(eyesColors);
  eyesColorInput.value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function (evt) {
  evt.preventDefault();
  wizardFireball.style.backgroundColor = getRandomValue(fireballColors);
  fireballColorInput.value = wizardFireball.style.backgroundColor;
});

var userNameInput = document.querySelector('.setup-user-name');

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

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscPressHandler);
});

userNameInput.addEventListener('focusout', function () {
  document.addEventListener('keydown', popupEscPressHandler);
});

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
