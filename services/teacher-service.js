const Store = require('./store');
teachers = new Store();

class TeacherService {

    static create(name, contacts) {
        return new Teacher(name, contacts);
    }

    static salary(teacher) {
        let subjectPayout = 0;
        let teacherRoles = TeachersRoleService.findTeacherRolesByTeacher(teacher);

        teacherRoles.forEach(function (teacherRole) {
            subjectPayout += SubjectService.getPayment(teacherRole.subject);
        });

        let positionPayout = 0;
        teacher.positions.forEach(function (position) {
            positionPayout += position.quote;
        });

        return (+subjectPayout) + (+positionPayout);

    }

}

module.exports = TeacherService;
const SubjectService = require('./subject-service');
const TeachersRoleService = require('../services/teachers-role-service');
const Teacher = require('../models/teacher');