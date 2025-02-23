export class SongDTO {
  constructor({_id, title,youtubeLink, spotifyLink, appleMusicLink, amazonLink, img, albums, type, createdAt, updatedAt}) {
    this.id = _id;
    this.title = title;
    this.youtubeLink = youtubeLink;
    this.spotifyLink = spotifyLink;
    this.appleMusicLink = appleMusicLink;
    this.amazonLink = amazonLink;
    this.img = img;
    this.songs = albums;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
