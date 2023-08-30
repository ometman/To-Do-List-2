/**
 * @jest-environment jsdom
 */
import { TasksClass } from './tasksClass.js';

describe('adding and removing a task', () => {
  const addClass = new TasksClass();
  const addNewTask = () => {
    document.body.innerHTML = `
        <input id="task-input" type="text" />
        <button id="task-input-return" type="submit"></button>`;
  };
  addNewTask();
  addClass.addATask();

  test('successful add task event call', () => {
    const taskBtn = document.querySelector('#task-input-return');
    const taskInput = document.querySelector('#task-input');
    taskInput.value = 'taskname';
    taskBtn.click();
    return Promise.resolve()
      .then(async () => {
        expect(taskBtn).not.toBeNull();
      })
      .then(() => {
        expect(taskInput.value).not.toBeNull();
        expect(taskInput.value).toBe('taskname');
      });
  });
  test('successful add task class and method calls', () => {
    expect(addClass).toBeInstanceOf(TasksClass);
  });
});
