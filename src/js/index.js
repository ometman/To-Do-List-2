// Import our custom CSS
import '../scss/styles.scss';

import { appInterface } from '../modules/interface.js';
import { displayTasks } from '../modules/showTasks.js';
import { addNewTask } from '../modules/addTask.js';
import { removeATask } from '../modules/removeTask.js';
import { editTask } from '../modules/editTask.js';

appInterface();

// refresh page by refresh icon btn
const refreshPage = document.querySelector('#refresh-page-btn');
refreshPage.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
});

// display tasks
displayTasks();
// adding new task
addNewTask();
// remove task
removeATask();
// editing tasking
editTask();
