const crud = require("../utils/crud");
const User = require("../models/users");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const GlobalError = require("../utils/globalError");
const jwt = require("jsonwebtoken");

exports.getUser = crud.getOne(User);

exports.signup = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const hashedPw = await bcrypt.hash(req.body.password, 12);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPw,
  });

  res
    .status(201)
    .json({ operation: "User created!", userId: newUser._id, ...newUser._doc });
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  let loadedUser;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new GlobalError("A user with this email could not be found.", 401);
  }
  loadedUser = user;
  const pwCheck = await bcrypt.compare(req.body.password, user.password);

  if (!pwCheck) {
    throw new customError("Wrong password. ", 401);
  }

  const token = jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString(),
    },
    "secret",
    { expiresIn: "2h" }
  );
  res.status(200).json({ token: token, userId: loadedUser._id.toString() });
});
