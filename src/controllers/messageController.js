import { MessageDTO } from "../dtos/message/messageDto.js";
import ResponseHelper from "../helpers/responseHelper.js";
import Messages from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
  try {

    const { sm, message } = req.body;
    if (!sm || !message) {
      return ResponseHelper.error(
        res,
        "Fill all fields please!",
        [],
        400,
      );
    }
    const newMessage = new Messages({
      sm,
      message,
    });

    await newMessage.save();
    return ResponseHelper.success(res, "Message added Successfully", new MessageDTO(newMessage));
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({});
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
    const message = await Messages.findById(id);
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
    const existingMessage = await Messages.findById(req.params.id);
    if (!existingMessage) {
      return ResponseHelper.error(res, "Message doesn't exist!", [], 400);
    }
    const message = await Messages.findByIdAndDelete(req.params.id);
    return ResponseHelper.success(res, "Message deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateMessage = async (req, res, next) => {
  try {
    const { message, sm } = req.body;
    const Message = await Messages.findById(req.params.id);
    if (!message) {
      return ResponseHelper.error(res, "Message not found", [], 404);
    }
    Message.message = message;
    if (sm) {
      Message.sm = sm;
    }
    await Message.save();
    return ResponseHelper.success(res, "Message updated successfully", {
      Message: new MessageDTO(Message),
    });
  } catch (error) {
    next(error);
  }
};
