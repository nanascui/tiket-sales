/** load Express Validator and Multer Library */

const { validationResult, body } = require(`express-validator`);

const validateUser = [
  // Validation checks for the request body
  body("firstname").notEmpty().withMessage("First Name isrequired"),
  body("lastname").notEmpty().withMessage("Last Name isrequired"),
  body("password").notEmpty().withMessage("Password isrequired"),
  body("email").isEmail().withMessage("Invalid emailaddress"),
  // Custom validation logic
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      /** get all error message */
      let errMessage = errors
        .array()
        .map((it) => it.msg)
        .join(",");
      /** return error message with code 422 */
      return response.status(422).json({
        success: false,
        message: errMessage,
      });
    }
    next(); // Proceed to the next middleware/routehandler if validation passes
  },
];
module.exports = { validateUser };
