// eslint-disable-next-line require-jsdoc
class Course {
    // eslint-disable-next-line require-jsdoc
    constructor(id, name, duration, teacher, category) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.teacher = teacher;
        this.category = category;
    }
}

module.exports = Course;
