const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const UserSchema = mongoose.Schema(
  {
    user_name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", UserSchema);
