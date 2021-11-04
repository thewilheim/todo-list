export default class Project {
    constructor(name){
        this.name = name;
        this.task = [];
    }

    get projectName() {
        return this.name;
    }

    set projectName(project) {
        this.name = project;
    }

    get addTask() {
        return this.task;
    }

    set addTask(task) {
        this.task.push(task);
    }

}