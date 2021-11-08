export default class Project {
    constructor(name,desc){
        this.name = name;
        this.description = desc;
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