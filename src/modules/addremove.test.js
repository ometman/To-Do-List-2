/**
 * @jest-environment jsdom
 */
import { TasksClass } from './tasksClass.js';

describe('adding and removing a task', () => {
  const testClass = new TasksClass();
  const addNewTask = () => {
    document.body.innerHTML = `
        <input id="task-input" value="taskname" type="text" />
        <button id="task-input-return" type="submit"></button>`;
  };

  test('successful add task event call', () => {
    addNewTask();
    const taskInput = document.querySelector('#task-input');
    const taskBtn = document.querySelector('#task-input-return');
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
    expect(testClass).toBeInstanceOf(TasksClass);
  });

  const addTaskMock = jest
    .spyOn(testClass, 'addATask')
    .mockImplementation(() => 'mocked-addATask-method');

  test('successful add task class and method calls', () => {
    addNewTask();
    const taskInput = document.querySelector('#task-input');
    testClass.addATask(taskInput.value);
    const taskBtn = document.querySelector('#task-input-return');
    taskBtn.click();
    return Promise.resolve()
      .then(async () => {
        expect(addTaskMock).toHaveBeenCalled();
      });
  });

  const taskRemover = () => {
    document.body.innerHTML = `
      <button id="5" class="remove-btn" type="submit"></button>`;
  };
  taskRemover();
  test('successful remove task event call', () => {
    taskRemover();
    const removeBtn = document.querySelector('.remove-btn');
    removeBtn.click();
    Promise.resolve()
      .then(async () => {
        expect(removeBtn).not.toBeNull();
        expect(removeBtn.id).toBe('5');
      });
  });

  const removeTaskMock = jest
    .spyOn(testClass, 'taskRemover')
    .mockImplementation(() => 'mocked-taskRemover-method');

  test('successful remove task class and method calls', () => {
    taskRemover();
    const removeBtn = document.querySelector('.remove-btn');
    testClass.taskRemover(removeBtn.length, removeBtn.id);
    removeBtn.click();
    return Promise.resolve()
      .then(async () => {
        expect(removeTaskMock).toHaveBeenCalled();
      });
  });
});
