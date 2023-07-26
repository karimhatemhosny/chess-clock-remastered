let totalTime = 0;
let extT = 0;

let times = {
  a: totalTime,
  b: totalTime,
};

let intervalA;
let intervalB;
let activePlayer;

const buttonA = document.getElementById('a');
const buttonB = document.getElementById('b');
const app = document.querySelector('.app');
const settings = document.querySelector('#settings');
const result = document.querySelector('#result');
const message = document.querySelector('#message');
const form = document.querySelector('#form');
const submit = document.querySelector('#submit');
const secs = document.querySelector('#seconds');
const mins = document.querySelector('#minutes');
const ext = document.querySelector('#ext');

form.onsubmit = function (event) {
  event.preventDefault();
  totalTime += Number(mins.value * 60) + Number(secs.value);
  settings.style.display = 'none';
  app.style.display = 'flex';
  buttonA.innerText = showInMinutes(totalTime);
  buttonB.innerText = showInMinutes(totalTime);
  times.a = totalTime;
  times.b = totalTime;
};

function timerA() {
  if (!activePlayer) {
    activePlayer = 'a';
    timerB();
    return;
  }
  if (activePlayer === 'a') {
    return;
  }
  activePlayer = 'a';
  times.a += Number(ext.value);
  buttonA.innerText = showInMinutes(times.a); // time
  clearInterval(intervalA);
  intervalB = setInterval(() => {
    if (times.b === 0) {
      buttonB.style.backgroundColor = `rgb(255,0,0)`
      showMessage('🎉🎊 Player A WINS!! 🎊🎉');
    } else {
      times.b -= 1; // time
      buttonB.innerText = showInMinutes(times.b); // time
      buttonB.style.backgroundColor = `rgb(${255-times.b/totalTime*255},200,0)`
    }
  }, 1000);
}
function timerB() {
  if (!activePlayer) {
    activePlayer = 'b';
    timerA();
    return;
  }
  if (activePlayer === 'b') {
    return;
  }
  activePlayer = 'b';
  times.b += Number(ext.value);
  buttonB.innerText = showInMinutes(times.b); // time
  clearInterval(intervalB);
  intervalA = setInterval(() => {
    if (times.a === 0) {
      showMessage('🎉🎊 Player B WINS!! 🎊🎉');
      buttonA.style.backgroundColor = `rgb(255,0,0)`
    } else {
      times.a -= 1; // time
      buttonA.innerText = showInMinutes(times.a); // time
      buttonA.style.backgroundColor = `rgb(${255-times.a/totalTime*255},200,0)`
    }
  }, 1000);
  // i honestly dont understand anything but atleast the clock works
}

function showMessage(msg) {
  result.style.display = 'flex';
  message.innerText = msg;
  if(msg === '🎉🎊 Player A WINS!! 🎊🎉'){
    message.classList.add('flipped')
  }
}

function showInMinutes(sec) {
  const minutes = Math.floor(sec/60);
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
