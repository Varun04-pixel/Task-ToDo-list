import dbModel from "../Model/model.js";

export function pageLoad(req, res) {
  try {
    res.send(index.html);
  } catch (err) {
    res.status(500).send("Error loading the page");
  }
}

export async function gettingTasks(req, res) {
  try {
    const tasks = await dbModel.find();
    res.json({ success: true, tasks });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}

export async function addingTask(req, res) {
  try {
    const newTask = req.body.task;
    const newEntry = await dbModel.insertOne({
      task: newTask,
    });
    const addedTask = await dbModel.find({ task: newTask });
    res.json({ success: true, addedTask });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}

export async function deletingTask(req, res) {
  try {
    const taskId = req.params.deleteId;
    await dbModel.deleteOne({ _id: taskId });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}

export async function updatingTask(req, res)  {
  try {
    const { taskId, Task } = req.body;
    await dbModel.updateOne({ _id: taskId }, { $set: { task: Task } });
    res.json({ success: true, taskId, Task });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}