const express = require("express");
const { remove, update } = require("../models/Movies");
const router = express.Router();

//importera schema Movies
const Movie = require("../models/Movies");

//Routes
//hämta listor med frågor om filmer.
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//hämta en esnkild array med frågor, ex easy eller medium
router.get("/id=:id", async (req, res) => {
  try {
    const singleQ = await Movie.findById(req.params.id);
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

    const movie = await Movie.create({
      description,
      options,
      image,
      category,
    });
    movie.save().then((data) => {
      res.json(data);
      console.log("New data has been added to myQuiz collection movies");
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
    let updateMovie = await Movie.findOne({ _id });
    if (!updateMovie) {
      updateMovie = await Movie.create({
        category,
        description,
        image,
        options,
      });
      return res.json(updateMovie);
    } else {
      updateMovie.category = category;
      updateMovie.description = description;
      updateMovie.image = image;
      updateMovie.options = options;

      await updateMovie.save();
      return res.json(updateMovie);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// radera en fråga
router.delete("/id=:id", async (req, res) => {
  try {
    const removeMovie = await Movie.deleteOne({ _id: req.params.id });
    res.json(removeMovie);
    console.log("Data removed from database myQuiz");
  } catch (err) {
    res.json({ message: err.message });
  }
});
//exportera så att app.js kan nå denna fil
module.exports = router;
