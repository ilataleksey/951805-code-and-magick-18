'use strict';

(function () {
  window.getRandomValue = function (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  };
})();
