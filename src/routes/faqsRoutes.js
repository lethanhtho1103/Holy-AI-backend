const express = require("express");
const router = express.Router();
const FaqsController = require("../app/controllers/FaqsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", FaqsController.getAll);
router.put("/:id", authMiddleware, FaqsController.updateById);

module.exports = router;
