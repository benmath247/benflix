const express = require("express");
const router = express.Router();

const checkEmpty = require("../lib/checkEmpty/checEmpty");

const { createUser, signIn } = require("./userController");

router.post("/create-user", checkEmpty, createUser);
router.post("/login", checkEmpty, signIn);

module.exports = router;
