import { GeneralDTO } from "../dtos/general/generalInfoDto.js";
import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";
import { ImageLink } from "../services/ImageLink.js";
import path from 'path';
import fs from 'fs/promises';

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
    const { bannerInfo, aboutInfo, bannerCards } = req.body;

    // Find the existing general info
    const info = await General.findOne();

    if (!info) {
      return ResponseHelper.error(res, "General Information not found", [], 404);
    }

    if (req.files && req.files["bannerPic"]) {
      const bannerPicFile = req.files["bannerPic"][0];

      // Delete the old bannerPic file if it exists
      if (info.bannerPic) {
        const oldFilePath = path.resolve(info.bannerPic);
        try {
          await fs.access(oldFilePath);
          await fs.unlink(oldFilePath);
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error; // Re-throw if the error is not "file not found"
          }
        }
      }

      // Save the new bannerPic file
      const { fullPath, relativePath } = ImageLink(
        `${bannerPicFile.fieldname}-${Date.now()}${path.extname(bannerPicFile.originalname)}`
      );
      // console.log("bannerPicPath", bannerPicPath)

      await fs.writeFile(fullPath, bannerPicFile.buffer);

      // Update the bannerPic path in the database
      info.bannerPic = relativePath;
    }

    // Handle aboutPic file upload
    if (req.files && req.files["aboutPic"]) {
      const aboutPicFile = req.files["aboutPic"][0];

      // Delete the old aboutPic file if it exists
      if (info.aboutPic) {
        const oldFilePath = path.resolve(info.aboutPic);
        try {
          await fs.access(oldFilePath);
          await fs.unlink(oldFilePath);
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error; // Re-throw if the error is not "file not found"
          }
        }
      }

      // Save the new aboutPic file
      const { fullPath, relativePath } = ImageLink(
        `${aboutPicFile.fieldname}-${Date.now()}${path.extname(aboutPicFile.originalname)}`
      );
      await fs.writeFile(fullPath, aboutPicFile.buffer);

      // Update the aboutPic path in the database
      info.aboutPic = relativePath;
    }

    // Update other fields
    if (bannerInfo) info.bannerInfo = bannerInfo;
    if (aboutInfo) info.aboutInfo = aboutInfo;
    if (bannerCards) info.bannerCards = bannerCards;

    // Save the updated info
    await info.save();

    return ResponseHelper.success(
      res,
      "General Information updated successfully",
      { info: new GeneralDTO(info) }
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
