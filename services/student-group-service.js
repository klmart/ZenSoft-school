const StudentService = require('./student-service');
const TeachersRoleService = require('./teachers-role-service');

const studentGroups = [];

class StudentGroupService {
    constructor() {
    }

    static create(level, groupNumber) {
        return new StudentGroup(level, groupNumber);
    }

    static addStudentGroup(sg) {
        studentGroups.push(sg);
    }

    static findByGroupName(name) {
        return studentGroups.find(function (studentGroup) {
            return studentGroup.groupName() === name;
        })
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

    static findAll() {
        let array = [];
        return array.concat(studentGroups);
    }

    static activeStudentGroups(){
        return studentGroups.filter(function (studentGroup) {
            return studentGroup.isActive;
        })
    }

}

module.exports = StudentGroupService;
const StudentGroup = require('../models/student-group');
