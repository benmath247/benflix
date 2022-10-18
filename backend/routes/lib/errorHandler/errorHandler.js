function parsedErrorMessage(err) {
  let output; //
  try {
    let objectKeys = Object.keys(err.keyPattern);
    let objectValue = Object.values(err.keyValue);

    output = `${objectKeys[0]} ${objectValue[0]} already exists`;
  } catch (e) {
    output = "Something went wrong, please contact support";
  }
  return output;
}

function errorHandler(err) {
  let errorArray = [];

  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11011:
        message = parsedErrorMessage(err);
        errorArray.push(message);
        break;
      default:
        message = "Something went wrong, please contact support";
        errorArray.push(err.message);
    }
  } else if (err.message) {
    errorArray.push(err.message);
  }

  return errorArray;
}

module.exports = errorHandler;
