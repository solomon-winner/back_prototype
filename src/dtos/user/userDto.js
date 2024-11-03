export class UserDTO {
    constructor({_id, firstName, lastName, email, createdAt, updatedAt} ) {
        this.id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
