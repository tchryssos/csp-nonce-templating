import { formTest } from '/form.js'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.formSubmit')
    .addEventListener('click', formTest);
});