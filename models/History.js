const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

//schema required för att inte få tomma strängar i db. men även false för att ala inlägg inte ska ha bilder.
const HistorySchema = mongoose.Schema(
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
  { collection: "history" }
);

module.exports = mongoose.model("History", HistorySchema);
