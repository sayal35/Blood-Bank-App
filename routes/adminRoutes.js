const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//Routes
const router = express.Router();

//get|| donar list
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

router.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);

//delete donar
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteController);
module.exports = router;
