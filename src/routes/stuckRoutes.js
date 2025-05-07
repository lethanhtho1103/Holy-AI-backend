const express = require("express");
const router = express.Router();
const StuckController = require("../app/controllers/StuckController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", StuckController.getAll);
router.put("/:id", authMiddleware, StuckController.updateById);

module.exports = router;
