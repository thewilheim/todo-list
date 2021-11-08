import Project from "./Project";
import Task from "./Task";

export default class Todo {
    constructor(){
        this.projects = [];
        this.projects.push(new Project(`Today's task`));
    }

    set createProject(project) {
        this.projects.push(project);
        console.log(this.projects);
    }

    

}