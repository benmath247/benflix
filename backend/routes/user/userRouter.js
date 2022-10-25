const express = require("express");
const router = express.Router();

const checkEmpty = require("../lib/checkEmpty/checEmpty");

const { createUser, signIn, addMovieToFavorites } = require("./userController");

router.post("/create-user", checkEmpty, createUser);
router.post("/login", checkEmpty, signIn);
router.post("/add-to-favorites", addMovieToFavorites)

module.exports = router;
