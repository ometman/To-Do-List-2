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
    }
addNewTask();
})
