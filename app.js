// hämta express
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//spara anslutningen i en separat fil
require("dotenv/config");

//variabler
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//hämta routes
const movieRoute = require("./routes/movies.js");
const historyRoute = require("./routes/history.js");

app.use("/api/movies", movieRoute);
app.use("/api/history", historyRoute);

// anslut till databas. DB_Connection sparas i .env
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to database myQuiz")
);
//lokal anslutning.
app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}/api/`);
});
