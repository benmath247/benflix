function checkEmpty(req, res, next) {
  let body = req.body;

  let errorObj = {};

  if (req.url === "/create-user") {
    if (!body["username"]) {
      errorObj.usernameError = "username is required";
    }
  }

  if (!body["email"]) {
    errorObj.emailError = "Emal is required";
  }

  if (!body["password"]) {
    errorObj.passwordError = "password is required";
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "error", payload: errorObj });
  } else {
    next();
  }
}

module.exports = checkEmpty;
