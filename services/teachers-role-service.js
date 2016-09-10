const TeachersRole = require('../models/teachers-role');

const teachersRole = [];

class TeachersRoleService {
    constructor() {
    }

    static addTeacherRole(teacherRole) {
        teachersRole.push(teacherRole);
    }

    static findTeacherRolesByTeacher(teacher) {
        return teachersRole.filter(function (teacherRole) {
            return teacherRole.teacher === teacher;
        })
    }

}

module.exports = TeachersRoleService;