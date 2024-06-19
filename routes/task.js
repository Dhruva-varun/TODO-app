const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();
const task = require("../controller/task");

router.get("/", task.homeController);

router.get("/add-task", task.addTaskController);

router.get("/update-task", task.updateTaskController);

router.get("/delete-task", task.deleteTaskController);

router.post("/add-task", task.addingTaskController);

router.post("/update-task/:id",task.updatingTaskController);

router.get("/confirm-delete",task.deletingTaskController);

module.exports = router;
