import { format } from 'date-fns';

export default class Task {
    constructor(title, dueDate, priority){
        this.title = title;
        this.dueDate = format(new Date(dueDate), 'dd/MM/yyyy');
        this.priority = priority;
    }

}