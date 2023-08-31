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
  testClass();
  test('editable element and event call', () => {
    editTask();
    const taskEl = document.querySelector('#task-text');
    taskEl.click();
    return Promise.resolve()
      .then(async () => {(
        expect(taskEl.innerText).not.toBe(null);
        expect(taskEl.).toBe(true);
    });
  });

  test('successful edit task class instance call', () => {
    expect(testClass).toBeInstanceOf(TasksClass);
  });
});