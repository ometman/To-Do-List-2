// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import displayAllTasks from '../modules/displayList.js';

window.onload = () => {
  displayAllTasks();
};

export { bootstrap as default };