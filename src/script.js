let totalTime = 0;
let extT = 0;

let times = {
  a: totalTime,
  b: totalTime,
  bonus: 0,
};

const templates = {
  '20sec': { min: 0, sec: 20, bonus: 0 },
  '20sec+1': { min: 0, sec: 20, bonus: 1 },
  '30sec': { min: 0, sec: 30, bonus: 0 },
  '30sec+1': { min: 0, sec: 30, bonus: 1 },
  '30sec+2': { min: 0, sec: 30, bonus: 2 },
  '1min': { min: 1, sec: 0, bonus: 0 },
  '1min+1': { min: 1, sec: 0, bonus: 1 },
  '1min+5': { min: 1, sec: 0, bonus: 5 },
  '2min': { min: 2, sec: 0, bonus: 0 },
  '2min+1': { min: 2, sec: 0, bonus: 1 },
  '2min+5': { min: 2, sec: 0, bonus: 5 },
  '3min': { min: 3, sec: 0, bonus: 0 },
  '3min+2': { min: 3, sec: 0, bonus: 2 },
  '5min': { min: 5, sec: 0, bonus: 0 },
  '5min+2': { min: 5, sec: 0, bonus: 2 },
  '5min+5': { min: 5, sec: 0, bonus: 5 },
  '5min+10': { min: 5, sec: 0, bonus: 10 },
  '10min': { min: 10, sec: 0, bonus: 0 },
  '10min+5': { min: 10, sec: 0, bonus: 5 },
  '10min+15': { min: 10, sec: 0, bonus: 15 },
  '15min': { min: 15, sec: 0, bonus: 0 },
  '15min+10': { min: 15, sec: 0, bonus: 10 },
  '20min': { min: 20, sec: 0, bonus: 0 },
  '30min': { min: 30, sec: 0, bonus: 0 },
  '30min+15': { min: 30, sec: 0, bonus: 15 },
  '30min+50': { min: 30, sec: 0, bonus: 50 },
  '60min': { min: 60, sec: 0, bonus: 0 },
}

let intervalA;
let intervalB;
let activePlayer;
let paused = false;

const buttonA = document.getElementById('a');
const buttonB = document.getElementById('b');
const app = document.querySelector('.app');
const timers = document.querySelector('.timers');
const settings = document.querySelector('#settings');
const result = document.querySelector('#result');
const message = document.querySelector('#message');
const form = document.querySelector('#form');
const secs = document.querySelector('#seconds');
const mins = document.querySelector('#minutes');
const ext = document.querySelector('#ext');
const html = document.querySelector('html');
const flag1 = document.querySelector('#flag1');
const flag2 = document.querySelector('#flag2');
const home = document.querySelector('#home');
const pause = document.querySelector('#pause');
const play = document.querySelector('#play');
const hand1 = document.querySelector('#hand1');
const hand2 = document.querySelector('#hand2');
const players = document.querySelector('.players');
const form2 = document.querySelector('#form2')

form.onsubmit = function (event) {
  event.preventDefault();
  totalTime += Number(mins.value * 60) + Number(secs.value);
  settings.style.display = 'none';
  app.style.display = 'flex';
  buttonA.innerText = showInMinutes(totalTime);
  buttonB.innerText = showInMinutes(totalTime);
  times.a = totalTime;
  times.b = totalTime;
  times.bonus = ext.value;
};

form2.onsubmit = function (event){
  event.preventDefault()
  const formData = new FormData(form2);
  const selectedTemplate = formData.get('template');
  const template = templates[selectedTemplate]

  totalTime += Number(template.min * 60) + Number(template.sec);
  settings.style.display = 'none';
  app.style.display = 'flex';
  buttonA.innerText = showInMinutes(totalTime);
  buttonB.innerText = showInMinutes(totalTime);
  times.a = totalTime;
  times.b = totalTime;
  times.bonus = template.bonus;
}

function timerA() {
  if (paused) return;
  if (!activePlayer) {
    activePlayer = 'a';
    timerB();
    return;
  }
  if (activePlayer === 'a') {
    return;
  }
  activePlayer = 'a';
  times.a += Number(times.bonus);
  buttonA.innerText = showInMinutes(times.a); // time
  clearInterval(intervalA);
  intervalB = setInterval(() => {
    if (times.b === 0) {
      buttonB.style.backgroundColor = `rgb(255,0,0)`;
      showMessage('🎉🎊 Player A WINS!! 🎊🎉', true);
      setTimeout(reset, 5000);
    } else {
      times.b -= 1; // time
      buttonB.innerText = showInMinutes(times.b); // time
      buttonB.style.backgroundColor = `rgb(${
        255 - (times.b / totalTime) * 255
      },200,0)`;
    }
  }, 1000);
}
function timerB() {
  if (paused) return;
  if (!activePlayer) {
    activePlayer = 'b';
    timerA();
    return;
  }
  if (activePlayer === 'b') {
    return;
  }
  activePlayer = 'b';
  times.b += Number(times.bonus);
  buttonB.innerText = showInMinutes(times.b); // time
  clearInterval(intervalB);
  intervalA = setInterval(() => {
    if (times.a === 0) {
      buttonA.style.backgroundColor = `rgb(255,0,0)`;
      showMessage('🎉🎊 Player B WINS!! 🎊🎉', false);
      setTimeout(reset, 5000);
    } else {
      times.a -= 1; // time
      buttonA.innerText = showInMinutes(times.a); // time
      buttonA.style.backgroundColor = `rgb(${
        255 - (times.a / totalTime) * 255
      },200,0)`;
    }
  }, 1000);
  // i honestly dont understand anything but atleast the clock works
}

