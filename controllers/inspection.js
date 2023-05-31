var newOTP = require('otp-generators');
const InspectionModel = require('../models/inspection');


// Create an inspection
exports.createInspection = async (req,res) => {
  try {
    const inspectionData = {
        name: req.body.name,
        service: req.body.service,
        price:parseInt(req.body.price),
        lotID: req.body.lotID,
        status: req.body.status
    }
    const inspection = new InspectionModel(inspectionData);
    const result = await inspection.save();
    res.status(200).json({
        message: result
    })
  } catch (error) {
    throw new Error(error);
  }
};

// Get all inspections
exports.getInspections = async (req,res) => {
  try {
    const inspections = await InspectionModel.find({});
    res.status(200).json({
        message: inspections
    })
  } catch (error) {
    throw new Error(error);
  }
};

// Get an inspection by ID
exports.getInspectionById = async (req,res) => {
  try {
    const inspection = await InspectionModel.findById({ _id: req.params.id});
    res.status(200).json({
        message: inspection
    })
  } catch (error) {
    throw new Error(error);
  }
};

// Update an inspection
exports.updateInspection = async (req,res) => {
  try {
    const inspectionData = {
        name: req.body.name,
        service: req.body.service,
        price: req.body.price,
        lotID: req.body.lotID,
        status: req.body.status
    }
    const inspection = await InspectionModel.findByIdAndUpdate({
        _id: req.params.id},
      { $set: inspectionData },
      { new: true }
    );
    res.status(200).json({
        message: "Inspective is updated "
    })
  } catch (error) {
    throw new Error(error);
  }
};

// Delete an inspection
exports.deleteInspection = async (req,res) => {
  try {
    const inspection = await InspectionModel.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Inspective is Deleted "
    })
  } catch (error) {
    throw new Error(error);
  }
};