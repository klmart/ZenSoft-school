// const StudentService = require('./student-service');
// import StudentService from './student-service';
// const TeachersRoleService = require('./teachers-role-service');
// import TeachersRoleService './teachers-role-service'

import Store from './store';
import Service from './service'

const studentGroups = new Store();

class StudentGroupService extends Service {

    static getStore(){
        return studentGroups;
    }

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

export default StudentGroupService;
import StudentGroup from '../models/student-group';