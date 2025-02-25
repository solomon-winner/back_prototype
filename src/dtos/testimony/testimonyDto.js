export class TestimonyDTO {
  constructor({_id, testifierName,email, testimony, createdAt, updatedAt}) {
    this.id = _id;
    this.testifierName = testifierName;
    this.email = email;
    this.testimony = testimony;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
