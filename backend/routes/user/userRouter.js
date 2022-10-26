const express = require("express");
const router = express.Router();

const jwtMiddleWare = require("../lib/authMiddleware/jwtMiddleware")
const checkEmpty = require("../lib/checkEmpty/checkEmpty");

const { createUser, signIn, addMovieToFavorites, getFavoriteMovie } = require("./userController");

router.post("/create-user", checkEmpty, createUser);
router.post("/login", checkEmpty, signIn);
router.post("/add-to-favorites", jwtMiddleWare, addMovieToFavorites)
router.get("/get-user-favorite-movie", jwtMiddleWare, getFavoriteMovie)

module.exports = router;
