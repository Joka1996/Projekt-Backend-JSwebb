const express = require("express");
const { remove, update } = require("../models/History");
const router = express.Router();

//importera schema History
const History = require("../models/History.js");

//hämta listor med frågor om filmer.
router.get("/", async (req, res) => {
  try {
    const history = await History.find();
    res.json(history);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//hämta en esnkild array med frågor, ex easy eller medium
router.get("/id=:id", async (req, res) => {
  try {
    const singleQ = await History.findById(req.params.id);
    if (!singleQ) {
      res.json({ message: "ERROR: cant find requested id" });
    } else {
      return res.status(200).json(singleQ);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

//lägg till en ny filmfråga-lista
router.post("/", async (req, res) => {
  try {
    const { category } = req.body;
    const { image } = req.body;
    const { description } = req.body;
    const { options } = req.body;

    const history = await History.create({
      description,
      options,
      image,
      category,
    });
    history.save().then((data) => {
      res.json(data);
      console.log("New data has been added to myQuiz collection history");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//uppdatera en med fler frågor
router.put("/id=:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { category, description, image, options } = req.body;
    let updateHistory = await History.findOne({ _id });
    if (!updateHistory) {
      updateHistory = await History.create({
        category,
        description,
        image,
        options,
      });
      return res.json(updateHistory);
    } else {
      updateHistory.category = category;
      updateHistory.description = description;
      updateHistory.image = image;
      updateHistory.options = options;

      await updateHistory.save();
      return res.json(updateHistory);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// radera en fråga
router.delete("/id=:id", async (req, res) => {
  try {
    const removeHistory = await History.deleteOne({ _id: req.params.id });
    res.json(removeHistory);
    console.log("Data removed from database myQuiz");
  } catch (err) {
    res.json({ message: err.message });
  }
});

//exportera så att app.js kan nå denna fil
module.exports = router;
