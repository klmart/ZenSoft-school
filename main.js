
const ParentService = require('./services/parent-service');
const StudentService = require('./services/student-service');
const TeacherService = require('./services/teacher-service');
const SubjectService = require('./services/subject-service');
const PositionService = require('./services/position-service');
const BookService = require('./services/book-service');
const StudentGroupService = require('./services/student-group-service');
const TeachersRoleService = require('./services/teachers-role-service');

const classroomTeacher = SubjectService.create('classroomTeacher', null, 1, 1);

// Parents

let lyanna = ParentService.create({name: 'Lyanna Stark', contacts: '+ 1 1000 101', dateOfBirth: '1.01.1972'});
lyanna.save();

let ned = ParentService.create({name: 'Ned Stark', contacts: '+ 1 1000 400', dateOfBirth: '1.01.1961'});
ned.save();

// Students

let jon =  StudentService.create({name: 'Jon Targaryen', contacts: '+ 1 1000 100', dateOfBirth: '1.01.1980'});
jon.save();
jon.addParent(lyanna);

let arya = StudentService.create({name: 'Arya Stark', contacts: '+ 1 1000 200', dateOfBirth: '1.01.1992'});
arya.save();
arya.addParent(ned);

let ramsey = StudentService.create({name: 'Ramsey Snow', contacts: '+100 200 300', dateOfBirth: '12.04.1990'});
ramsey.save();

let jofri = StudentService.create({name: 'Jofri Barateon', contacts: '+100 200 320', dateOfBirth: '12.04.1993'});
jofri.save();


// Groups
let group1E = StudentGroupService.create(1,'E');
group1E.save();
group1E.isActive = true;

let group2S = StudentGroupService.create(2,'S');
group2S.save();
// group2S.isActive = true;

// Student Groups
StudentGroupService.addStudent(jon, '1 E');
StudentGroupService.addStudent(arya, '1 E');
StudentGroupService.addStudent(ramsey, '1 E');

StudentGroupService.addStudent(ramsey, '1 E');
StudentGroupService.addStudent(jofri, '2 S');

// Subjects
let math = SubjectService.create('Math', 1, 3, 100);
math.save();
let biology = SubjectService.create('Biology', 2, 20, 130);
biology.save();

let chemistry = SubjectService.create('Chemistry', 6, 150);
chemistry.save();

// Positions
let director = PositionService.create('Director', 2);
director.save();

let headTeacher = PositionService.create('Head Teacher', 2500);
headTeacher.save();

// Teachers
let john = TeacherService.create({name: 'John Doe', contacts: '+200100'});
john.save();
john.addSubject(math);
john.addPosition(director);

let katrine = TeacherService.create({name: 'Katrine Milley', contacts: '+300100299'});
katrine.save();
katrine.addSubject(biology);
katrine.addSubject(chemistry);
katrine.addPosition(headTeacher);


// Teachers Role
let johnMath = TeachersRoleService.create(john, math);
johnMath.save();


let JohnClassroomMaster = TeachersRoleService.create(john, classroomTeacher);
JohnClassroomMaster.save();

let katrineBiology = TeachersRoleService.create(katrine, biology);
katrineBiology.save();

StudentGroupService.addTeacherRole(johnMath, '1 E');
StudentGroupService.addTeacherRole(johnMath, '2 S');
StudentGroupService.addTeacherRole(JohnClassroomMaster, '1 E');
StudentGroupService.addTeacherRole(katrineBiology, '2 S');

//
// console.log(TeacherService.salary(katrine));
// console.log(group2S.teachersRole);
// console.log(group2S);
// console.log(group1E.isActive);
console.log(TeacherService.salary(john));
