const express = require("express");
const router = express.Router();
const HeaderController = require("../app/controllers/HeaderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", HeaderController.getAll);
router.put("/:id", authMiddleware, HeaderController.updateById);

module.exports = router;
