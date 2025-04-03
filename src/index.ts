import Tasks, { TaskStatus } from "./task.js";

const options = [
  "add",
  "update",
  "delete",
  "mark-in-progress",
  "mark-done",
  "list",
];

const args = process.argv.slice(2); // Probably change this to 1 if its not through pnpm and through the bin but whatever
const option = options.find((value) => value === args[0]);
if (!option) console.error("Pick a valid option!");
args.splice(0, 1);

const tasks = new Tasks();
await tasks.init();
if (option === "add") {
  const message = args.join(" ");
  if (!message) console.error("You forgot a message!");
  tasks.addTask(message);
} else if (option === "update") {
  const id = Number(args[0]);
  if (!id) console.error("You need a number!");
  args.splice(0, 1);
  const message = args.join(" ");
  if (!message) console.error("You need a message!");
  tasks.updateTask(id, message);
} else if (option === "mark-in-progress") {
  const id = Number(args[0]);
  if (!id) console.error("You need a number!");
  tasks.updateStatus(id, TaskStatus.IN_PROGRESS);
} else if (option === "mark-done") {
  const id = Number(args[0]);
  if (!id) console.error("You need a number!");
  tasks.updateStatus(id, TaskStatus.COMPLETE);
} else if (option === "list") {
  const listType = args[0];
  if (!listType) console.log(tasks.getAllTasks());
  else if (listType === "done") console.log(tasks.getCompletedTasks());
  else if (listType === "todo") console.log(tasks.getAllIncompleteTasks());
  else if (listType === "in-progress") console.log(tasks.getInProgressTasks());
  else console.error("List type not valid");
}

await tasks.saveTasks();
