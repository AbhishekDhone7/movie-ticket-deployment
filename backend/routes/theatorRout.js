const express = require("express");
const router = new express.Router();
const Theator = require("../module/theatorSchema");

router.post("/", async (req, res) => {
  // console.log(req.body);
  const theator = new Theator(req.body);
  const { city, theatorName, M_name, price, date, timeSlot, SeatArray } =
    req.body;
  try {
    const ValidTimeSlot = await Theator.findOne({
      city: city,
      theatorName: theatorName,
      date: date,
      timeSlot: timeSlot,
    });
    if (ValidTimeSlot) {
      res.status(422).json({ error: "Time Slot not available" });
    } else {
      await theator.save();
      res.status(201).send({ message: "Data submitted successfully" });
    }
    //   console.log("done")
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Theator.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/city", async (req, res) => {
  try {
    const getdata = req.body;
    // console.log(req.body)
    const data = await Theator.find(getdata);

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/theatorName", async (req, res) => {
  try {
    // const getdata = req.body;
    // console.log(req.body)
    const data = await Theator.find(req.body);

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/theatorTimeslot", async (req, res) => {
  try {
    // const getdata = req.body;
    // console.log(req.body);
    const data = await Theator.find(req.body);

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/theatorSeats", async (req, res) => {
  try {
    // const getdata = req.body;
    // console.log(req.body)
    const data = await Theator.find(req.body);

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/updateSeats", async (req, res) => {
  try {
    const { M_name, date, city, theatorName, timeSlot, selectSeatArray } =
      req.body;
    const data = await Theator.find({
      M_name,
      date,
      city,
      theatorName,
      timeSlot,
    });
    // console.log(data);
    const user = await Theator.findOneAndUpdate(
      { M_name, date, city, theatorName, timeSlot },
      req.body,
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
