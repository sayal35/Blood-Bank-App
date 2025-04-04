const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//add inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

//get all blood recors
router.get("/get-inventory", authMiddleware, getInventoryController);

//get 3 record reccent
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

//get hospital blood
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

//get donar record
router.get("/get-donars", authMiddleware, getDonarsController);

//get hospital
router.get("/get-hospital", authMiddleware, getHospitalController);

//get organization
router.get("/get-organization", authMiddleware, getOrganizationController);

//get org for hospital
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationForHospitalController
);

module.exports = router;
