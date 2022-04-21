const express = require("express");
const router = express.Router();
const dramaController = require("../controllers/dramaController");
const authentication = require("../middlewares/authentication");

router.get("/", dramaController.getDramas);
router.post("/omdb", dramaController.getOmdb);

router.get("/watchlist", authentication, dramaController.getWatchlist);
router.get("/:dramaId", dramaController.getDramaById);
router.post(
  "/watchlist/:dramaId",
  authentication,
  dramaController.addWatchlist
);
router.post("/:dramaId", authentication, dramaController.addComment);

module.exports = router;
