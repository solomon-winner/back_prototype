import { MessageDTO } from "../dtos/message/messageDto.js";
import Message from "../models/messageModel.js";
import ResponseHelper from "../helpers/responseHelper.js";

export const addMessage = async (req, res, next) => {
  try {
    const { sm, message } = req.body;
    if (!sm || !message) {
      return ResponseHelper.error(
        res,
        "Title and description are required",
        [],
        400,
      );
    }
    const newMessage = new Message({
      sm,
      message,
    });

    await newMessage.save();
    return ResponseHelper.success(res, "Message added Successfully", {
      message: new MessageDTO(newMessage),
    });
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({});
    const messagesDtos = messages.map((message) => new MessageDTO(message));
    return ResponseHelper.success(
      res,
      "Messages fetched successfully",
      messagesDtos,
    );
  } catch (error) {
    next(error);
  }
};
export const getMessage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await Message.findById(id);
    if (!message) {
      return ResponseHelper.error(res, "Message not found", [], 404);
    }
    return ResponseHelper.success(res, "Message fetched successfully!", {
      message: new MessageDTO(message),
    });
  } catch (error) {
    next(error);
  }
};
export const removeMessage = async (req, res, next) => {
  try {
    const existingMessage = await Message.findById(req.params.id);
    if (!existingMessage) {
      return ResponseHelper.error(res, "Message doesn't exist!", [], 400);
    }
    const message = await Message.findByIdAndDelete(req.params.id);
    return ResponseHelper.success(res, "Message deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateMessage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const message = await Message.findById(req.params.id);
    if (!message) {
      return ResponseHelper.error(res, "Message not found", [], 404);
    }
    message.title = title;
    message.description = description;
    await message.save();
    return ResponseHelper.success(res, "Message updated successfully", {
      message: new MessageDTO(message),
    });
  } catch (error) {
    next(error);
  }
};
