import ResponseHelper from "../helpers/responseHelper.js";
import General from "../models/generalInfo.js";

export const addSubscribers = async (req, res, next) => {
    try {
      const { subscriber } = req.body;
      const info = await General.findOne();
      if (!info) {
        return ResponseHelper.error(
          res,
          "General Information not found",
          [],
          404,
        );
      }
      if (info.subscribers.includes(subscriber)) {
        ResponseHelper.error(res, "You already subscribed! Thank You!",[], 422)
      }
      info.subscribers.push(subscriber);
      await info.save();
  
      return ResponseHelper.success(res, "Subscriber added successfully!");
    } catch (error) {
      next(error);
    }
  };
  
  export const removeSubscribers = async (req, res, next) => {
    try {
      const { subscriber } = req.body;
      const info = await General.findOne();
  
      if (!info) {
        return ResponseHelper.error(
          res,
          "General information not found",
          [],
          404,
        );
      }
      console.log(info);
      info.subscribers = info.subscribers.filter((sub) => sub !== subscriber);
      await info.save();
      return ResponseHelper.success(res, "Subscriber removed successfully!");
    } catch {
      next(error);
    }
  };