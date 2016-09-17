const StudentService = require('./student-service');
const TeachersRoleService = require('./teachers-role-service');
const Store = require('./store');
studentGroups = new Store();

class StudentGroupService {

    static create(level, groupNumber) {
        return new StudentGroup(level, groupNumber);
    }

    static findByGroupName(name) {
        let group;

        studentGroups.forEach(function (studentGroup) {
            if(studentGroup.groupName() === name){
                group = studentGroup;
            }
        });
        return group;
    }

    static addStudent(student, groupName) {
        let group = StudentGroupService.findByGroupName(groupName);
        group.students.push(student);
    }

    static addTeacherRole(teacherRole, groupName) {
        let group = StudentGroupService.findByGroupName(groupName);
        group.teachersRole.push(teacherRole);
    }

    static findTeachers(group) {
        let teachers = [];
        group.teachersRole.forEach(function (teacherRole) {
            teachers.push(teacherRole.teacher);
        });
        return teachers;
    }

    static getStudents(name) {
        let group = StudentGroupService.findByGroupName(name);
        return group.students;
    }

    static activeStudentGroups(){
        let activeGroups = [];
        studentGroups.forEach(function (studentGroup) {
            if (studentGroup.isActive){
                activeGroups.push(studentGroup);
            }
        });
        return activeGroups;
    }
}

module.exports = StudentGroupService;
const StudentGroup = require('../models/student-group');
