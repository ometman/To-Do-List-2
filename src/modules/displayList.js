const taskList = [
  {
    index: 0,
    description: 'Perform Chores',
    completed: false,
  },
  {
    index: 1,
    description: 'Read',
    completed: false,
  },
  {
    index: 2,
    description: 'Cook',
    completed: false,
  },
  {
    index: 3,
    description: 'Gym-work',
    completed: true,
  },
  {
    index: 4,
    description: 'Study',
    completed: true,
  },
  {
    index: 4,
    description: 'Coding practice',
    completed: true,
  },
];

const displayAllTasks = () => {
  // get the task container for iteration and declare it empty
  const taskContainer = document.querySelector('#task-container');
  taskContainer.innerHTML = '';
  // start loop - prevents duplication and single content scenario
  taskList.forEach((tcTask, tcTaskIndex) => {
    const displayContainer = document.createElement('div');
    displayContainer.classList = 'display-container, row px-2 ms-0 me-0';
    const i = tcTaskIndex;
    // displayContainer.id = i + 1;
    displayContainer.innerHTML = ` 
      <!--check input col-->
      <div class="col-1">
      <!-- task selection form-->
      <form action="task-select-form" class="task-select-form d-flex justify-content-start align-items-center">
      <label id="task-select" for="task-select-input"> Select a task</label>
      <input id="task-select-input" class="form-check-input task-select-input" type="checkbox"/>
      </form>
      </div>
      <!--id task list-->
      <div class="col-10">
      <p id="task-text" class="task-text">${taskList[i].description}</p>
      </div>
      <!--move and drop-drop-down btn-->
      <i id="remove-btn"class="remove-btn bi bi-three-dots-vertical btn btn-sm col-1"></i>`;
    taskContainer.appendChild(displayContainer);
  });
}; // show tasks

export default displayAllTasks;
