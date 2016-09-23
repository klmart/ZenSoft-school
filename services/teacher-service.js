const Store = require('./store');
const Service = require('./service');

teachers = new Store();

class TeacherService extends Service {

    static getStore(){
        return teachers;
    }

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