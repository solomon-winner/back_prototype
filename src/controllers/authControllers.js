import bcrypt from 'bcrypt';
import { User} from '../models/generalInfo.js';
import {generateToken} from '../services/authService.js';
import ResponseHelper from '../helpers/responseHelper.js';
import { GeneralDTO } from '../dtos/general/generalInfoDto.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return ResponseHelper.error(res, "Email and password are required", [], 400);
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

        return ResponseHelper.success(res, "You Logged in successfully!", { token, user: new GeneralDTO(user)}, 200);
    } catch (error) {
        next(error);
    }  
}