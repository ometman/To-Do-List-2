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
  }

  displayAllTasks = () => {
    const tC = this.taskCollection;
    const displayContainer = document.querySelector('#display-container');
    displayContainer.innerHTML = '';
    const theTasks = () => {
      for (let i = 0; i < tC.length; i += 1) {
        const taskContainer = document.createElement('li');
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
        this.removeEl(removeBtn);
        this.taskRemover(removeBtn);
        const editElement = document.querySelectorAll('.task-text');
        this.taskEditor(editElement);
        const taskBoxEls = document.querySelectorAll('.task-select-input');
        this.markComplete(taskBoxEls);
        this.retainCheck(taskBoxEls);
      };
    };
    return theTasks();
  } // showing all tasks

  removeEl = (remBtn) => {
    remBtn.forEach((value) => {
      value.onmouseover = () => {
        value.classList.toggle('bi-trash');
      };
      value.onmouseout = () => {
        value.classList.toggle('bi-trash');
      };
    });
  }; // task remove event

  taskRemover = (btnList) => {
    const ttC = this.taskCollection;
    btnList.forEach((btn, btnId) => {
      btn.onclick = () => {
        btn.parentNode.remove();
        ttC.splice(ttC[btnId], 1);
        ttC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
        ttC.forEach((taskItem, taskItemIndex) => {
          taskItem.taskIndex = taskItemIndex + 1;
        });
        localStorage.setItem('taskList', JSON.stringify(ttC));
      };
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
    boxEls.forEach((theEl, theElIndex) => {
      // theEl.checked = true;
      theEl.addEventListener('change', () => {
        if (theEl.checked === true) {
          taskBoxValue = true;
        }
        if (theEl.checked === false) {
          taskBoxValue = false;
        }
        tC[theElIndex].taskCompletion = taskBoxValue;
        localStorage.setItem('taskList', JSON.stringify(tC));
      });
    });
  } // task is marked complete

  retainCheck = (taskEls) => {
    const tC = this.taskCollection;
    taskEls.forEach((theEl, theElIndex) => {
      theEl.checked = false;
      if (tC[theElIndex].taskCompletion === true) {
        theEl.checked = true;
      }
    });
  };

  clearComplete = (clrBtn, taskEls) => {
    clrBtn.addEventListener('click', () => {
      taskEls.forEach((theEl, theElIndex) => {
        if (theEl.checked === true) {
          this.clearCompletedTask(theElIndex);
          (theEl.parentElement.parentElement.parentElement).remove();
        }
      });
    });
  };

  clearCompletedTask = (theElIndex) => {
    const tC = this.taskCollection;
    // tC.filter((task) => task.taskCompletion === false);
    tC.splice(theElIndex, 1);
    tC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
    tC.forEach((taskItem, taskItemIndex) => {
      taskItem.taskIndex = taskItemIndex + 1;
    });
    localStorage.setItem('taskList', JSON.stringify(tC));
  } // task is marked complete

  getLocalStorage = () => this.taskCollection;
  // access and show local storage data
}

export { TasksClass as default };