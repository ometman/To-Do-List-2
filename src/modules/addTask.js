import { TasksClass } from './tasksClass.js';

// add new task by click event
export const addNewTask = () => {
//  get the form from the main content
  const newTaskForm = document.querySelector('#new-task-form');
  const taskItem = document.querySelector('#task-input');
  const newTask = document.querySelector('#task-input-return');
  // using mouse click on btn
  newTask.addEventListener('click', (e) => {
    e.preventDefault();
    const todoTasks = new TasksClass();
    if (taskItem.value !== '') {
      const taskText = taskItem.value;
      todoTasks.addATask(taskText);
      todoTasks.displayAllTasks();
      newTaskForm.reset();
    }
  });
  // using keyboard enter key
  taskItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      newTask.click();
    }
  });
};

export { addNewTask as default };
