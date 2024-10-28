import { MessageDTO } from "../dtos/message/messageDto.js";
import Message from "../models/messageModel.js";

export const addMessage = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
        return ResponseHelper.error(res, 'Title and description are required', [], 400);
        }
        const newMessage = new Message({
        title,
        description,
        });
    
        await newMessage.save();
        return ResponseHelper.success(res, 'Message added Successfully', { message: new MessageDTO(newMessage) });
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
            'Messages fetched successfully',
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
            return ResponseHelper.error(res, 'Message not found', [], 404);
        }
        return ResponseHelper.success(res, 'Message fetched successfully!', {
            message: new MessageDTO(message),
        });
    } catch (error) {
        next(error);
    }
};
export const removeMessage = async (req, res, next) => {};
export const updateMessage = async (req, res, next) => {};
