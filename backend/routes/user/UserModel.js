const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    favoriteMovie: [{ type: Schema.Types.ObjectId, ref: "movie" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("user", UserSchema);
