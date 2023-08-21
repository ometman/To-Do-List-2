// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { appInterface } from '../modules/interface.js';
import { TasksClass } from '../modules/tasksClass.js';
import { addNewTask } from '../modules/addTask.js';
import { clearComplete } from '../modules/clearCompleted.js';
import { markComplete } from '../modules/markCompleted.js';
import { retainCheck } from '../modules/taskStatus.js';

appInterface();
const showTasks = new TasksClass();
if (showTasks.getLocalStorage('taskList')) {
  showTasks.displayAllTasks();
} // get available tasks

// adding new task
addNewTask();
// clear completed task
clearComplete();
// mark completed task
markComplete();
// retain mark complete
retainCheck();

// refresh page by refresh icon btn
const refreshPage = document.querySelector('#refresh-page-btn');
refreshPage.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
});

export { bootstrap as default };
