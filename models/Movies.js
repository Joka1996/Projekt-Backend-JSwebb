const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

//schema required för att inte få tomma strängar i db
const MovieSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: false,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        is_correct: {
          type: Boolean,
          required: true,
          default: false,
        },
        image: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { collection: "movies" }
);

module.exports = mongoose.model("Movies", MovieSchema);
