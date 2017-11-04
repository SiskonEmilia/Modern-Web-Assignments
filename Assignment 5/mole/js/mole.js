window.onload = function () {
  var timeBoarder = document.getElementById('time');
  var scoreBoarder = document.getElementById('score');
  var moles = document.getElementsByClassName('hole');
  var molesOut = document.getElementsByClassName('mole');
  var button = document.getElementsByClassName('button')[0];
  var bgm = document.getElementById('bgmusic');
  var sound = document.getElementById('sound');
  var time = 0, score = 0;
  var timeT;
  var moleIndex = 0;
  var date;
  var isStart = false;

  function gameover() {
    clearInterval(timeT);
    clearChecked();
    button.classList.remove('stop');
    button.textContent = "Start";
    isStart = false;
    setTimeout(function () {
      alert('Game Over.\nYour score is: ' + score + ((time <= 0) ? "" : ('\nTime left: ' + time)));
      bgm.src = "";
    }, 50);
  }

  function timeCounter(){
    timeBoarder.textContent = --time;
    if(time <= 0){
      setTimeout(gameover, 50);
    }
  }

  button.onclick = function () {
    if (isStart) {
      bgm.src = "";
      gameover();
    }
    else {
      this.classList.add('stop');
      button.textContent = "STOP";
      isStart = true;
      time = 30;
      score = 0;
      scoreBoarder.textContent = score;
      bgm.src = "../music/moleBGM.mp3";
      randomChecked();
      timeCounter();
      timeT = setInterval(timeCounter, 1000);
    }
  };

  function randomChecked() {
    date = new Date();
    moles[moleIndex = date.getTime() % 60].className = "mole";
  }

  function clearChecked() {
    molesOut[0].className = "hole";
  }

  for (moleIndex = 0; moleIndex < 60; ++moleIndex) {
    moles[moleIndex].onclick = function() {
      if(isStart){
        if(this.className == "mole"){
          this.className = "hole";
          score += 1;
          randomChecked();
          document.getElementById('sound').play();
        }
        else
          score -= 1;
        scoreBoarder.textContent = score;
      }
    }
  }

};