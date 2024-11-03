export class TestimonyDTO {
  constructor({_id, email, testimony, createdAt, updatedAt}) {
    this.id = _id;
    this.email = email;
    this.testimony = testimony;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
