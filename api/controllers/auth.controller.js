import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const singnUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  //  check the user is fil all requried fields or not.
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All fields are required."));
  }
  //  using the bcryptjs library to generate the encrypted password.
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //  using the user model to set all data inside the user.model.js file.
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("singnUp successful ");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  //  check the email and password fields are fields,
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "all fields are required."));
  }

  try {
    const validUser = await User.findOne({ email });
    //     check the user is present or not inside the databse.
    if (!validUser) {
      return next(errorHandler(404, "User not Found or invalid credentials."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
       return next(errorHandler(404, "Invalid credentials."));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);

    const {password: pass, ...rest} = validUser._doc; 

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(errorHandler(error));
  }
};
