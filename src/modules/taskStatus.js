import { TasksClass } from './tasksClass.js';

//  get task status on checkbox
export const retainCheck = () => {
  const taskEls = document.querySelectorAll('.task-select-input');
  const checkStatus = new TasksClass();
  taskEls.forEach((theEl, theElIndex) => {
    theEl.checked = false;
    if (checkStatus.taskCollection[theElIndex].taskCompletion === true) {
      theEl.checked = true;
    }
  });
};

export { retainCheck as default };