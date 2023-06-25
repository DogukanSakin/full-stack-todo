const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/task", taskController.getTasks);
router.post("/task", taskController.addTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);
router.delete("/task", taskController.deleteAllTasks); // Tüm görevleri silme route'u


module.exports = router;
