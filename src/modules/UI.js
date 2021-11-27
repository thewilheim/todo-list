import Task from "./Task";
import Project from "./Project";
import Todo from "./Todo";
import { format } from "date-fns";

const topBar = document.querySelector(".Header");
const sideBar = document.querySelector(".Side-Bar");
const mainContent = document.querySelector(".Main-Content");
const todoList = new Todo();

todoList.projects[0].addTask = new Task(`Re-watch Harry Potter`, `11/11/2021`);
todoList.projects[0].addTask = new Task(`Finish watching arcane`, `11/11/2021`);

export default class UI {
  static loadUI() {
    UI.loadTop();
    UI.loadMainContent();
    UI.loadSide();
    UI.initEventListener();
  }

  // Main UI

  static loadTop() {
    const container = document.createElement("div");
    container.classList.add("topBar");

    const currentDate = document.createElement("p");
    currentDate.innerText = `${format(new Date(), "EEEE")} ${format(
      new Date(),
      "do"
    )} ${format(new Date(), "MMMM")}`;

    const taskActive = document.createElement("p");
    taskActive.classList.add("activeTasks");

    container.appendChild(currentDate);
    container.appendChild(taskActive);
    topBar.appendChild(container);
  }

  static loadSide() {
    const sideContainer = document.createElement("div");
    sideContainer.classList.add("sideContent");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects");

    const projectBtn = document.createElement("button");
    projectBtn.setAttribute("id", `projectBtn`);
    projectBtn.innerText = `New Project`;
    projectBtn.onclick = function () {
      UI.toggleModal();
    };

    sideContainer.appendChild(projectContainer);
    sideContainer.appendChild(projectBtn);

    sideBar.appendChild(sideContainer);

    UI.loadProjectForm();
    UI.showProjects(projectContainer);
  }

  static loadMainContent() {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    const taskHeader = document.createElement("div");
    taskHeader.classList.add("taskHeader");

    const projectName = document.createElement("h1");
    projectName.innerText = `Placeholder`;
    projectName.classList.add("headerTitle");

    const taskBtn = document.createElement("button");
    taskBtn.setAttribute("id", `taskBtn`);
    taskBtn.innerText = `New Task`;
    taskBtn.onclick = function () {
      UI.toggleModal("task");
    };

    const taskBox = document.createElement("div");
    taskBox.classList.add("taskBox");

    taskHeader.appendChild(projectName);
    taskHeader.appendChild(taskBtn);
    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskBox);
    mainContent.appendChild(taskContainer);

