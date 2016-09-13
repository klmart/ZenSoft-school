const TeachersRole = require('../models/teachers-role');
const StudentGroupService = require('../services/student-group-service');

const teachersRole = [];

class TeachersRoleService {
    constructor() {
    }

    static addTeacherRole(teacherRole) {
        teachersRole.push(teacherRole);
    }

    static activeTeachersRoles() {
        let activeGroups = StudentGroupService.activeStudentGroups();
        let activeTeachersRoles = [];

        activeGroups.forEach(function (studentGroup) {
            // Надо сделать через concat
            // activeTeachersRoles.concat(studentGroup.teachersRole);
            studentGroup.teachersRole.forEach(function (teacherRole) {
                activeTeachersRoles.push(teacherRole);
            });

        });

        return activeTeachersRoles;
    }

    static findTeacherRolesByTeacher(teacher) {
        let activeTeachersRoles = TeachersRoleService.activeTeachersRoles();

        return activeTeachersRoles.filter(function (teacherRole) {
            return teacherRole.teacher === teacher;
        })
    }

}

module.exports = TeachersRoleService;