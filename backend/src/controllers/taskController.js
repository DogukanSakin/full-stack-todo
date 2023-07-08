const Task = require("../models/Task");
const Tag = require("../models/Tag");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("tags"); // tags alanını da popüle ediyoruz
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { name, tags } = req.body;
    const existingTask = await Task.findOne({ name });
    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "A task with this name already exists.",
      });
    }

    // Tag'leri kontrol edip, var olanları eklemek veya yeni tagleri oluşturmak için
    const tagIds = [];
    for (const tag of tags) {
      let existingTag = await Tag.findOne({ name: tag.name });
      if (!existingTag) {
        existingTag = new Tag(tag);
        await existingTag.save();
      }
      tagIds.push(existingTag._id);
    }

    const newTask = new Task({
      name,
      tags: tagIds,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating a task.",
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body);
    if (updatedTask) {
      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating the task.",
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting the task.",
    });
  }
};

exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany();
    res.status(200).json({
      success: true,
      message: "All tasks deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting all tasks.",
    });
  }
};
