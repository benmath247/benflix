const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorHandler = require("../lib/errorHandler/errorHandler");
const User = require("./UserModel");
const Movie = require("../movie/MovieModel")

async function createUser(req, res) {
  try {
    let salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: "failure", payload: errorHandler(e) });
  }
}

async function signIn(req, res) {
  try {
    let foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      throw new Error("No user found!");
    } else {
      let comparedPassword = await bcryptjs.compare(
        req.body.password,
        foundUser.password
      );

      if (!comparedPassword) {
        throw new Error("Please check your email and password");
      } else {
        let jwtToken = jwt.sign(
          {
            // information to expose
            email: foundUser.email,
            username: foundUser.username,
          },
          // secret
          process.env.JWT_TOKEN_SECRET_KEY,
          {
            // exposed
            expiresIn: "7d",
          }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "failure", payload: errorHandler(e) });
  }
}

async function addMovieToFavorites(req, res) {
  try {
    let createdFavoriteMovie = new Movie({
      title: req.body.title,
      image: req.body.image,
      plot: req.body.plot,
      imdbID: req.body.imdbID
    })

    let savedFavoriteMovie = await createdFavoriteMovie.save();
    const decodedData = res.locals.decodedData
    let foundUser = await User.findOne({ email: decodedData.email })

    foundUser.favoriteMovie.push(savedFavoriteMovie._id)

    await foundUser.save()
    res.json({ message: "success", payload: "Favorite movie added!" })
  } catch (e) {
    res.status(500).json({ message: "failure", payload: errorHandler(e) })
  }
}

async function getFavoriteMovie(req, res) {
  try {
    const decodedData = res.locals.decodedData
    let foundUser = await User.findOne({ email: decodedData.email })
      .populate("favoriteMovie", "-__v -createdAt -updatedAt")
      .select("favoriteMovie -_id")
    res.json({ message: "success", payload: foundUser })
  } catch (e) {
    res.status(500).json({ message: "error", payload: errorHandler(e) })
  }
}



module.exports = {
  createUser,
  signIn,
  addMovieToFavorites,
  getFavoriteMovie,
};
