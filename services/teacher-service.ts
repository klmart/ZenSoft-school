import Store from './store';
import Service from './service'
import SubjectService from './subject-service';
import TeachersRoleService from './../services/teachers-role-service';
import Teacher from '../models/teacher';

const teachers = new Store();

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
export default TeacherService;
