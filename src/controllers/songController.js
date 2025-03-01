import { SongDTO } from "../dtos/song/songDto.js";
import Song from "../models/songsModel.js";
import ResponseHelper from "../helpers/responseHelper.js";
import { ImageLink } from "../services/ImageLink.js";
import path from 'path';
import fs from 'fs/promises';

export const addSong = async (req, res, next) => {
  try {
    const { 
      title, 
      youtubeLink, 
      spotifyLink, 
      appleMusicLink, 
      amazonLink, 
      songs,
      type
     } = req.body;
     if (!req.file) {
      return ResponseHelper.error(res, 'Please upload an image', [], 400);
  }

  const { fullPath, relativePath }  = ImageLink(
      `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`,
  );
  await fs.writeFile(fullPath, req.file.buffer);

    if (!title || !youtubeLink) {

      return ResponseHelper.error(
        res,
        "Title, link, albums, and img are required",
        [],
        400,
      );
    }
    
    const newSong = new Song({
      title,
      youtubeLink,
      spotifyLink,
      appleMusicLink,
      amazonLink,
      img: relativePath, 
      albums:songs,
      type
    });

    await newSong.save();

    return ResponseHelper.success(res, "Song added successfully!", {
      song: new SongDTO(newSong),
    });
  } catch (error) {
    next(error);
  }
};


export const getSongs = async (req, res, next) => {
  try {
    const { type } = req.query; 
    const songs = await Song.find({type: type});
    const songsDtos = songs.map((song) => new SongDTO(song));
    return ResponseHelper.success(res, "Songs fetched successfully", songsDtos);
  } catch (error) {
    next(error);
  }
};

export const getSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const song = await Song.findById(id);
    if (!song) {
      return ResponseHelper.error(res, "Song not found", [], 404);
    }
    return ResponseHelper.success(res, "Song fetched successfully!", {
      song: new SongDTO(song),
    });
  } catch (error) {
    next(error);
  }
};

export const removeSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndDelete(id);
    
    if (!deletedSong) {
      return ResponseHelper.error(res, "Song doesn't exist!", [], 400);
    }

    // Delete associated image file if it exists
    if (deletedSong.img) {
      try {
        // Construct the absolute path to the image file
        const imagePath = path.join(process.cwd(), 'public', deletedSong.img);
        await fs.unlink(imagePath);
      } catch (err) {
        console.error('Error deleting image file:', err.message);
        // Optionally log the error but do not interrupt the response
      }
    }

    return ResponseHelper.success(res, "Song deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, youtubeLink, spotifyLink, appleMusicLink, amazonLink, songs } = req.body;
    // Find the song by ID
    const updatedSong = await Song.findOne({ _id: id });
    if (!updatedSong) {
      return ResponseHelper.error(res, "Song not found", [], 404);
    }

    // Update the song fields
    updatedSong.title = title || updatedSong.title;
    updatedSong.youtubeLink = youtubeLink || updatedSong.youtubeLink;
    updatedSong.spotifyLink = spotifyLink || updatedSong.spotifyLink;
    updatedSong.appleMusicLink = appleMusicLink || updatedSong.appleMusicLink;
    updatedSong.amazonLink = amazonLink || updatedSong.amazonLink;
    updatedSong.albums = songs || updatedSong.albums;

    // Handle file upload (if a new file is provided)
    if (req.file) {
      // Delete the old file if it exists
      if (updatedSong.img) {
        const oldFilePath = path.resolve(updatedSong.img);
        try {
          await fs.access(oldFilePath);
          await fs.unlink(oldFilePath);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error; // Re-throw if the error is not "file not found"
          }
        }
      }
      const { fullPath, relativePath } = ImageLink(
        `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`,
    );
    await fs.writeFile(fullPath, req.file.buffer);
      // Save the new file path
      updatedSong.img = relativePath; // Assuming multer saves the file and provides the path
    }

    // Save the updated song
    await updatedSong.save();

    // Return success response
    return ResponseHelper.success(res, "Song updated successfully", {
      song: new SongDTO(updatedSong),
    });
  } catch (error) {
    next(error);
  }
};
