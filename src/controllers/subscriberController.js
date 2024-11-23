import General from "../models/generalInfo.js";

export const addSubscribers = async (req, res, next) => {
    try {
      const { subscriber } = req.body;
      const info = await General.findById(req.user.id);
      if (!info) {
        return ResponseHelper.error(
          res,
          "General Information not found",
          [],
          404,
        );
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
      const info = await General.findById(req.user.id);
  
      if (!info) {
        return ResponseHelper.error(
          res,
          "General information not found",
          [],
          404,
        );
      }
  
      info.subscribers = info.subscribers.filter((sub) => sub !== subscriber);
      await info.save();
      return ResponseHelper.success(res, "Subscriber removed successfully!");
    } catch {
      next(error);
    }
  };