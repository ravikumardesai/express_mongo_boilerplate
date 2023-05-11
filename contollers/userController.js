const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/contactRoutes");
//@desc register user
//@route POST /api/user/register
//@access public
const userRegister = asyncHandler(async (req, res) => {
  // destructure the body
  const { username, email, password } = req.body;
  // validate the body
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }
  // find user with email - if email already exist it will throw error
  const userAvalible = await User.findOne({ email });

  if (userAvalible) {
    res.status(400);
    throw new Error("User alredy registerd!");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // log hashedPassword
  // console.log(hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(user);
  // check user
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc loging user
//@route POST /api/user/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }
  const user = await User.findOne({ email });
  // compare password with hash password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESSTOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401)
    throw new Error("email or password is not valid")
  }

});

//@desc loging user
//@route POST /api/user/login
//@access private
const userCurrent = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { userRegister, userLogin, userCurrent };
