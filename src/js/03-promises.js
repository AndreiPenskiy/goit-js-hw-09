import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const form = document.querySelector('.form');

form.addEventListener("submit", btnClick);

function btnClick (e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;
   
  let delayPromise = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayPromise)
       .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        }, delay)
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        }, delay)
      });
    delayPromise += Number(step.value);
  };
  
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  });
};
