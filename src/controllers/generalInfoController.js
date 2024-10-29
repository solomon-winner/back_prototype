import { GeneralDTO } from "../dtos/general/generalInfoDto.js";
import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";

export const getGeneralInfo = async (req, res, next) => {
    try {
        const generalInfo = await General.find({});
        const generalInfoDtos = generalInfo.map((info) => new GeneralDTO(info));
        return ResponseHelper.success(
        res,
        'General Information fetched successfully',
        generalInfoDtos,
        );
    } catch (error) {
        next(error);
    }
};
export const updateGeneralInfo = async (req, res, next) => {
    try {
        const { bannerPic, bannerInfo, aboutPic, aboutInfo, bannerCards, email, password} = req.body;
        const info = await General.findById(req.params.id);
       
        if (!info) {
            return ResponseHelper.error(res, 'general Information not found', [], 404);
        }

        if (bannerPic) info.bannerPic = bannerPic;
        if (bannerInfo) info.bannerInfo = bannerInfo;
        if (aboutPic) info.aboutPic = aboutPic;
        if (aboutInfo) info.aboutInfo = aboutInfo;
        if (bannerCards) info.bannerCards = bannerCards;
        if (email) info.email = email;
        if (password) info.password = await bcrypt.hash(password, 10);

        await info.save();
        return ResponseHelper.success(res, 'General Information updated successfully', { info: new GeneralDTO(info) });
    } catch (error) {
        next(error);
    }
};
export const addSubscribers = async (req, res, next) => {
    try {
        const {subscriber} = req.body;
        const info = await General.findById(req.user.id);
        if (!info) {
            return ResponseHelper.error(res, 'General Information not found', [], 404);
        }

        info.subscribers.push(subscriber);
        await info.save();

        return ResponseHelper.success(res, 'Subscriber added successfully!');
    } catch (error) {
        next(error);
    }
}

export const removeSubscribers = async (req, res, next) => {
    try {    const {subscriber} = req.body;
    const info = await General.findById(req.user.id);

    if (!info) {
        return ResponseHelper.error(res, 'General information not found', [], 404);
    
    }

    info.subscribers = info.subscribers.filter(sub => sub !== subscriber);
    await info.save();
    return ResponseHelper.success(res, 'Subscriber removed successfully!');
    } catch {
        next(error);
    }
}

export const addVisitors = async (req, res, next) => {
    try {
        const info = await General.findById(req.user.id);
        if (!info) {
            return ResponseHelper.error(res, 'General Information not found', [], 404);
        }

        info.visitors = (info.visitors || 0) + 1; 
        await info.save();

        return ResponseHelper.success(res, 'Visitor count incremented successfully', { info: new GeneralDTO(info) });
    } catch (error) {
        next(error);
    }
}
export const deleteGeneralInfo = async (req, res, next) => {
    try {
        const existingInfo = await General.findById(req.params.id);
        if (!existingInfo) {
            return ResponseHelper.error(res, "General Information doesn't exist!", [], 400);
        }
        const info = await General.findByIdAndDelete(req.params.id);

        if (!info) {
            return ResponseHelper.error(res, 'General Information not found', [], 404);
        }
        return ResponseHelper.success(res, 'General Information deleted successfully');
    } catch (error) {
        next(error);
    }
};
export const addGeneralInfo = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return ResponseHelper.error(res, "Title and description are required", [], 400);
        }
        const newInfo = new General({
            title,
            description,
        });

        await newInfo.save();
        return ResponseHelper.success(res,"General Information added Successfully",{info: new GeneralDTO(newInfo)}); 
    } catch (error) {
        next(error);
    }
};
