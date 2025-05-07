const express = require("express");
const router = express.Router();
const SolutionController = require("../app/controllers/SolutionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", SolutionController.getAll);
router.put("/:id", authMiddleware, SolutionController.updateById);

module.exports = router;
