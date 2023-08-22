import { TasksClass } from './tasksClass.js';

// clear all completed
export const clearComplete = () => {
  const clearCompletedBtn = document.querySelector('#clear-complete');
  const taskBEls = document.querySelectorAll('.task-select-input');
  console.log(taskBEls);
  const taskStatus = new TasksClass();
  clearCompletedBtn.addEventListener('click', () => {
    taskBEls.forEach((theEl, theElIndex) => {
      if (theEl.checked === true) {
        taskStatus.clearCompletedTask(theElIndex);
        (theEl.parentElement.parentElement.parentElement).remove();
      }
    });
  });
};

export { clearComplete as default };