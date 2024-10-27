export class SongDTO {
    constructor(_id, title, link, img, albums,createdAt, updatedAt ) {
        this.id = _id;
        this.title = title;
        this.link = link;
        this.img = img;
        this.type = albums;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}