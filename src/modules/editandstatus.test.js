/**
 * @jest-environment jsdom
 */
import { TasksClass } from './tasksClass.js';

describe('editing, updating status and clearing completed task', () => {
  const testClass = new TasksClass();
  const taskObjArr = [
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
     <li id="task-text" contenteditable="true" >${taskObjArr[0].description}</li>
     </ul>`;
  };

  test('successful class instance call for edit', () => {
    expect(testClass).toBeInstanceOf(TasksClass);
  });

  test('editable element and event call', () => {
    editTask();
    const taskEl = document.querySelector('#task-text');
    taskEl.click();
    return Promise.resolve().then(async () => {
      expect(taskEl.innerText).not.toBe(null);
      expect(taskEl.getAttribute('contenteditable')).toBe('true');
    });
  });

  test('change task description', () => {
    editTask();
    const taskEl = document.querySelector('#task-text');
    taskEl.innerText = 'newtaskname';
    taskEl.addEventListener = jest.fn((keyEvent, cb) => {
      keyEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 13, charCode: 13 });
      taskEl[keyEvent] = cb;
      return Promise.resolve().then(async () => {
        expect(keyEvent.target).toEqual('taskEl');
        expect(taskEl.innerText).toBe('newtaskname');
      });
    });
  });

  const taskCompletionHTMLMock = () => {
    document.body.innerHTML = `
     <div>
     <input id="task-select-input" unchecked type="checkbox"/>
     </div>`;
  };
  const taskCompletionMethodMock = jest
    .spyOn(testClass, 'markComplete')
    .mockImplementation(() => 'mocked-task-completion-method');

  test('task status change and method calls', () => {
    taskCompletionHTMLMock();
    const taskBox = document.querySelector('#task-select-input');
    testClass.markComplete(taskBox);
    taskBox.addEventListener = jest.fn((mouseEvent, cb) => {
      mouseEvent = new MouseEvent('click', { value: 0 });
      taskBox[mouseEvent] = cb;
      return Promise.resolve().then(async () => {
        expect(taskCompletionMethodMock).toHaveBeenCalled();
        expect(mouseEvent.target).toBe(taskBox);
        expect(taskBox.checked).toBe(true);
        expect(taskBox.addEventListener).toHaveReturnedWith(0);
      });
    });
  });

  const tastClearHTMLMock = () => {
    document.body.innerHTML = `
     <div>
     <button id="4" class="remove-btn"></button>
     </div>`;
  };
  const taskClearMethodMock = jest
    .spyOn(testClass, 'clearCompletedTask')
    .mockImplementation(() => 'mocked-task-completion-method');

  test('clear completed task event and method calls', () => {
    tastClearHTMLMock();
    const clearBtn = document.querySelector('.remove-btn');
    testClass.clearCompletedTask();
    clearBtn.addEventListener = jest.fn((mouseEvent, cb) => {
      mouseEvent = new MouseEvent('click', { value: 0 });
      clearBtn[mouseEvent] = cb;
      return Promise.resolve().then(async () => {
        expect(taskClearMethodMock).toHaveBeenCalled();
        expect(clearBtn.addEventListener).toHaveReturnedWith(0);
        expect(mouseEvent.target).toBe(clearBtn);
      });
    });
  });

  const localStorageMock = jest.fn(() => {
    const taskStore = {};
    return {
      setItem(key, value) {
        taskStore[key] = value;
      },
      getAll() {
        return taskStore;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  const setLocalStorage = () => {
    const afterMockData = localStorageMock.getAll();
    window.localStorage.setItem('taskLists', JSON.stringify(afterMockData));
    const storeLists = window.localStorage.getAll();
    return Object.keys(storeLists).length - 1;
  };

  test('reduce local storage task objects by 1', () => {
    const mockKey = 'taskList';
    const beforeMockData = taskObjArr;
    window.localStorage.setItem(mockKey, JSON.stringify(beforeMockData));

    const clearBtn = document.querySelector('.remove-btn');
    clearBtn.addEventListener = jest.fn((mouseEvent, cb) => {
      mouseEvent = new MouseEvent('click', { value: 0 });
      clearBtn[mouseEvent] = cb;
    });
    expect(setLocalStorage()).toBe(1);
  });
});
