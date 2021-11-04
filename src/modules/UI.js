import Task from "./Task";
import Project from "./Project";
import Todo from "./Todo";
import { format, compareAsc } from 'date-fns';

const container = document.getElementById('container');

const todoList = new Todo();


export default class UI {

    static loadUI() {
        UI.loadNav();
        UI.loadHomePage();
        

        Todo.createProject = 'hi';
    }

    static loadHomePage() {
        UI.projectForm();
        UI.showAllProjects();
    }

    static loadNav() {
        let header = document.createElement('header');
        let nav = document.createElement('nav');

        nav.innerHTML = `
                    <div>
                        <h3>Monday, 11 April</h3>
                        <p>3 active tasks</p>
                    </div>

                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Projects</a></li>
                        <li><a href="">All Tasks</a></li>
                    </ul>`

        container.appendChild(header);
        header.appendChild(nav);
    }

    static projectForm() {
        const formContent = document.createElement("div");
        formContent.classList.add('homeContent')

        const form = document.createElement("form");
        formContent.appendChild(form);

        const textField = document.createElement("input");
        textField.setAttribute("type","text");
        textField.setAttribute("name","projectTitle");
        textField.setAttribute("placeholder","Enter a project name...");
        textField.setAttribute("id","projectTitle");
        form.appendChild(textField);

        const buttonField = document.createElement("button");

        buttonField.setAttribute("type","submit");
        buttonField.setAttribute("id","projectBtn");
        buttonField.innerText = `Add a project`;

        const projectName = form.elements['projectTitle']

        form.addEventListener('submit', (e) => {
            todoList.createProject = projectName.value;
            e.preventDefault();
        });

        form.appendChild(buttonField);

        container.appendChild(formContent);
    }


    static showTodayTask() {

    }

    static showAllProjects() {

        const projectContainer = document.createElement('div');

        todoList.projects.forEach((project) => {

            UI.uiCards(project.name, projectContainer);

        });

        projectContainer.classList.add("cardContainer");

        container.appendChild(projectContainer);
    }


    static uiCards(title, parent, type) {

        const card = document.createElement('div');
        const cardName = document.createElement('h1')
        cardName.innerText = title;
        card.classList.add('uiCard');
        card.appendChild(cardName);
        parent.appendChild(card);
    }



}