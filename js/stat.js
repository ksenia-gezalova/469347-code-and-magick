'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 16;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var COLUMN_GAP = TEXT_WIDTH + BAR_WIDTH;
var CLOUD_GAP = CLOUD_X + TEXT_WIDTH;
var INDENT_X = CLOUD_X + GAP;
var INDENT_Y = CLOUD_Y + GAP;
var CLOUD_GAPS_AMOUNT = 3;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, INDENT_X, INDENT_Y, 'rgba(0, 0, 0, .7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_GAP, CLOUD_Y + FONT_HEIGHT + GAP);
  ctx.fillText(
      'Список результатов:',
      CLOUD_GAP,
      CLOUD_Y + FONT_HEIGHT + GAP * CLOUD_GAPS_AMOUNT
  );

  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_GAP + COLUMN_GAP * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_GAP + COLUMN_GAP * i,
        CLOUD_HEIGHT -
      GAP -
      FONT_HEIGHT -
      GAP -
      Math.floor((BAR_HEIGHT * times[i]) / maxTime)
    );

    ctx.fillStyle =
      players[i] === 'Вы' ?
        'rgba(255, 0, 0, 1)' :
        'rgb(0, 0, ' + Math.floor(Math.random() * 255) + ')';

    ctx.fillRect(
        CLOUD_GAP + COLUMN_GAP * i,
        CLOUD_HEIGHT -
      FONT_HEIGHT -
      GAP -
      Math.floor((BAR_HEIGHT * times[i]) / maxTime),
        BAR_WIDTH,
        Math.floor((BAR_HEIGHT * times[i]) / maxTime)
    );
  }
};
