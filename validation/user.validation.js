// Validación de regex
const userDataValidate = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.email) {
    errorMessage = "email is required";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (req.body.password.length < 5) {
    errorMessage = "password should have at least 5 characters";
  }
  if (
    req.body.email.match(
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    )
  ) {
    errorMessage = "provide valid email";
  }

  // send error
  if (errorMessage) {
    res.status(400).json({ success: false, errorMessage });
  }

  next();
};

const { body } = require("express-validator");

// Validación de express validator
const userDataValidateChainMethod = [ // -- ARRAY DE VALIDACIONES, EN CADA POSICIÓN HAY UNA VALIDACIÓN
  body("email")
    .exists()
    .isEmail()
    .withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
];

module.exports = {
  userDataValidate,
  userDataValidateChainMethod
};
