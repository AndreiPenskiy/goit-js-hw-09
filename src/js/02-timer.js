import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';


const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener("click", timer);

let time = 0;
let timerId = null;

//flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        time = selectedDates[0];
      if (time < options.defaultDate) {
        Notiflix.Notify.failure("Please choose a date in the future!");
      } else {
          refs.startBtn.removeAttribute("disabled");
      }
  },
};

const inputRef = document.querySelector("#datetime-picker"); 
flatpickr(inputRef, options);

//настраиваем таймер 

function timer() {
    refs.startBtn.setAttribute("disabled", true);
     timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = time - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
       if (days < 0
         && hours < 0
         && minutes < 0
         && seconds < 0) {
        clearInterval(timerId);
        Notiflix.Notify.success("Вы дождались!"); 
       } else {
            updateTime ({ days, hours, minutes, seconds })
    }
    }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
