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
   const displayContainer = document.querySelector('#display-container');
    const taskContainer = document.createElement('div');
      taskContainer.classList = 'task-container, row px-2 ms-0 me-0';
      taskContainer.id = '${this.newTaskIndex()}';
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
      <p id="task-text" class="task-text">${taskText}</p>
      </div>
      <!-- delete and drag btn-->
      <button id="remove-btn" class="remove-btn bi bi-three-dots-vertical btn btn-sm col-1"></button>`;
      displayContainer.appendChild(taskContainer); 
      this.displayAllTasks();
  }

  displayAllTasks = () => {
    const tC = JSON.parse(localStorage.getItem('taskList'))
    // empty container
    const displayContainer = document.querySelector('#display-container');
    displayContainer.innerHTML = '';
    // begin loop
    tC.forEach((tcTask, tcTaskIndex) => {
      displayContainer.innerHTML += ` 
      <div id="${tcTaskIndex}" class="task-container row px-2 ms-0 me-0">
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
        <p id="task-text" class="task-text">${tcTask.taskDescription}</p>
        </div>
        <!-- delete and drag btn-->
        <button id="remove-btn" class="remove-btn bi bi-three-dots-vertical btn btn-sm col-1"></button>
      </div>`;
    });
  } // showing all tasks

  taskRemover = (btnIndex) => {
    const tC = this.taskCollection.filter((task) => task.taskIndex !== btnIndex + 1);
    // rearrange by sorting using their index
    tC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
    // sorting changed indexes, reassign task index by iterations
    tC.forEach((taskItem, taskItemIndex) => {
      taskItem.taskIndex = taskItemIndex + 1;
    });
    localStorage.setItem('taskList', JSON.stringify(tC));
  }

  taskEditor(elIndex, taskItemInput) {
    const tC = this.taskCollection;
    tC[elIndex].taskDescription = taskItemInput;
    localStorage.setItem('taskList', JSON.stringify(this.taskCollection));
  } // edit task

  taskCompleted = (theElIndex, taskBoxValue) => {
    const tC = this.taskCollection;
    tC[theElIndex].taskCompletion = taskBoxValue;
    localStorage.setItem('taskList', JSON.stringify(this.taskCollection));
  } // task is marked complete

  clearCompletedTask = (theElIndex) => {
    const tC = this.taskCollection;
    // tC.filter((task) => task.taskCompletion === false);
    tC.splice(theElIndex, 1);
    // rearrange by sorting using their index
    tC.sort((task1, task2) => task1.taskIndex - task2.taskIndex);
    // reassign task index by iterations
    tC.forEach((taskItem, taskItemIndex) => {
      taskItem.taskIndex = taskItemIndex + 1;
    });
    localStorage.setItem('taskList', JSON.stringify(tC));
  } // task is marked complete

  getLocalStorage = () => this.taskCollection;
  // access and show local storage data
}

export default TasksClass;