const Parent = require('./models/parent');
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Subject = require('./models/subject');
const Position = require('./models/position');
const Book = require('./models/book');
const StudentGroup = require('./models/student-group');
const TeachersRole = require('./models/teachers-role');

const ParentService = require('./services/parent-service');
const StudentService = require('./services/student-service');
const TeacherService = require('./services/teacher-service');
const SubjectService = require('./services/subject-service');
const PositionService = require('./services/position-service');
const BookService = require('./services/book-service');
const StudentGroupService = require('./services/student-group-service');
const TeachersRoleService = require('./services/teachers-role-service');
const classroomTeacher = new Subject('classroomTeacher', null, 1, 2000);

// Parents
let lyanna = new Parent({name: 'Lyanna Stark', contacts: '+ 1 1000 101', dateOfBirth: '1.01.1972'});
lyanna.save();

// let lyanna = ParentService.create({name: 'Lyanna Stark', contacts: '+ 1 1000 101', dateOfBirth: '1.01.1972'});
// lyanna.save();

let ned = new Parent({name: 'Ned Stark', contacts: '+ 1 1000 400', dateOfBirth: '1.01.1961'});
ned.save();

// Students
let jon =  new Student({name: 'Jon Targaryen', contacts: '+ 1 1000 100', dateOfBirth: '1.01.1980'});
jon.save();
jon.addParent(lyanna);


let arya = new Student({name: 'Arya Stark', contacts: '+ 1 1000 200', dateOfBirth: '1.01.1992'});
arya.save();
arya.addParent(ned);

let ramsey = new Student({name: 'Ramsey Snow', contacts: '+100 200 300', dateOfBirth: '12.04.1990'});

let jofri = new Student({name: 'Jofri Barateon', contacts: '+100 200 320', dateOfBirth: '12.04.1993'});

// Groups
let group1E = new StudentGroup(1,'E');
group1E.save();

let group2S = new StudentGroup(2,'S');
group2S.save();

// Student Groups
StudentGroupService.addStudent(jon, '1 E');
StudentGroupService.addStudent(arya, '1 E');
StudentGroupService.addStudent(ramsey, '1 E');

StudentGroupService.addStudent(ramsey, '1 E');
StudentGroupService.addStudent(jofri, '2 S');

// Subjects
let math = new Subject('Math', 1, 30, 160);
math.save();

let biology = new Subject('Biology', 2, 20, 130);
biology.save();

let chemistry = new Subject('Chemistry', 6, 150);

// Positions
let director = new Position('Director', 3000);
director.save();

let headTeacher = new Position('Head Teacher', 2500);
headTeacher.save();

// Teachers
let john = new Teacher({name: 'John Doe', contacts: '+200100'});
john.save();
john.addSubject(math);
john.addPosition(director);

let katrine = new Teacher({name: 'Katrine Milley', contacts: '+300100299'});
katrine.save();
katrine.addSubject(biology);
katrine.addSubject(chemistry);
katrine.addPosition(headTeacher);


// Teachers Role
let johnMath = new TeachersRole(john, math);
TeachersRoleService.addTeacherRole(johnMath);
// johnMath.save();


let JohnClassroomMaster = new TeachersRole(john, classroomTeacher);
TeachersRoleService.addTeacherRole(JohnClassroomMaster);

let katrineBiology = new TeachersRole(katrine, biology);
TeachersRoleService.addTeacherRole(katrineBiology);


StudentGroupService.addTeacherRole(johnMath, '1 E');
StudentGroupService.addTeacherRole(JohnClassroomMaster, '1 E');
StudentGroupService.addTeacherRole(katrineBiology, '2 S');

// console.log(TeacherService.salary(katrine));
console.log(TeacherService.salary(john));
