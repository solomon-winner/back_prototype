import { GeneralDTO } from "../dtos/general/generalInfoDto";
import General from "../models/generalInfo";

export const addVisitors = async (req, res, next) => {
    try {
      const info = await General.find({});
      console.log("------->",info)
      if (!info) {
        return ResponseHelper.error(
          res,
          "General Information not found",
          [],
          404,
        );
      }
  
      info[0].visitors = (info.visitors || 0) + 1;
      await info.save();
  
      return ResponseHelper.success(
        res,
        "Visitor count incremented successfully",
        { info: new GeneralDTO(info) },
      );
    } catch (error) {
      next(error);
    }
  };