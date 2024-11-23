import { GeneralDTO } from "../dtos/general/generalInfoDto.js";
import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";

export const addVisitors = async (req, res, next) => {
    try {
      const info = await General.find({});
      if (!info) {
        return ResponseHelper.error(
          res,
          "General Information not found",
          [],
          404,
        );
      }
      const IncreasedVisitor = info[0];
      IncreasedVisitor.visitors = (IncreasedVisitor.visitors || 0) + 1;
      await IncreasedVisitor.save();
  
      return ResponseHelper.success(
        res,
        "Visitor count incremented successfully",
        { info: new GeneralDTO(info) },
      );
    } catch (error) {
      next(error);
    }
  };