import ParentService  from '../services/parent-service';
import StudentService from '../services/student-service';
import TeacherService from '../services/teacher-service';
import SubjectService from '../services/subject-service';
import PositionService from '../services/position-service';
import BookService from '../services/book-service';
import StudentGroupService from '../services/student-group-service';
import TeachersRoleService from '../services/teachers-role-service';

const classroomTeacher = SubjectService.create('classroomTeacher', null, 1, 1);

class FillDb {
    static fill() {
        console.log('start filld db');

        // Teachers add subjects
        let jonDoe = TeacherService.findBy('name', 'John Doe');
        let math = SubjectService.findBy('name', 'Math');
        let director = PositionService.findBy('name', 'Director');
        jonDoe.addSubject(math);
        jonDoe.addPosition(director);

        let katrine = TeacherService.findBy('name', 'Katrine Milley');
        let biology = TeacherService.create('name', 'Biology');
        let chemistry = TeacherService.create('name', 'Chemistry');
        let headTeacher = TeacherService.findBy('name', 'Head Teacher');
        katrine.addSubject(biology);
        katrine.addSubject(chemistry);
        katrine.addPosition(headTeacher);


// // Groups
        let group1E = StudentGroupService.findByGroupName('1 E');
        group1E.isActive = true;

        let group2S = StudentGroupService.findByGroupName('2 S');
        group2S.isActive = true;

// Student Groups
        StudentGroupService.addStudent(StudentService.findByName('Jon Targaryen'), '1 E');
        StudentGroupService.addStudent(StudentService.findByName('Arya Stark'), '1 E');
        StudentGroupService.addStudent(StudentService.findByName('Ramsey Snow'), '1 E');

        StudentGroupService.addStudent(StudentService.findByName('Ramsey Snow'), '2 S');
        StudentGroupService.addStudent(StudentService.findByName('Jofri Barateon'), '2 S');

// Teachers Role
        let johnMath = TeachersRoleService.create(jonDoe, math);
        johnMath.save();

        let johnClassroomMaster = TeachersRoleService.create(jonDoe, classroomTeacher);
        johnClassroomMaster.save();

        let katrineBiology = TeachersRoleService.create(katrine, biology);
        katrineBiology.save();

        StudentGroupService.addTeacherRole(johnMath, '1 E');
        StudentGroupService.addTeacherRole(johnMath, '2 S');
        StudentGroupService.addTeacherRole(johnClassroomMaster, '1 E');
        StudentGroupService.addTeacherRole(katrineBiology, '2 S');
    }
}
export default FillDb;