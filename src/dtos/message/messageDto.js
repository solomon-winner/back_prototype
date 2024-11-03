export class MessageDTO {
  constructor({_id, link, message, img, sm, createdAt, updatedAt}) {
    this.id = _id;
    this.message = message;
    this.link = link;
    this.img = img;
    this.sm = sm;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
