// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { displayTasks } from '../modules/showTasks.js';
import { addNewTask } from '../modules/addTask.js';
import { removeTask } from '../modules/removeTask.js';
import { changeIcon } from '../modules/changeIcon.js';

window.onload = () => {
  // refresh page by refresh icon btn
  const refreshPage = document.querySelector('#refresh-page-btn');
  refreshPage.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });

  // display tasks
  displayTasks();

  // task removal
  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((btn, btnIndex) => {
    btn.addEventListener('click', () => {
      removeTask(btnIndex);
    });
  });

  // adding new task
  addNewTask();
  // change icon on hover
  changeIcon();
};

export { bootstrap as default };