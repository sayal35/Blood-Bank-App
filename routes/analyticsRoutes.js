const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailsController,
} = require("../controllers/analyticsController");

const router = express.Router();

//routes
//get blood data
router.get("/bloodgroupdata", authMiddleware, bloodGroupDetailsController);

module.exports = router;
