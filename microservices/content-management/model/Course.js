// eslint-disable-next-line require-jsdoc
class Course {
    // eslint-disable-next-line require-jsdoc
    constructor(id, title, description, creator) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creator = creator;
    }
}

module.exports = {
    Course: Course,
};
