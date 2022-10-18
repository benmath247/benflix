const mongoose = require("mongoose");

function MongoDB() {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
      console.log("MONGODB Connected");
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = MongoDB;
