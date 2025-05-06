const express = require("express");
const router = express.Router();
const HeroSectionController = require("../app/controllers/HeroSectionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", HeroSectionController.getAll);
router.put("/:id", authMiddleware, HeroSectionController.updateById);

module.exports = router;
