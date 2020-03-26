// eslint-disable-next-line require-jsdoc
class Teacher {
    // eslint-disable-next-line require-jsdoc
    constructor(id, name, maxStudents) {
        this.id = id;
        this.name = name;
        this.maxStudents = maxStudents;
    }
}

module.exports = {
    Teacher: Teacher,
};
