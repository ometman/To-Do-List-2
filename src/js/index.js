// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { appInterface } from '../modules/interface.js';
import { TasksClass } from '../modules/tasksClass.js';
import { addNewTask } from '../modules/addTask.js';

appInterface();

// refresh page by refresh icon btn
const refreshBtn = document.querySelector('#refresh-page-btn');
refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
});

const showTasks = new TasksClass();
if (showTasks.getLocalStorage('taskList')) {
  showTasks.displayAllTasks();
} // get available tasks

addNewTask();

// task status persistence
showTasks.retainCheck();

export { bootstrap as default };
