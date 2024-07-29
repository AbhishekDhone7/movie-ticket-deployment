const express = require("express");
const router = new express.Router();
const Booking = require("../module/Booking");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send({ message: "Data submitted successfully" });

    console.log("done");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getTicket", async (req, res) => {
  // console.log(req.body)
  const {
    name,
  } = req.body
  try {
    const tickets = await Booking.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
