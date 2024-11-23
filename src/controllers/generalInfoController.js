import { GeneralDTO } from "../dtos/general/generalInfoDto.js";
import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";

export const getGeneralInfo = async (req, res, next) => {
  try {
    const generalInfo = await General.findOne();
    return ResponseHelper.success(
      res,
      "General Information fetched successfully",
      new GeneralDTO(generalInfo),
    );
  } catch (error) {
    next(error);
  }
};

export const updateGeneralInfo = async (req, res, next) => {
  try {
    const {
      bannerPic,
      bannerInfo,
      aboutPic,
      aboutInfo,
      bannerCards,

    } = req.body;
    const info = await General.findOne();

    if (!info) {
      return ResponseHelper.error(
        res,
        "general Information not found",
        [],
        404,
      );
    }

    if (bannerPic) info.bannerPic = bannerPic;
    if (bannerInfo) info.bannerInfo = bannerInfo;
    if (aboutPic) info.aboutPic = aboutPic;
    if (aboutInfo) info.aboutInfo = aboutInfo;
    if (bannerCards) info.bannerCards = bannerCards;

    await info.save();
    return ResponseHelper.success(
      res,
      "General Information updated successfully",
      { info: new GeneralDTO(info) },
    );
  } catch (error) {
    next(error);
  }
};

export const deleteGeneralInfo = async (req, res, next) => {
  try {
    const existingInfo = await General.findOneAndDelete();
    if (!existingInfo) {
      return ResponseHelper.error(
        res,
        "General Information doesn't exist!",
        [],
        400,
      );
    }
    return ResponseHelper.success(
      res,
      "General Information deleted successfully",
    );
  } catch (error) {
    next(error);
  }
};
export const addGeneralInfo = async (req, res, next) => {
  try {
    const { bannerPic, bannerInfo, aboutPic, aboutInfo } = req.body;
    if (!bannerPic || !bannerInfo || !aboutInfo || !aboutPic) {
      return ResponseHelper.error(
        res,
        "all fields are required!",
        [],
        400,
      );
    }
    const newInfo = new General({
        bannerPic, 
        bannerInfo, 
        aboutPic, 
        aboutInfo
    });

    await newInfo.save();
    return ResponseHelper.success(
      res,
      "General Information added Successfully",
      { info: new GeneralDTO(newInfo) },
    );
  } catch (error) {
    next(error);
  }
};
