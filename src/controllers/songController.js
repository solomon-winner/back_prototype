import { SongDTO } from "../dtos/song/songDto.js";
import Song from "../models/songsModel.js";
import ResponseHelper from "../helpers/responseHelper.js";

export const addSong = async (req, res, next) => {
  try {
    const { title, link, albums, img } = req.body;
    if (!title || !link || !albums || !img) {
      return ResponseHelper.error(
        res,
        "Title, link, albums and img are required",
        [],
        400,
      );
    }
    const newSong = new Song({
      title,
      link,
      albums,
      img,
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
    const existingSong = await Song.findById(req.params.id);
    if (!existingSong) {
      return ResponseHelper.error(res, "Song doesn't exist!", [], 400);
    }
    const song = await Song.findByIdAndDelete(req.params.id);
    return ResponseHelper.success(res, "Song deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateSong = async (req, res, next) => {
  try {
    const { id, title, link, albums, img } = req.body;
    const song = await Song.findById(id);
    if (!song) {
      return ResponseHelper.error(res, "Song not found", [], 404);
    }

    song.title = title;
    song.link = link;
    song.albums = albums;
    song.img = img;

    await song.save();

    return ResponseHelper.success(res, "Song updated successfully", {
      song: new SongDTO(song),
    });
  } catch (error) {
    next(error);
  }
};
