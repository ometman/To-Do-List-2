import { TasksClass } from './tasksClass.js';

// change dot icons btn to type trash btn
export const removeATask = () => {
  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((value, valIndex) => {
    value.addEventListener('mouseover', () => {
      value.classList.toggle('bi-trash');
    });
    value.addEventListener('mouseout', () => {
      value.classList.toggle('bi-trash');
    });
    value.addEventListener('click', () => {
      const remTask = new TasksClass();
      remTask.taskRemover(valIndex);
      value.parentNode.remove();
    });
  });
};

export default removeATask;