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

var renderText = function (ctx, x, y, color, font, texts) {
  ctx.fillStyle = color;
  ctx.font = font;

  for (var i = 0; i < texts.length; i++) {
    ctx.fillText(texts[i], x, y + TEXT_WIDTH * i);
  }
};

var renderColumn = function (ctx, x, y, name, time, w, h) {
  ctx.fillText(name, x, y);
  ctx.fillRect(x, y - TEXT_WIDTH, w, h);
  ctx.fillText(time, x, y - TEXT_WIDTH - GAP + h);
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getColorForName = function (name) {
  return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(225, ' + getRandomInt(1, 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP * 4, '#000000', '16px, PT Mono', ['Ура вы победили!', 'Список результатов:']);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = getColorForName(names[i]);

    var statisticsX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = -(BAR_HEIGHT * times[i] / maxTime);

    renderColumn(ctx, statisticsX, CLOUD_HEIGHT, names[i], Math.round(times[i]), BAR_WIDTH, barHeight);
  }
};
