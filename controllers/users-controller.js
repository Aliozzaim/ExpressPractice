const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USER = [
  {
    name: "Ali Riza Ozzaim",
    email: "Aliozzaim@gmail.com",
    password: "123456",
  },
  {
    name: "Gunes Sule",
    email: "Gunes@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USER });
  res.status(201).json({ place: createdPlace });
};
const singup = (req, res, next) => {
  const errors = validationResult(res);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(442);
    throw new HttpError("Invalid inputs passed , please check your data..");
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USER.find((u) => u.email == email);
  if (hasUser) {
    throw new HttpError("could not create user, email already exists ", 422);
  }
  const userPlace = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USER.push(userPlace);

  res.status(201).json({ place: userPlace });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USER.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "could not identify user, credentials seem to be wrong",
      401
    );
  }
  res.json({ message: "logged in !" });
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;
