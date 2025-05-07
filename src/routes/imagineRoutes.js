const express = require("express");
const router = express.Router();
const ImagineController = require("../app/controllers/ImagineController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", ImagineController.getAll);
router.put("/:id", authMiddleware, ImagineController.updateById);

module.exports = router;
