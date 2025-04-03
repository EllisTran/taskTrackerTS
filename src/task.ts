import { promises as fs } from "fs";
export enum TaskStatus {
  COMPLETE = 0,
  INCOMPLETE = 1,
  IN_PROGRESS = 2,
}
interface Task {
  id: number;
  message: string;
  status: TaskStatus;
  date: number;
}

class Tasks {
  private static filename = "./src/data/tasks.json";
  constructor(private tasks: Task[] = []) {}

  public async init() {
    this.tasks = await this.loadTasksFromJson();
  }

  public addTask(message: string) {
    const newTask: Task = {
      id: this.tasks[this.tasks.length - 1].id + 1,
      message: message,
      status: TaskStatus.INCOMPLETE,
      date: Date.now(),
    };
    this.tasks.push(newTask);
  }
  public getAllIncompleteTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.INCOMPLETE);
  }
  public getAllTasks() {
    return this.tasks;
  }
  public getCompletedTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.COMPLETE);
  }
  public getInProgressTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS);
  }
  public updateTask(taskId: number, message: string) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) task.message = message;
      return task;
    });
  }
  public updateStatus(taskId: number, newStatus: TaskStatus) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) task.status = newStatus;
      return task;
    });
  }
  public removeTask(task: Task) {
    return this.tasks.filter((t) => t.id !== task.id);
  }
  private async loadTasksFromJson() {
    const tasks = JSON.parse(
      await fs.readFile(Tasks.filename, "utf8"),
    ) as Task[];
    return tasks.sort((a, b) => a.date - b.date);
  }
  public async saveTasks() {
    await this.writeTasksToJson();
  }
  private async writeTasksToJson() {
    await fs.writeFile(Tasks.filename, JSON.stringify(this.tasks), "utf8");
  }
}
export default Tasks;
