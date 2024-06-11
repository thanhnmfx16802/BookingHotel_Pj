const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainCtr");

router.get("/city", mainController.getHotel);
router.get("/type", mainController.getType);
router.get("/toprate", mainController.getTopRate);
router.post("/search", mainController.postSearch);
router.get("/detail/:hotelID", mainController.getDetailHotel);
router.get("/room/:hotelID", mainController.getRoom);
router.post("/transaction/:username", mainController.postTrans);
router.get("/transaction/:username", mainController.getTrans);

module.exports = router;
