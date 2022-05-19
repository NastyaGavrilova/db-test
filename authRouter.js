const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleWare = require("./middlewaree/authMiddleWare");
const roleMiddleWare = require("./middlewaree/roleMiddleWare");
router.post(
  "/registration",
  [
    check("username", "Field username does not be empty").notEmpty(),
    check(
      "password",
      "Password must be longer than 4 and shorter than 10"
    ).isLength({ min: 4, max: 10 }),
    check("confirmpassword", "Password doesnt match").custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }
    ),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleWare(["USER"]), controller.getUsers);

module.exports = router;
