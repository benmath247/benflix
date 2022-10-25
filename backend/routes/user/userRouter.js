const express = require("express");
const router = express.Router();

const jwtMiddleWare = require("../lib/authMiddleware/jwtMiddleware")
const checkEmpty = require("../lib/checkEmpty/checkEmpty");

const { createUser, signIn, addMovieToFavorites } = require("./userController");

router.post("/create-user", checkEmpty, createUser);
router.post("/login", checkEmpty, signIn);
router.post("/add-to-favorites", jwtMiddleWare, addMovieToFavorites)

module.exports = router;
