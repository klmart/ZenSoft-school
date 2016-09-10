const Teacher = require('../models/teacher');
const SubjectService = require('./subject-service');
const TeachersRoleService = require('../services/teachers-role-service');

const teachers = [];

class TeacherService {
  constructor() {
  }

  static add(teacher){
    teachers.push(teacher);
  }

  static findAll(){
    let array  =[];
    return array.concat(teachers);
  }



  static salary(teacher){
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