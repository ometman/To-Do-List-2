export class TasksClass {
  constructor(taskIndex, taskDescription, taskCompletion) {
    this.index = taskIndex;
    this.description = taskDescription;
    this.completion = taskCompletion;
    this.taskCollection = JSON.parse(localStorage.getItem('taskList')) || [];
  }

  taskCount = () => this.taskCollection.length;

  newTaskIndex = () => this.taskCount() + 1;

  isEmptyCollection = () => this.taskCount === 0;

  addATask = (taskText) => {
    const tC = this.taskCollection;
    tC.push({
      taskIndex: this.newTaskIndex(), taskDescription: taskText, taskCompletion: false,
    });
    tC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
    localStorage.setItem('taskList', JSON.stringify(tC));
    this.displayAllTasks();
  }

  displayAllTasks = () => {
    const tC = this.taskCollection;
    const displayContainer = document.querySelector('#display-container');
    displayContainer.innerHTML = '';
    const buttonContainer = document.querySelector('.bottom-container');
    buttonContainer.innerHTML = '';
    const theTasks = () => {
      for (let i = 0; i < tC.length; i += 1) {
        const taskContainer = document.createElement('div');
        taskContainer.id = `${tC[i].taskIndex}`;
        taskContainer.classList = 'task-container row px-2 ms-0 me-0';
        taskContainer.innerHTML = `
          <!--checkbox input col-->
          <div class="col-1">
          <!-- task selection form-->
          <form action="task-select-form" class="task-select-form d-flex justify-content-start align-items-center">
          <label id="task-select" for="task-select-input"> Select a task</label>
          <input id="task-select-input" class="form-check-input task-select-input" type="checkbox"/>
          </form>
          </div>
          <!--task list-->
          <div class="col-10">
          <p id="task-text" class="task-text">${tC[i].taskDescription}</p>
          </div>
          <!-- delete and drag btn-->
          <i id="${i}" class="remove-btn bi bi-three-dots-vertical btn btn-sm col-1"></i>
        </div>`;
        displayContainer.appendChild(taskContainer);

        const removeBtn = document.querySelectorAll('.remove-btn');
        const editElement = document.querySelectorAll('.task-text');
        const taskBoxEls = document.querySelectorAll('#task-select-input');
        this.taskEditor(editElement);
        this.delBtn(removeBtn);
        this.taskRemover(removeBtn, i);
        this.markComplete(taskBoxEls);
      }
      const completeBtn = document.createElement('div');
      completeBtn.classList = 'col-12 mx-auto  d-flex justify-content-center';
      completeBtn.innerHTML = `
      <button id="clear-complete" class="btn mx-auto" type="button">Clear all completed</button>`;
      buttonContainer.appendChild(completeBtn);
      const clearCompletedBtn = document.querySelector('#clear-complete');
      this.clearComplete(clearCompletedBtn);
    };
    return theTasks();
  } // showing all tasks

  delBtn = (remBtn) => {
    remBtn.forEach((value) => {
      value.onmouseover = () => {
        value.classList.toggle('bi-trash');
      };
      value.onmouseout = () => {
        value.classList.toggle('bi-trash');
      };
    });
  }; // task remove event

  taskRemover = (btnLists, id) => {
    const ttC = this.taskCollection;
    Array.prototype.forEach.call(btnLists, (btnList, btnIndex) => {
      btnList.addEventListener('click', () => {
        if (btnIndex === id) {
          ttC.splice(btnIndex, 1);
          ttC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
          ttC.forEach((taskItem, taskItemIndex) => {
            taskItem.taskIndex = taskItemIndex + 1;
          });
          localStorage.setItem('taskList', JSON.stringify(ttC));
          this.displayAllTasks();
        }
      });
    });
  }

  taskEditor = (taskItem) => {
    const tC = this.taskCollection;
    taskItem.forEach((el, elIndex) => {
      const editContent = () => {
        el.setAttribute('contenteditable', 'true');
        el.style.backgroundColor = '#ffffcb';
      };
      const taskUpdate1 = () => {
        const taskItemInput = el.innerText;
        tC[elIndex].taskDescription = taskItemInput;
        localStorage.setItem('taskList', JSON.stringify(tC));
      };
      const taskUpdate2 = () => el.setAttribute('contenteditable', 'true');
      el.addEventListener('click', editContent, false);
      el.addEventListener('input', taskUpdate1, false);
      el.addEventListener('keydown', taskUpdate2, false);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          el.setAttribute('contenteditable', 'false');
          el.style.backgroundColor = '#fff';
        }
      });
    });
  } // edit task

  markComplete = (boxEls) => {
    const tC = this.taskCollection;
    let taskBoxValue = false;
    Array.prototype.forEach.call(boxEls, (theEl, theElIndex) => {
      theEl.addEventListener('change', () => {
        if (theEl.checked === true) {
          taskBoxValue = true;
        }
        if (theEl.checked === false) {
          taskBoxValue = false;
        }
        tC[theElIndex].taskCompletion = taskBoxValue;
        theEl.checked = taskBoxValue;
        localStorage.setItem('taskList', JSON.stringify(tC));
      });
    });
  } // task is marked complete

  retainCheck = () => {
    const taskEls = document.querySelectorAll('.task-select-input');
    const checkStatus = this;
    taskEls.forEach((theEl, theElIndex) => {
      theEl.checked = false;
      if (checkStatus.taskCollection[theElIndex].taskCompletion === true) {
        theEl.checked = true;
      }
    });
  }; // task status check and persistence

  clearComplete = (clrBtn) => {
    const taskEls = document.querySelectorAll('.task-select-input');
    const tC = this.taskCollection;
    clrBtn.addEventListener('click', () => {
      for (let i = 0; i < this.taskCount(); i += 1) {
        if (taskEls[i].checked === true) {
          taskEls[i].parentElement.parentElement.parentElement.remove();
        }
        if (tC[i].taskCompletion === true) {
          this.clearCompletedTask();
          window.location.reload();
        }
      }
    });
  }; // check completed task

  clearCompletedTask = () => {
    const ttC = this.taskCollection;
    const tC = ttC.filter((task) => task.taskCompletion === false);
    tC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
    tC.forEach((taskItem, taskItemIndex) => {
      taskItem.taskIndex = taskItemIndex + 1;
    });
    localStorage.setItem('taskList', JSON.stringify(tC));
    this.displayAllTasks();
  } // delete completed task

  getLocalStorage = () => this.taskCollection;
  // access and show local storage data
}

export { TasksClass as default };