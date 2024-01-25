import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
  //  create the try/catch block to handle the unexpected/unwanted exception  and error.
  try {
    // save the user in mongoose using the save() method.
    await newUser.save();
    res.json("singnUp successful ");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //
  const { email, password } = req.body;
  //  check the email and password fields are fields,
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "all fields are required."));
  }

  try {
    // find single user in the database using the findOne() method.
    const validUser = await User.findOne({ email });
    //     check the user is present or not inside the databse.
    if (!validUser) {
      return next(errorHandler(404, "User not Found or invalid credentials."));
    }
    // compare the database password with the user password comming from the fornt end
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid credentials."));
    }
    // create an cookie using the json web token
    const token = jwt.sign({ id: validUser._id , isAdmin:validUser.isAdmin }, process.env.JWT_TOKEN);
    //  skip the password to sent the client web page
    const { password: pass, ...rest } = validUser._doc;
    // sent the responce with the status code and token in json format
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

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user.id, isAdmin:user.isAdmin }, process.env.JWT_TOKEN);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);  
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password:hashedPassword,
        profilePhoto:googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin:newUser.isAdmin }, process.env.JWT_TOKEN);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
