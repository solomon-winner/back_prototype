import { GeneralDTO } from "../dtos/general/generalInfoDto.js";
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
        const { bannerPic, bannerInfo, aboutPic, aboutInfo, visitors, subscribers, bannerCards, email, password} = req.body;
        const info = await General.findById(req.params.id);
       
        if (!info) {
            return ResponseHelper.error(res, 'general Information not found', [], 404);
        }

        info.title = title;
        info.description = description;

        await info.save();
        return ResponseHelper.success(res, 'General Information updated successfully', { info: new GeneralDTO(info) });
    } catch (error) {
        next(error);
    }
};
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
