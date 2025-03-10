import bcrypt from "bcrypt";
import { generateToken } from "../services/authService.js";
import ResponseHelper from "../helpers/responseHelper.js";
import User from "../models/userModel.js";
import { UserDTO } from "../dtos/user/userDto.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseHelper.error(
        res,
        "Email and password are required",
        [],
        400,
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return ResponseHelper.error(res, "Invalid email or Password", [], 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ResponseHelper.error(res, "Invalid email or Password", [], 400);
    }

    const token = generateToken(user);

    return ResponseHelper.success(
      res,
      "You Logged in successfully!",
      { token, user: new UserDTO(user) },
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
          return ResponseHelper.error(res, 'All fields are required', [], 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
      });

      await newUser.save();

      return ResponseHelper.success(res, 'User registered successfully', new UserDTO(newUser), 201);
  } catch (error) {
      next(error);
  }
};