'use strict';

(function () {

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
})();
