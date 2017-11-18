$(function () {
  var timer, counter, timerID, startID;
  var timeBoard = $('#time')[0];
  var stepBoard = $('#stepnum')[0];
  var infoBar = $('#info')[0];
  var winPart = $('#part15');
  var award = $('#award')[0];
  var puzzleMap = new Array();
  var solveMap = new Array();
  var solveQueue = new Array();
  var solvePos = [3, 3];
  var puzzles = $('puzzle');
  var difficulty = 10;
  var blankPos = [3, 3];
  var isStart = false;
  var puzzleNum = 0;
  for (var i = 0; i < 4; ++i) {
    puzzleMap[i] = new Array();
    solveMap[i] = new Array();
    for (var t = 0; t < 4; ++t) {
      puzzleMap[i][t] = i * 4 + t + '';
    }
  }
  puzzleMap[3][3] = '#';

  function availableCheck(num) {
    if (blankPos[0] > 0) {
      if (puzzleMap[blankPos[0] - 1][blankPos[1]] == num)
        return 1;
    }
    if (blankPos[1] > 0) {
      if (puzzleMap[blankPos[0]][blankPos[1] - 1] == num)
        return 2;
    }
    if (blankPos[0] < 3) {
      if (puzzleMap[blankPos[0] + 1][blankPos[1]] == num)
        return 3;
    }
    if (blankPos[1] < 3) {
      if (puzzleMap[blankPos[0]][blankPos[1] + 1] == num)
        return 4;
    }
    return 0;
  }

  function Timer() {
    if (timerID) {
      clearInterval(timerID);
      timeBoard.textContent = 0;
    }
    timer = 0;
    timerID = setInterval(() => {
      timeBoard.textContent = ++timer;
    }, 1000);
  }

  function pass() {
    for (var i = 0; i < 4; ++i) {
      for (var t = 0; t < 4; ++t) {
        if (i == 3 && t == 3)
          break;
        if (puzzleMap[i][t] != i * 4 + t + '')
          return false;
      }
    }
    return true;
  }

  $('body').keydown(function(event){
    switch(event.which) {
      case 37: case 65:
        if (blankPos[1] == 0)
          return;
        moveEvent.call($('.row' + blankPos[0] +
        '.col' + (blankPos[1] - 1))[0]);
      break;
      
      case 38: case 87:
        if (blankPos[0] == 0)
          return;
        moveEvent.call($('.row' + (blankPos[0] - 1) +
        '.col' + blankPos[1])[0]);
      break;

      case 39: case 68:
        if (blankPos[1] == 3)
          return;
        moveEvent.call($('.row' + blankPos[0] +
        '.col' + (blankPos[1] + 1))[0]);
      break;

      case 40: case 83:
        if (blankPos[0] == 3)
          return;
        moveEvent.call($('.row' + (blankPos[0] + 1) +
        '.col' + blankPos[1])[0]);
      break;

      case 13:
        $('#start').trigger('click');
      break;
      
      default:
      break;
    }
  });

  function moveEvent() {
    if (!isStart)
      return;
    var statu = availableCheck(this.id.substr(4));
    switch (statu) {
      case 1:
        this.className = 'puzzle' + puzzleNum + ' puzzle row' + blankPos[0] + " col" + blankPos[1];
        swap(blankPos[0], blankPos[1], blankPos[0] - 1, blankPos[1]);
        blankPos[0] -= 1;
        break;
      case 2:
        this.className = 'puzzle' + puzzleNum + ' puzzle row' + blankPos[0] + " col" + blankPos[1];
        swap(blankPos[0], blankPos[1], blankPos[0], blankPos[1] - 1);
        blankPos[1] -= 1;
        break;
      case 3:
        this.className = 'puzzle' + puzzleNum + ' puzzle row' + blankPos[0] + " col" + blankPos[1];
        swap(blankPos[0], blankPos[1], blankPos[0] + 1, blankPos[1]);
        blankPos[0] += 1;
        break;
      case 4:
        this.className = 'puzzle' + puzzleNum + ' puzzle row' + blankPos[0] + " col" + blankPos[1];
        swap(blankPos[0], blankPos[1], blankPos[0], blankPos[1] + 1);
        blankPos[1] += 1;
        break;
      default:
        return;
    }
    if (statu != 0) {
      stepBoard.textContent = ++counter;
      if (pass()) {
        infoBar.className = "hidden";
        if (startID != undefined)
          clearTimeout(startID);
        startID = setTimeout(() => {
          infoBar.textContent = "You Win!";
          infoBar.className = "shown";
          startID = undefined;
        }, 800);
        isStart = false;
        $('.stop').removeClass('stop');
        if (difficulty >= 20) {
          ++puzzleNum;
          puzzleNum %= 3;
          if (award.currentSrc == "")
            award.src = '../music/bgmusic.mp3';
          $('#bg').removeClass('hidden').addClass('shown');
          var i = 0, timeID;
          $('#part' + i).addClass('winner');
          timeID = setInterval(() => {
            $('#part' + ++i).addClass('winner');
            if (i == 14) {
              clearInterval(timeID);
              setTimeout(() => {
                $('#part15').removeClass('hidden')
                  .addClass('shown').addClass('winner');
              }, 80);
            }
          }, 80);
        }
        clearInterval(timerID);
      }
    }
  }

  $('.puzzle').click(moveEvent);

  $('#start').click(function () {
    blankPos = [3, 3];
    initMap();
    Timer();
    winPart[0].className = 'row3 col3 hidden puzzle' + puzzleNum;
    infoBar.className = "hidden";
    if (startID != undefined)
      clearTimeout(startID);
    startID = setTimeout(()=>{
      infoBar.textContent = "Game Start!";
      infoBar.className = "shown";
      startID = undefined;
    }, 800);
    counter = 0;
    stepBoard.textContent = 0;
    isStart = false;
    var steps = $('.input__field')[0].value;
    if (steps == "") {
      $('.start').removeClass('stop');
      difficulty = 10;
      randomSteps(10);
    }
    else {
      if (isNaN(steps) || steps <= 0) {
        alert('Please type in a positive number!');
        refresh();
        clearInterval(timerID);
        if (startID != undefined)
          clearTimeout(startID);
        $('.start').removeClass('stop');
        infoBar.textContent = "Puzzle Game";
        infoBar.className = "shown";
        isStart = false;
        return;
      }
      if (steps > 10000) {
        alert('It will be to hard for you! Decrease your number to less than 10000!');
        refresh();
        clearInterval(timerID);
        if (startID != undefined)
          clearTimeout(startID);
        $('.start').removeClass('stop');
        infoBar.textContent = "Puzzle Game";
        infoBar.className = "shown";
        isStart = false;
        return;
      }
      $('.start').removeClass('stop');
      difficulty = steps;
      randomSteps(steps);
    }
    refresh();
    isStart = true;
    console.log('gamestart!');
    this.className = "start stop"
  });

  function initMap() {
    for (var i = 0; i < 4; ++i) {
      for (var t = 0; t < 4; ++t) {
        puzzleMap[i][t] = i * 4 + t + '';
      }
    }
    puzzleMap[3][3] = '#';
  }

  function refresh() {
    var num;
    for (var i = 0; i < 4; ++i) {
      for (var t = 0; t < 4; ++t) {
        num = puzzleMap[i][t];
        if (num != '#') {
          document.getElementById('part' + num).className =
            'puzzle' + puzzleNum + ' puzzle row' + i + ' col' + t;
        }
      }
    }
  }

  function swap(x1, y1, x2, y2) {
    var temp = puzzleMap[x1][y1];
    puzzleMap[x1][y1] = puzzleMap[x2][y2];
    puzzleMap[x2][y2] = temp;
  }

  function randomSteps(steps) {
    for (var i = 0; i < steps; ++i) {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          if (blankPos[1] == 3) {
            --i;
            break;
          }
          swap(blankPos[0], blankPos[1] + 1,
            blankPos[0], blankPos[1]);
          blankPos[1] += 1;
          solveQueue[i] = 1;
          break;

        case 1:
          if (blankPos[1] == 0) {
            --i;
            break;
          }
          swap(blankPos[0], blankPos[1] - 1,
            blankPos[0], blankPos[1]);
          blankPos[1] -= 1;
          solveQueue[i] = 0;
          break;

        case 2:
          if (blankPos[0] == 3) {
            --i;
            break;
          }
          swap(blankPos[0] + 1, blankPos[1],
            blankPos[0], blankPos[1]);
          blankPos[0] += 1;
          solveQueue[i] = 3;
          break;

        case 3:
          if (blankPos[0] == 0) {
            --i;
            break;
          }
          swap(blankPos[0] - 1, blankPos[1],
            blankPos[0], blankPos[1]);
          blankPos[0] -= 1;
          solveQueue[i] = 2;
          break;

        default:
          console.log('How can you come here?');
          break;
      }
    }

    if (pass()) {
      randomSteps(steps);
      return;
    }

    for (var i = 0; i < 4; ++i) {
      for (var t = 0; t < 4; ++t) {
        solveMap[i][t] = puzzleMap[i][t];
      }
    }
    solvePos[0] = blankPos[0];
    solvePos[1] = blankPos[1];
  }

  $('.solve').click(function () {
    if (!isStart) return;

    clearInterval(timerID);
    if (startID != undefined)
      clearTimeout(startID);
    $('.stop').removeClass('stop');
    setTimeout(() => { this.className = "start solve stop" },
      50);
    infoBar.textContent = "Solving for you...";
    infoBar.className = "shown";
    isStart = false;
    $('.stop').removeClass('stop');
    for (var i = 0; i < 4; ++i) {
      for (var t = 0; t < 4; ++t) {
        puzzleMap[i][t] = solveMap[i][t];
      }
    }
    blankPos[1] = solvePos[1];
    blankPos[0] = solvePos[0];
    refresh();
    var i = difficulty;
    timerID = setInterval(() => {
      switch (solveQueue[--i]) {
        case 0:
          swap(blankPos[0], blankPos[1] + 1,
            blankPos[0], blankPos[1]);
          blankPos[1] += 1;
          break;

        case 1:
          swap(blankPos[0], blankPos[1] - 1,
            blankPos[0], blankPos[1]);
          blankPos[1] -= 1;
          break;

        case 2:
          swap(blankPos[0] + 1, blankPos[1],
            blankPos[0], blankPos[1]);
          blankPos[0] += 1;
          break;

        case 3:
          swap(blankPos[0] - 1, blankPos[1],
            blankPos[0], blankPos[1]);
          blankPos[0] -= 1;
          break;

        default:
          console.log('How can you come here?');
          break;
      }
      refresh();
      if (i == 0) {
        $('.stop').removeClass('stop');
        clearInterval(timerID);
        timerID = setTimeout(() => {
          infoBar.textContent = "Solved";
          infoBar.className = "shown";
        }, 800);
        infoBar.className = "hidden";

      }
    }, (800 > (60000 / difficulty)) ? (60000 / difficulty) : 800);
  });

  $('.input__field').focus(function () {
    $('.input').addClass('input--filled');
  });

  $('.input__field').blur(function () {
    if (this.value == "") {
      $('.input').removeClass('input--filled');
    }
  });
});