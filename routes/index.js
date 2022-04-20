const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const dramaRoutes = require("./drama");

router.use("/", userRoutes);
router.use("/dramas", dramaRoutes);

module.exports = router;
