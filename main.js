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
parents.add(lyanna);
// lyanna.save()ParentService.add


let ned = ParentService.create({name: 'Ned Stark', contacts: '+ 1 1000 400', dateOfBirth: '1.01.1961'});
parents.add(ned);


// Students

let jon =  StudentService.create({name: 'Jon Targaryen', contacts: '+ 1 1000 100', dateOfBirth: '1.01.1980'});
students.add(jon);
jon.addParent(lyanna);

let arya = StudentService.create({name: 'Arya Stark', contacts: '+ 1 1000 200', dateOfBirth: '1.01.1992'});
students.add(arya);
arya.addParent(ned);

let ramsey = StudentService.create({name: 'Ramsey Snow', contacts: '+100 200 300', dateOfBirth: '12.04.1990'});
students.add(ramsey);

let jofri = StudentService.create({name: 'Jofri Barateon', contacts: '+100 200 320', dateOfBirth: '12.04.1993'});
students.add(jofri);



// Teachers
let john = TeacherService.create({name: 'John Doe', contacts: '+200100'});
teachers.add(john);
// john.addSubject(math);
// john.addPosition(director);

let katrine = TeacherService.create({name: 'Katrine Milley', contacts: '+300100299'});
teachers.add(katrine);
// katrine.addSubject(biology);
// katrine.addSubject(chemistry);
// katrine.addPosition(headTeacher);

// Subjects
let math = SubjectService.create('Math', 1, 3, 100);
subjects.add(math);
let biology = SubjectService.create('Biology', 2, 20, 130);
subjects.add(biology);

let chemistry = SubjectService.create('Chemistry', 6, 150);
subjects.add(chemistry);

// Positions
let director = PositionService.create('Director', 2);
positions.add(director);

let headTeacher = PositionService.create('Head Teacher', 2500);
positions.add(headTeacher);

// Groups
let group1E = StudentGroupService.create(1,'E');
studentGroups.add(group1E);
group1E.isActive = true;

let group2S = StudentGroupService.create(2,'S');
studentGroups.add(group2S);
group2S.isActive = true;


// Student Groups
StudentGroupService.addStudent(jon, '1 E');
StudentGroupService.addStudent(arya, '1 E');
StudentGroupService.addStudent(ramsey, '1 E');

StudentGroupService.addStudent(ramsey, '1 E');
StudentGroupService.addStudent(jofri, '2 S');


// Teachers Role
let johnMath = TeachersRoleService.create(john, math);
teachersRole.add(johnMath);


let JohnClassroomMaster = TeachersRoleService.create(john, classroomTeacher);
teachersRole.add(JohnClassroomMaster);

let katrineBiology = TeachersRoleService.create(katrine, biology);
teachersRole.add(katrineBiology);


StudentGroupService.addTeacherRole(johnMath, '1 E');
StudentGroupService.addTeacherRole(johnMath, '2 S');
StudentGroupService.addTeacherRole(JohnClassroomMaster, '1 E');
StudentGroupService.addTeacherRole(katrineBiology, '2 S');

console.log(TeacherService.salary(john));