const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//creaate
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityofBlood = req.body.quantity;
      const { userId } = req.body;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid User ID" });
      }
      const organization = new mongoose.Types.ObjectId(userId);

      //calculate blood quantity
      const totalInRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInRequestedBlood[0]?.total || 0;
      console.log("Total in", totalInRequestedBlood);

      //total out calculate blood
      const totalOutRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutRequestedBlood[0]?.total || 0;
      //in and out calculate
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      // validation

      if (availableQuantityOfBloodGroup < requestedQuantityofBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    //save inventory
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Added",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create inventory",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get inventory",
      error,
    });
  }
};

//get donar record
const getDonarsController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find donar
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar record fetched successfully",
      donars,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get  donart records",
      error,
    });
  }
};

//hospital
const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find hospital
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospital record fetched successfully",
      hospitals,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get  hospital records",
      error,
    });
  }
};

//organziation
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    console.log("donar", donar);
    const orgId = await inventoryModel.distinct("organization", { donar });
    //find org
    const organizations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).send({
      success: true,
      message: "Organization record fetched successfully",
      organizations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get organization records",
      error,
    });
  }
};

//get blood record of 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent Inventory data ",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get blood  records",
      error,
    });
  }
};

//get org for hospital
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    console.log("Hospital ID:", hospital);

    const orgId = await inventoryModel.distinct("organization", { hospital });
    console.log("Distinct Organizations:", orgId);

    // Find organizations
    const organizations = await userModel.find({ _id: { $in: orgId } });
    console.log("Fetched Organizations:", organizations);

    return res.status(200).send({
      success: true,
      message: "Hospital Org record fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get hospital organization records",
      error,
    });
  }
};

////get hospital blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital consumers records",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get inventory",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
