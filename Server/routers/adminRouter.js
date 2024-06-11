const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminCtr");

router.get("/current-users", adminController.getCurrentUsers);
router.get("/current-trans", adminController.getCurrentTrans);
router.get("/hotels", adminController.getHotels);
router.post("/delete-hotels/:id", adminController.deleteHotel);
router.get("/rooms", adminController.getRooms);
router.post("/add-hotel", adminController.postHotel);
router.post("/delete-rooms/:id", adminController.deleteRoom);
router.post("/add-room", adminController.postRoom);
router.get("/trans", adminController.getTrans);

// advance
//////////// Hotel
router.get("/edit/:hotelID", adminController.getEditHotel);
router.put("/edit/:hotelID", adminController.putEditHotel);
//////////// Room
router.get("/edit-room/:roomID", adminController.getEditRoom);
router.put("/edit-room/:roomID", adminController.putEditRoom);

module.exports = router;
