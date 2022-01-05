const express = require("express");
const { remove, update } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//hämta schemat
const User = require("../models/User.js");

//hämta användare
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// hämta en användare
router.get("/id=:id", async (req, res) => {
  try {
    const singleU = await User.findById(req.params.id);
    if (!singleU) {
      res.json({ message: "ERROR: Cant find requested user." });
    } else {
      return res.status(200).json(singleU);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

//lägg till en ny användare
router.post("/register", async (req, res) => {
  //kontrollera först om användarnamnet är taget eller inte.
  const lookUp = await User.findOne({ user_name: req.body.user_name });
  if (lookUp) {
    console.log("username already in use");
    return res.status(406).send({ error: "Username already in use" });
  }
  try {
    const body = req.body;
    //koll om det är ifyllt
    if (!(body.user_name && body.password)) {
      return res
        .status(401)
        .send({ error: "Username and password is required" });
    }

    const user = new User(body);
    //bcrypt för att göra hash-lösenord
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((data) => {
      res.json(data);
      console.log("new user added");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//logga in
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ user_name: body.user_name });
    if (user) {
      //kolla om det inmatade lösenordet stämmer överrens med det lagrade
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "valid password" });
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    } else {
      res.status(401).json({ message: "User do not exist" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// uppdatera
router.put("/id=:id", async (req, res) => {
  //så att man inte kan uppdatera till ett befintligt användarnamn
  const lookUp = await User.findOne({ user_name: req.body.user_name });
  if (lookUp) {
    console.log("username already in use");
    return res.status(406).send({ error: "Username already in use" });
  }

  try {
    const body = req.body;
    if (!(body.user_name && body.password)) {
      return res
        .status(401)
        .send({ error: "Username and password is required" });
    }
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          user_name: req.body.user_name,
          password: req.body.password,
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});
/*
  try {
    const user = new User(body);
    //bcrypt för att göra hash-lösenord
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((data) => {
      res.json(data);
      console.log("user updated");
    });
  } catch (err) {
    res.json({ message: err.message });
  }

*/

//radera en användare
router.delete("/id=:id", async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ _id: req.params.id });
    res.json(removeUser);
    console.log("user removed");
  } catch (err) {
    res.json({ message: err.message });
  }
});

// och så exportera
module.exports = router;
