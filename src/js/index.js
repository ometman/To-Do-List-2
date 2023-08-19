// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { appInterface } from '../modules/interface.js';
import { TasksClass } from '../modules/tasksClass.js';
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

const showTasks = new TasksClass();
if (showTasks.getLocalStorage().length > 0) {
  showTasks.displayAllTasks();
} // get available tasks

// adding new task
addNewTask();
// remove task
removeATask();
// editing tasking
editTask();

export { bootstrap as default };