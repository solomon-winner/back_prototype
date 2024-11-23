import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";

export const addVisitors = async (req, res, next) => {
    try {
      const info = await General.findOne();
      if (!info) {
        return ResponseHelper.error( res,"General Information not found",[],404);
      }
      info.visitors = (info.visitors || 0) + 1;
      await info.save();
  
      return ResponseHelper.success(res,"Visitor count incremented successfully");
    } catch (error) {
      next(error);
    }
  };