const Help = require('../models/helpandSuppport')

const createHelpRequest = async (req, res) => {
    try {
      const { message } = req.body;
      const helpRequest = await Help.create({
        message,
      });
      res.status(201).json(helpRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get all help requests
  const getAllHelpRequests = async (req, res) => {
    try {
      const helpRequests = await Help.find();
      res.status(200).json(helpRequests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get a specific help request
  const getHelpRequestById = async (req, res) => {
    try {
      const { helpId } = req.params;
      const helpRequest = await Help.findById(helpId);
      res.status(200).json(helpRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Update a help request
  const updateHelpRequest = async (req, res) => {
    try {
      const { helpId } = req.params;
      const { message } = req.body;
      const helpRequest = await Help.findByIdAndUpdate(
        helpId,
        { message },
        { new: true }
      );
      res.status(200).json(helpRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Delete a help request
  const deleteHelpRequest = async (req, res) => {
    try {
      const { id } = req.params;
      await Help.findByIdAndDelete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = {
    createHelpRequest,
    getAllHelpRequests,
    getHelpRequestById,
    updateHelpRequest,
    deleteHelpRequest,
  };