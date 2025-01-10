import { SongDTO } from "../dtos/song/songDto.js";
import Song from "../models/songsModel.js";
import ResponseHelper from "../helpers/responseHelper.js";
import { ImageLink } from "../services/ImageLink.js";
import path from 'path';
import fs from 'fs/promises';

export const addSong = async (req, res, next) => {
  try {

    if (req.headers['content-type'].includes('multipart/form-data')) {
      console.log('The form is submitted as multipart/form-data');
    }
    else {
      console.log('The form is not submitted as multipart/form-data');
      return ResponseHelper.error(res, 'The form is not submitted as multipart/form-data', [], 400);
    }

    const { 
      title, 
      youtubeLink, 
      spotifyLink, 
      appleMusicLink, 
      amazonLink, 
      albums
     } = req.body;

     if (!req.file) {
      return ResponseHelper.error(res, 'Please upload an image', [], 400);
  }

  const ImagePath = ImageLink(
      `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`,
  );
  await fs.writeFile(ImagePath, req.file.buffer);

    if (!title || !youtubeLink) {
      console.log('req.body:', req.body)

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
      img: ImagePath, 
      albums,
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
    const songs = await Song.find({});
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
    return ResponseHelper.success(res, "Song deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, youtube_link, spotifyLink, appleMusicLink, amazonLink, img, albums } = req.body;

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, youtube_link, spotifyLink, appleMusicLink, amazonLink, img, albums },
      { new: true }
    );

    if (!updatedSong) {
      return ResponseHelper.error(res, "Song not found", [], 404);
    }

    return ResponseHelper.success(res, "Song updated successfully", {
      song: new SongDTO(song),
    });
  } catch (error) {
    next(error);
  }
};
