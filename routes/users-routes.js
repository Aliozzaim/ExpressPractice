const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controller");

const router = express.Router();

router.get("/", userControllers.getUsers);

router.post(
  "/singup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("passaword").isLength({ min: 6 }),
  ],
  userControllers.singup
);

router.post("/login", userControllers.login);

// router.delete("/delete/:uid", placesControllers.deleteUser);

module.exports = router;
