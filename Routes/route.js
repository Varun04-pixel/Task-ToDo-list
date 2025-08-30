import { Router } from 'express';
import { addingTask, deletingTask, gettingTasks, pageLoad, updatingTask } from '../Controller/routeControl.js';

const serverRoute = Router();

serverRoute.get("/", pageLoad);

serverRoute.get("/getTasks", gettingTasks);

serverRoute.post("/addTask", addingTask);

serverRoute.delete("/deleteTask/:deleteId", deletingTask);

serverRoute.patch("/editTask", updatingTask);

export default serverRoute;