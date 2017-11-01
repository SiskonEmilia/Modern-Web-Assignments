window.onload = function(){
  var startButton = document.getElementById('start');
  var endButton = document.getElementById('end');
  var walls = document.getElementsByClassName('wall');
  var playZone = document.getElementById('playZone');
  var boarder = document.getElementById('boarder');
  var isStart = false, isEnd = false, isCheat = false;
  var index;
  var timeI = 0, timeC = 0;

  function clearWalls(){
    for (index = 0; index < walls.length; ++index) {
        if (walls[index].classList != undefined)
          walls[index].classList.remove('wallKnocked');
    }
  }

  function initialize(){
    if (isEnd && isStart){
      startButton.classList.remove('started');
      endButton.classList.remove('ended');
      isEnd = isStart = false;
    }
  }

  playZone.onmouseleave = function() {
    if(isStart && !isEnd)
      isCheat = true;
  };// Cheating checking

  startButton.onmouseover = function() {
    clearWalls();
    initialize();
    if(timeC != 0){
      clearTimeout(timeC);
      timeC = 0;
    }
    if(timeI != 0){
      clearTimeout(timeI);
      timeI = 0;
    }
    if (!startButton.classList.contains('started'))
      startButton.classList.add('started');
    if (!boarder.classList.contains('fade')) {
      boarder.classList.add('fade');
    }
    isStart = true;
    isEnd = false;
    isCheat = false;
  }

  endButton.onmouseover = function() {
    if (!endButton.classList.contains('ended') && !isEnd && isStart) {
      endButton.classList.add('ended');
    }
    if (!isEnd && !isCheat && isStart) {
      boarder.textContent = "You Win!";
      boarder.classList.remove('fade');
      isEnd = true;
      if(timeC != 0){
        clearTimeout(timeC);
        timeC = 0;
      }
      if(timeI != 0){
        clearTimeout(timeI);
        timeI = 0;
      }
    }
    if (isCheat && isStart && !isEnd) {
      boarder.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
      boarder.classList.remove('fade');
      isEnd = true;
      isCheat = false;
      if(timeC != 0){
        clearTimeout(timeC);
        timeC = 0;
      }
      if(timeI != 0){
        clearTimeout(timeI);
        timeI = 0;
      }
    }
    timeI = setTimeout(initialize, 5000);
  };

  for (index = 0; index < walls.length; ++index) {
    walls[index].onmouseover = function() {
      if(isStart && !isEnd){
        this.classList.add('wallKnocked');
        isEnd = true;
        boarder.textContent = "You Lose!";
        boarder.classList.remove('fade');
        if(timeC != 0){
          clearTimeout(timeC);
          timeC = 0;
        }
        if(timeI != 0){
          clearTimeout(timeI);
          timeI = 0;
        }
        timeC = setTimeout(clearWalls, 3000);
        timeI = setTimeout(initialize, 3000);
      }
    }
  }


};