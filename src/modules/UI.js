import Task from "./Task";
import Project from "./Project";
import Todo from "./Todo";
import { format, compareAsc } from 'date-fns';

const container = document.getElementById('container');
const navBar = document.querySelector('.Nav-Bar');
const taskContainer = document.querySelector('.Task');

const todoList = new Todo();

todoList.projects[0].addTask = new Task(`Harry`, `the lad`, ` tomorrow`, `high`);
todoList.projects[0].addTask = new Task(`Barry`, `the lad`, ` tomorrow`, `high`);
console.log(todoList.projects[0]);


export default class UI {

    static loadUI() {
        UI.loadHomePage();
    }

    static loadHomePage() {
        UI.loadNav();
    }

    static loadNav() {
        let header = document.createElement('header');
        let nav = document.createElement('nav');

        nav.innerHTML = `
                    <div>
                        <h3>Monday, 11 April</h3>
                        <p>3 active tasks</p>
                    </div>`

        navBar.appendChild(header);
        header.appendChild(nav);
    }





}