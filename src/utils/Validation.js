const validator = require("validator");

const validateSignUpData = (req) => {
  // extract the data want to validate from the body.
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Names is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email: thoda mehnet karle");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password: isme bhi mehnet nahi hui");
  }
};

module.exports = {
  validateSignUpData,
};
