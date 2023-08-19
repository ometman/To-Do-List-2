import { TasksClass } from './tasksClass.js';

export const displayTasks = () => {
  const showTasks = new TasksClass();
  if (showTasks.getLocalStorage().length >= 0) {
    showTasks.displayAllTasks();
  } // get available tasks
};
export default displayTasks;
