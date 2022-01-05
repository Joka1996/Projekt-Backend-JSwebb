const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

//schema required för att inte få tomma strängar i db. Endast string/boolean så ingen NoSQL injection. default undefined så att det inte blir tomma strängar i databasen
const MovieSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default: undefined,
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
          default: undefined,
        },
      },
    ],
  },
  { collection: "movies" }
);

module.exports = mongoose.model("Movies", MovieSchema);
