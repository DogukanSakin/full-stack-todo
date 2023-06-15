const router = require("express").Router();
const tagController = require("../controllers/tagController");

router.get("/tag", tagController.getTags);
router.post("/tag", tagController.addTag);
router.put("/tag/:id", tagController.updateTag);
router.delete("/tag/:id", tagController.deleteTag);

module.exports = router;
