const express = require("express");
const router = express.Router();
const dramaController = require("../controllers/dramaController");
const authentication = require("../middlewares/authentication");

router.get("/", dramaController.getDramas);
router.get("/:dramaId", dramaController.getDramaById);

router.use(authentication);
router.post("/watchlist/:dramaId", dramaController.addWatchlist);
router.post("/:dramaId", dramaController.addComment);

module.exports = router;
