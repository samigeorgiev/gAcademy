// eslint-disable-next-line require-jsdoc
class User {
    // eslint-disable-next-line require-jsdoc
    constructor(id, email, password, firstName, lastName, accountType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
    }
}

module.exports = User;
