// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { appInterface } from '../modules/interface.js';
import { TasksClass } from '../modules/tasksClass.js';
import { addNewTask } from '../modules/addTask.js';
<<<<<<< HEAD
import { removeATask } from '../modules/removeTask.js';
import { editTask } from '../modules/editTask.js';
import { markComplete } from '../modules/markCompleted.js';
import { clearComplete } from '../modules/clearCompleted.js';
import { retainCheck } from '../modules/taskStatus.js';
=======
>>>>>>> b9f48bc43d57a83d9d58a7a9585287b9015e3ffe

appInterface();
const showTasks = new TasksClass();
if (showTasks.getLocalStorage('taskList')) {
  showTasks.displayAllTasks();
} // get available tasks

// adding new task
addNewTask();

// refresh page by refresh icon btn
const refreshPage = document.querySelector('#refresh-page-btn');
refreshPage.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
});

<<<<<<< HEAD
// display tasks
displayTasks();
// adding new task
addNewTask();
// remove task
removeATask();
// editing tasking
editTask();
// status
retainCheck();
// complete task
markComplete();
// clear complete task
clearComplete();
=======
export { bootstrap as default };
>>>>>>> b9f48bc43d57a83d9d58a7a9585287b9015e3ffe
