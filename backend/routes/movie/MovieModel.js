const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        image: {
            type: String,
        },
        plot: {
            type: String,
        },
        imdbID: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("movie", movieSchema)