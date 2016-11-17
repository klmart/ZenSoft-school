import Store from './store';
import Service from './service'
import StudentGroupService from 'student-group-service';
import TeachersRole from '../models/teachers-role';

const teachersRole = new Store;

class TeachersRoleService extends Service {

    static getStore(){
        return teachersRole;
    }

    static create(teacher, subject){
        return new TeachersRole(teacher, subject);
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

export default TeachersRoleService;
