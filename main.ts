import Builder from './builder/builder';

import ParentService  from './services/parent-service';
import StudentService from './services/student-service';
import TeacherService from './services/teacher-service';
import SubjectService from './services/subject-service';
import PositionService from './services/position-service';
import BookService from'./services/book-service';
import StudentGroupService from './services/student-group-service';
import TeachersRoleService from './services/teachers-role-service';
import FillDb from './builder/fill-db';

 // Builder.run();

// FillDb.fill();

const Run = function myFunction() {
    document.getElementById('paragraph').innerHTML = 'Привет, Javasript';
};
export default {Run,ParentService, StudentService, TeacherService, SubjectService, PositionService, BookService, StudentGroupService, TeachersRoleService, Builder, FillDb};