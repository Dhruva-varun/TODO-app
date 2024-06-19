const moment = require("moment");
const Todo = require("../models/Todo");

const homeController = async (req, res, next) => {
  try {
    const tasks = await Todo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { tasks });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const addTaskController = (req, res, next) => {
  try {
    res.render("newtask");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.query;
    const task = await Todo.findById(id); 
    res.render("updatetask", { task });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteTaskController = (req, res, next) => {
  try {
    const { id } = req.query;
    res.render("deletetask",{id});
  } catch (error) {
    res.json({ message: error.message });
  }
};

const addingTaskController = async (req, res, next) => {
  try {
    const { task, desc } = req.body;
    const newtask = new Todo({ task, desc });
    await newtask.save();
    res.redirect("/");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatingTaskController = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const {task,desc} = req.body;
    const todo = await Todo.findById(id);
    if(!todo){
      res.json({message:"task not found"})
    }
    todo.task = task;
    todo.desc = desc;

    await todo.save();
    res.redirect("/")
    } catch (error) {
     res.json({message:error.message});
  }
}

const deletingTaskController = async(req, res, next) => {
  try {
    const { id,confirm } = req.query;

    if(confirm ==="yes"){
      await Todo.findByIdAndDelete(id);
    }
     res.redirect('/');
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  homeController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
  addingTaskController,
  updatingTaskController,
  deletingTaskController
};
