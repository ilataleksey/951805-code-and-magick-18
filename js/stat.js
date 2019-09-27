'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_WIDTH = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';

  ctx.font = '16px, PT Mono';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP * 4);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 4 + TEXT_WIDTH);

  var maxTime = getMaxElement(times);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(225, ' + getRandomInt(1, 100) + '%, 50%)';
    }

    var statisticsX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = -(BAR_HEIGHT * times[i] / maxTime);

    ctx.fillText(names[i], statisticsX, CLOUD_HEIGHT);
    ctx.fillRect(statisticsX, CLOUD_HEIGHT - TEXT_WIDTH, BAR_WIDTH, barHeight);
    ctx.fillText(Math.round(times[i]), statisticsX, CLOUD_HEIGHT - TEXT_WIDTH - GAP + barHeight);
  }
};
