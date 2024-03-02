const router = require("express").Router();
const Client = require("../models/clientModel");

const checkExpiry = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }

    const currentDate = new Date();
    const createdAt = new Date(client.createdAt);
    const expiryDate = new Date(createdAt.setDate(createdAt.getDate() + 9));     // Add 9 days expiry

    const expiryDate31 = new Date(createdAt.setDate(createdAt.getDate() + 31));  // Add 31 days expiry
    const expiryDate90 = new Date(createdAt.setDate(createdAt.getDate() + 90));  // Add 90 days expiry
    const expiryDateHours = new Date(createdAt.getTime() + 5 * 60 * 60 * 1000);  // Add 5 hours expiry
    const expiryDateMinutes = new Date(createdAt.getTime() + 5 * 60 * 1000);     // Add 5 minutes expiry
    const expiryDateSeconds = new Date(createdAt.getTime() + 5 * 1000);          // Add 5 seconds expiry

    // Add 5 years expiry
    
    const expiryDates = new Date(createdAt);
    expiryDates.setFullYear(expiryDates.getFullYear() + 5);
    
    // 

    if (currentDate > expiryDate) {
      return res.status(400).send({ error: "The client is expired" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

router.get("/expiry/:id", checkExpiry, async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }
    res.send(client);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
