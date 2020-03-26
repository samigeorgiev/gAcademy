// eslint-disable-next-line require-jsdoc
class User {
    // eslint-disable-next-line require-jsdoc
    constructor(id, email, password, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

module.exports = {
    User: User,
};