function showMessage(msg, flped) {
  result.style.display = 'flex';
  message.innerText = msg;
  if (flped === true) {
    message.classList.add('flipped');
  } else {
    message.classList.remove('flipped');
  }
}

function showConfirm(msg, flped, fn) {
  clearInterval(intervalA);
  clearInterval(intervalB);

  if (flped === true) {
    message.classList.add('flipped');
  } else {
    message.classList.remove('flipped');
  }
  result.style.display = 'flex';
  const content = `
  <div>${msg}</div>
  <div><button id="yes">Yes</button><button id="no">No</button></div>
  `;
  message.innerHTML = content;
  document.querySelector('#yes').onclick = () => {
    result.style.display = 'none';
    message.innerHTML = '';
    if (activePlayer === 'a') {
      activePlayer = 'b';
      timerA();
    } else if (activePlayer === 'b') {
      activePlayer = 'a';
      timerB();
    }
    fn();
  };
  document.querySelector('#no').onclick = () => {
    result.style.display = 'none';
    message.innerHTML = '';
    if (activePlayer === 'a') {
      activePlayer = 'b';
      timerA();
    } else if (activePlayer === 'b') {
      activePlayer = 'a';
      timerB();
    }
  };
}

function showInMinutes(sec) {
  const minutes = Math.floor(sec / 60);
  let minutesStr = String(minutes);
  if (minutesStr.length === 1) {
    minutesStr = '0' + minutesStr;
  }
  const remainingSec = sec % 60;
  let remainingSecStr = String(remainingSec);
  if (remainingSecStr.length === 1) {
    remainingSecStr = '0' + remainingSecStr;
  }
  return `${minutesStr} : ${remainingSecStr}`;
}

document.getElementById('a').onclick = () => {
  timerA();
};
document.getElementById('b').onclick = () => {
  timerB();
};

function reset() {
  totalTime = 0;
  settings.style.display = 'unset';
  app.style.display = 'none';
  clearInterval(intervalA);
  clearInterval(intervalB);
  activePlayer = undefined;
  times.a = 0;
  times.b = 0;
  times.bonus = 0;
  result.style.display = 'none';
  message.innerHTML = '';
  message.classList.remove('flipped');
  buttonA.style.backgroundColor = 'rgb(0, 200, 0)'
  buttonB.style.backgroundColor = 'rgb(0, 200, 0)'
}

home.onclick = function () {
  showConfirm('Are you sure you want to quit?', false, reset);
};

flag1.onclick = function () {
  showConfirm('Are you sure you want to resign?', true, () => {
    clearInterval(intervalA)
    clearInterval(intervalB)
    showMessage('🎉🎊 Player B WINS!! 🎊🎉', false);
    setTimeout(reset, 5000);
  });
};
flag2.onclick = function () {
  showConfirm('Are you sure you want to resign?', false, () => {
    clearInterval(intervalA)
    clearInterval(intervalB)
    showMessage('🎉🎊 Player A WINS!! 🎊🎉', true);
    setTimeout(reset, 5000);
  });
};

function playPause() {
  if (paused === false) {
    paused = true;
    timers.classList.add('paused');
    play.style.display = 'unset';
    pause.style.display = 'none';
    clearInterval(intervalA);
    clearInterval(intervalB);
  } else if (paused === true) {
    play.style.display = 'none';
    pause.style.display = 'unset';
    paused = false;
    timers.classList.remove('paused');
    if (activePlayer === 'a') {
      activePlayer = 'b';
      timerA();
    } else if (activePlayer === 'b') {
      activePlayer = 'a';
      timerB();
    }
  }
}

pause.onclick = playPause;
play.onclick = playPause;

hand1.onclick = function () {
  showConfirm('Accept draw?', false, () => {
    showMessage('Game Drawn 🙄', true);
    clearInterval(intervalA);
    clearInterval(intervalB);
    setTimeout(reset, 5000);
  });
};
hand2.onclick = function () {
  showConfirm('Accept draw?', true, () => {
    showMessage('Game Drawn 🙄', false);
    clearInterval(intervalA);
    clearInterval(intervalB);
    setTimeout(reset, 5000);
  });
};
