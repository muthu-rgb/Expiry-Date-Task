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
    const expiryDate = new Date(createdAt.setDate(createdAt.getDate() + 9));

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
