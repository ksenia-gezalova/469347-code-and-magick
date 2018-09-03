'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, .7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_WIDTH, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_WIDTH, CLOUD_Y + 5 * GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - FONT_GAP - GAP - Math.floor((barHeight * times[i] / maxTime)));

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgb(0, 0, ' + Math.floor(Math.random() * 255) + ')';
    }
    ctx.fillRect(CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - GAP - Math.floor((barHeight * times[i] / maxTime)), BAR_WIDTH, Math.floor((barHeight * times[i] / maxTime)));
  }
}
