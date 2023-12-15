// reskinned Whack-A-Mole Game Created by Scott Zastrow
Marquee3k.init();

var score = 0;
var gameOver = false;
var lastHole = 0;
var lastMole = 0;
var timer = 0;

$(function () {
  $('#start').click(StartGame);
  $('.gamewrap').on('click', '.mole', WackaMole);
});

function WackaMole() {
  $(this).parent().find('img').show();
  $(this).hide();
  $(this).parent().find('img').fadeOut(1000);

  score++;
  var stringScore = score.toString();
  stringScore = stringScore.padStart(2, '0');
  $('.score').text(stringScore);
}

function StartGame() {
  $('.gamewrap').removeClass('hidden');
  $('#start').hide();
  $('.splashwrap').hide();
  gameOver = false;
  $('.message').html('');
  //gameboard
  MakeGameBoard();
  score = 0;
  $('.score').text('00');

  //start gameplay
  StartMoles();

  //timer
  setTimeout(function () {
    return EndGame();
  }, 30000);
}

function StartMoles() {
  var popUp = $('.hole_' + RandomHole() + '>.mole');
  timer = Math.round(Math.random() * 1000) + 600;
  popUp.show();
  //Pop Up
  popUp.animate(
    {
      bottom: '45%',
      height: '10svh',
    },
    200,
  );

  //Pop Down
  setTimeout(function () {
    popUp.animate(
      {
        bottom: '0px',
        height: '2svh',
      },
      200,
    );
    if (!gameOver) {
      StartMoles();
    }
  }, timer);
}

function RandomHole() {
  var hole = 1 + Math.floor(Math.random() * $('.hole').length);
  if (hole == lastHole) {
    return RandomHole();
  }
  lastHole = hole;
  //console.log('Random Hole: ' + hole)
  return hole;
}

function RandomMole() {
  var mole = 1 + Math.floor(Math.random() * 2);
  if (mole == lastMole) {
    return RandomMole();
  }
  lastMole = mole;

  return mole;
}

function changeMole() {
  RandomMole();

  for (var i = 0; i < 9; i++) {
    $('.mole.mole_' + i).css({
      backgroundImage: 'url(/assets/images/vole' + RandomMole() + '.png)',
    });
  }
}

function MakeGameBoard() {
  var moles = 12;
  var html = '';

  for (var mole = 1; mole < moles + 1; mole++) {
    html +=
      '<div class= "hole hole_' +
      mole +
      '"><img src="/assets/images/wack2.png" class="wack"><div class="molehill molehill_' +
      mole +
      '" style="background-image: url(/assets/images/hill_1.png)">';
    html +=
      '</div><div class= "mole mole_' +
      mole +
      '"></div></div></div><!--end_hole_' +
      mole +
      '-->';
  }

  $('.gamewrap').html(html);
}

function blink_text() {
  $('.message').fadeOut(300);
  $('.message').fadeIn(300);
}
setInterval(blink_text, 1000);

function EndGame() {
  gameOver = true;
  blink_text();
  setTimeout(function () {
    $('.message').html('Game Over');
    $('#start').show();
  }, timer + 500);
}