    UI.loadTaskForm();
  }

  // Project UI

  static loadProjectForm() {
    const projectModal = document.createElement("div");
    projectModal.setAttribute("id", "projectModal");

    const modalContent = document.createElement("div");
    modalContent.classList.add(`modalContent`);

    const projectForm = document.createElement("form");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = `Project Title`;
    projectForm.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("name", "projectTitle");
    nameInput.setAttribute("placeHolder", "Enter a project name...");
    nameInput.required = true;
    projectForm.appendChild(nameInput);

    const descLabel = document.createElement("label");
    descLabel.setAttribute("for", "desc");
    descLabel.innerText = `Project Description`;
    projectForm.appendChild(descLabel);

    const projectDesc = document.createElement("input");
    projectDesc.setAttribute("type", "text");
    projectDesc.setAttribute("id", "desc");
    projectDesc.setAttribute("name", "projectDesc");
    projectDesc.setAttribute("placeHolder", "Enter a project description...");
    projectDesc.required = true;
    projectForm.appendChild(projectDesc);

    const submitForm = document.createElement("input");
    submitForm.setAttribute("type", "submit");
    submitForm.setAttribute("value", "Submit");
    projectForm.appendChild(submitForm);

    // add project to array
    projectForm.addEventListener("submit", (e) => {
      //prevent the page from submitting
      e.preventDefault();

      //  Create project and send it to the todo list
      const project = new Project(nameInput.value, projectDesc.value);
      UI.createProject(project);

      // loads the project when submited
      UI.loadProject(project);

      // remove the modal
      projectModal.style.display = "none";
    });

    modalContent.appendChild(projectForm);
    projectModal.appendChild(modalContent);
    mainContent.appendChild(projectModal);
  }

  static createProject(project) {
    todoList.createProject = project;

    const parent = document.querySelector(".projects");

    UI.addCard(project.name, parent);
  }

  static loadProject(project) {
    const headerTitle = document.querySelector(".headerTitle");
    const activeTasks = document.querySelector(".activeTasks");
    const taskBox = document.querySelector(".taskBox");

    if (project.task.length > 0) {
      taskBox.innerHTML = ``;
      project.task.forEach((task) => {
        UI.addTaskCard(task.title, task.dueDate);
      });
    } else {
      taskBox.innerHTML = ``;
    }

    let numberOfTask = project.task.length;
    activeTasks.innerText = `${numberOfTask} Active Tasks`;
    headerTitle.innerHTML = project.name;
  }

  static addCard(title, parent) {
    const card = document.createElement("button");
    card.classList.add("projectCardBtn");
    card.setAttribute("id", "projectCard");
    card.innerText = title;

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = `<i class="far fa-trash-alt" class="deleteIcon"></i>`;

    card.appendChild(deleteIcon);
    parent.appendChild(card);
  }

  static showProjects() {
    const headerTitle = document.querySelector(".headerTitle");
    const activeTasks = document.querySelector(".activeTasks");
    const projectcontainer = document.querySelector(".projects");

    todoList.projects.forEach((project) => {
      UI.addCard(project.name, projectcontainer);

      project.task.forEach((task) => {
        UI.addTaskCard(task.title, task.dueDate);
      });

      let numberOfTask = project.task.length;

      activeTasks.innerText = `${numberOfTask} Active Tasks`;

      headerTitle.innerHTML = project.name;
    });
  }

  // Task UI

  static addTaskCard(title, dueDate) {
    const parent = document.querySelector(".taskBox");
    const card = document.createElement("div");

    card.classList.add("taskCard");

    const leftGrp = document.createElement("div");
    leftGrp.classList.add("titleName");

    const cardTitle = document.createElement("h1");
    cardTitle.innerText = title;
    leftGrp.appendChild(cardTitle);

    const rightGrp = document.createElement("div");
    const taskDate = document.createElement("h1");
    taskDate.innerText = dueDate;
    rightGrp.appendChild(taskDate);
    rightGrp.innerHTML += `<i class="far fa-trash-alt"></i>`;

    card.appendChild(leftGrp);
    card.appendChild(rightGrp);
    parent.appendChild(card);
  }

  static createTask(task) {
    const projectName = document.querySelector(".headerTitle");

    todoList.projects.forEach((project) => {
      if (projectName.innerText === project.name) {
        project.addTask = task;
      }
    });
  }

  static loadTaskForm() {
    const taskModal = document.createElement("div");
    taskModal.setAttribute("id", "taskModal");

    const modalContent = document.createElement("div");
    modalContent.classList.add(`modalContent`);

    const taskForm = document.createElement("form");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = `Project Title`;
    taskForm.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("name", "projectTitle");
    nameInput.setAttribute("placeHolder", "Enter a task name...");
    nameInput.required = true;
    taskForm.appendChild(nameInput);

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerText = `Task Due Date`;
    taskForm.appendChild(dateLabel);

    const taskDueDate = document.createElement("input");
    taskDueDate.setAttribute("type", "date");
    taskDueDate.setAttribute("id", "date");
    taskDueDate.setAttribute("name", "taskDueDate");
    taskDueDate.setAttribute("value", "dd/MM/yyyy");
    taskDueDate.required = true;
    taskForm.appendChild(taskDueDate);

    const submitForm = document.createElement("input");
    submitForm.setAttribute("type", "submit");
    submitForm.setAttribute("value", "Submit");
    taskForm.appendChild(submitForm);

    // add project to array
    taskForm.addEventListener("submit", (e) => {
      //prevent the page from submitting
      e.preventDefault();

      //  Create project and send it to the todo list
      const task = new Task(nameInput.value, taskDueDate.value);
      UI.createTask(task);

      UI.addTaskCard(task.title, task.dueDate);

      // remove the modal
      taskModal.style.display = "none";
    });

    modalContent.appendChild(taskForm);
    taskModal.appendChild(modalContent);
    mainContent.appendChild(taskModal);
  }

  static toggleModal(property) {
    let modal;

    if (property === `task`) {
      modal = document.getElementById("taskModal");
    } else {
      modal = document.getElementById("projectModal");
    }

    modal.style.display = "block";

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  static deleteItems(element) {
    if (element.classList.contains("taskCard")) {
      const taskName = element.querySelector(".titleName");

      todoList.projects.forEach((project) => {
        project.task.forEach((task) => {
          if (task.title === taskName.innerText) {
            project.task.splice(project.task.indexOf(task), 1);
            element.remove();

            console.log(project.task);
          }
        });
      });
    } else if (element.classList.contains("projectCardBtn")) {
      todoList.projects.forEach((project) => {
        if (
          project.name === element.innerText &&
          todoList.projects.length > 1
        ) {
          todoList.projects.splice(todoList.projects.indexOf(project), 1);

          element.remove();

          console.log(todoList.projects);
        }
      });
    } else {
      console.error("Not able to delete this item");
    }
  }

  // Event Listeners

  static initEventListener() {
    // event listener to load the correct project
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("projectCardBtn")) {
        todoList.projects.forEach((project) => {
          if (project.name === e.target.innerText) {
            UI.loadProject(project);
          }
        });
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-trash-alt")) {
        UI.deleteItems(e.target.parentElement.parentElement);
      }
    });
  }
}
