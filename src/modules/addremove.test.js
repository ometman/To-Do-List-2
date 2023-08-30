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

  const addTaskMock = jest
    .spyOn(addClass, 'addATask')
    .mockImplementation(() => 'mocked-addATask-method');

  test('successful add task class and method calls', () => {
    const taskInput = document.querySelector('#task-input');
    taskInput.value = 'taskname';
    const taskBtn = document.querySelector('#task-input-return');
    addClass.addATask('taskInput.value');
    taskBtn.click();
    return Promise.resolve()
      .then(async () => {
        expect(addTaskMock).toHaveBeenCalled();
      })
  });

  const taskRemover = (elLists, elId) => {
    const elLength = 6;
    elLists = new Array(elLength);
    let i = 0;
    elId = i;

    for (let i = 1; i <= elLists.length; i += 1) {
      document.createElement('div').innerHTML = `
      <button id="${i}" class="remove-btn" type="submit"></button>`;
    }
    document.body.appendChild()
  };
  taskRemover();
  // taskRemover = (btnLists, id) => {
  //   const ttC = this.taskCollection;
  //   Array.prototype.forEach.call(btnLists, (btnList, btnIndex) => {
  //     btnList.addEventListener('click', () => {
  //       if (btnIndex === id) {
  //         ttC.splice(btnIndex, 1);
  //         ttC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
  //         ttC.forEach((taskItem, taskItemIndex) => {
  //           taskItem.taskIndex = taskItemIndex + 1;
  //         });
  //         localStorage.setItem('taskList', JSON.stringify(ttC));
  //         this.displayAllTasks();
  //       }
  //     });
  //   });
  // }








  test('successful remove task event call', () => {
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
});
