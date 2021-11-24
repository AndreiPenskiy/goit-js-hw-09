
refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

let hexId = null;
let interval = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener("click", () => {
    interval = setInterval(() => {
        hexId = getRandomHexColor();
        refs.body.style.backgroundColor = hexId;
    },
        1000);
    refs.startBtn.setAttribute('disabled', true);
});
  
refs.stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    refs.startBtn.removeAttribute('disabled');
});