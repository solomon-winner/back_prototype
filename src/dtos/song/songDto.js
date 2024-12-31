export class SongDTO {
  constructor({_id, title,youtube_link, spotifyLink, appleMusicLink, amazonLink, img, albums, createdAt, updatedAt}) {
    this.id = _id;
    this.title = title;
    this.youtube_link = youtube_link;
    this.spotifyLink = spotifyLink;
    this.appleMusicLink = appleMusicLink;
    this.amazonLink = amazonLink;
    this.img = img;
    this.type = albums;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
