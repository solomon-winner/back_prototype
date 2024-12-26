import { TestimonyDTO } from "../dtos/testimony/testimonyDto.js";
import Testimony from "../models/testimonyModel.js";
import ResponseHelper from "../helpers/responseHelper.js";

export const addTestimony = async (req, res, next) => {
  try {
    const { email, testimony, verified } = req.body;
    const newTestimony = new Testimony({
      email,
      testimony,
      verified,
    });
    await newTestimony.save();
    return ResponseHelper.success(res, "Testimony added successfully!", {
      testimony: new TestimonyDTO(newTestimony),
    });
  } catch (error) {
    next(error);
  }
};
export const getTestimonies = async (req, res, next) => {
  try {
    const testimonies = await Testimony.find({});
    const testimoniesDtos = testimonies.map(
      (testimony) => new TestimonyDTO(testimony),
    );
    return ResponseHelper.success(
      res,
      "Testimonies fetched successfully",
      testimoniesDtos,
    );
  } catch (error) {
    next(error);
  }
};
export const getTestimony = async (req, res, next) => {
  try {
    const {id} = req.params;
    const testimony = await Testimony.findById(id);
    if (!testimony) {
      return ResponseHelper.error(res, "Testimony not found", [], 404);
    }
    return ResponseHelper.success(res, "Testimony fetched successfully!", {
      testimony: new TestimonyDTO(testimony),
    });
  } catch (error) {
    next(error);
  }
};
export const removeTestimony = async (req, res, next) => {
  try {
    const {id} = req.params;
    const existingTestimony = await Testimony.findByIdAndDelete(id);
    if (!existingTestimony) {
      return ResponseHelper.error(res, "Testimony doesn't exist!", [], 400);
    }
    return ResponseHelper.success(res, "Testimony deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateTestimony = async (req, res, next) => {
  try {
    const { id, email, testimony, verified } = req.body;
    const Updatedtestimony = await Testimony.findById(id);
    if (!Updatedtestimony) {
      return ResponseHelper.error(res, "Testimony not found", [], 404);
    }
    Updatedtestimony.email = email;
    Updatedtestimony.testimony = testimony;
    Updatedtestimony.verified = verified;
    await Updatedtestimony.save();
    return ResponseHelper.success(res, "Testimony updated successfully", {
      testimony: new TestimonyDTO(Updatedtestimony),
    });
  } catch (error) {
    next(error);
  }
};
export const verifyTestimony = async (req, res, next) => {};
