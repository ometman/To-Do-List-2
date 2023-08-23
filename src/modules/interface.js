export const appInterface = () => {
  const mainContainer = document.querySelector('#app-main-container');
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';
  appContainer.classList = 'container-fluid row mx-auto bg-white border border-1 shadow d-flex justify-content-center';
  appContainer.innerHTML = `
        <!--header cols for title and refresh-->
        <div class="row p-2 d-flex justify-content-between align-items-center">
          <!--title col-->
          <div class="col-10 pt-3">
            <h1 id="app-title">Today's To Do</h1>
          </div>
          <!--refresh btn col-->
            <i id="refresh-page-btn" class="bi bi-arrow-repeat btn btn-sm  col-1"></i> 
        </div>
        <hr>
        <!--input row-->
          <!--form for task entry -->
          <form id="new-task-form" class="row p-2 mb-1 pt-0 new-task-form d-flex justify-content-between align-items-center">
            <label id="task-entry" for="task-input"> Add a task here</label>
            <input id="task-input" class="col-10 border-0 task-input" type="text" placeholder="Add you list..."/>
            <button id="task-input-return" type="submit" class="bi bi-arrow-return-left btn btn btn-sm col-1"></button>
          </form>
        <hr>
        <!--listing tasks cols row-->
        <div id="display-container" class="display-container row px-0 ms-0 me-0">
          <!--listing tasks here -->
        </div>
        <!--bottom container for clearing all selected lists-->
        <div class="bottom-container row p-2 py-3 m-0 z-3">
          <!-- complete button here -->
        </div>
      </div>`;
  mainContainer.appendChild(appContainer);
};

export default appInterface;