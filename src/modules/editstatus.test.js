/**
 * @jest-environment jsdom
 */
import { TasksClass } from './tasksClass.js';

describe('editing, updating status and clearing completed task', () => {
  const testClass = new TasksClass();
  const taskArr = [
    {
      index: 1,
      description: 'coding practice',
      completion: false,
    },
    {
      index: 2,
      description: 'washing',
      completion: false,
    },
  ];
  const editTask = () => {
    document.body.innerHTML = `
     <ul>
     <li id="task-text" contenteditable="true" >${taskArr[0].description}</li>
     ul`;
  };
  editTask();
  testClass();
});