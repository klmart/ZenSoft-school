define("builder/data/parent-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        lyanna: { name: 'Lyanna Stark', contacts: '+ 1 1000 101', dateOfBirth: '1.01.1972' },
        ned: { name: 'Ned Stark', contacts: '+ 1 1000 400', dateOfBirth: '1.01.1961' }
    };
});
define("services/store", ["require", "exports"], function (require, exports) {
    "use strict";
    class Store extends Map {
        constructor() {
            super(...arguments);
            this.counter = 1;
        }
        getNextId() {
            return this.counter++;
        }
        fillId(value) {
            if (!value.id) {
                value.id = this.getNextId();
            }
            return value;
        }
        add(value) {
            value = this.fillId(value);
            this.set(value.id, value);
        }
        findById(id) {
            return this.get(id);
        }
        removeById(id) {
            this.delete(id);
        }
        findBy(field, param) {
            let callBack;
            this.forEach(function (elem) {
                if (elem[field] === param) {
                    callBack = elem;
                }
            });
            return callBack;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Store;
});
define("services/service", ["require", "exports"], function (require, exports) {
    "use strict";
    class Service {
        static findAll() {
            return this.getStore().values();
        }
        getStore() {
            throw new Error('Must be implemented');
        }
        static add(value) {
            this.getStore().add(value);
        }
        static findBy(field, param) {
            return this.getStore().findBy(field, param);
        }
        static findById(id) {
            return this.getStore().findById(id);
        }
        static removeById(id) {
            this.getStore().removeById(id);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Service;
});
define("models/common/person", ["require", "exports"], function (require, exports) {
    "use strict";
    class Person {
        constructor(user) {
            this.setName(user.name);
            this.setContacts(user.contacts);
            this.setDateOfBirth(user.dateOfBirth);
            this.setActive(false);
        }
        setName(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
        setContacts(contacts) {
            this.contacts = contacts;
        }
        getContacts() {
            return this.contacts;
        }
        setDateOfBirth(date) {
            this.dateOfBirth = date;
        }
        getDateOfBirth() {
            return this.dateOfBirth;
        }
        // getAge(){
        //   // return Date.now - this.dateOfBrith;
        // }
        setActive(status) {
            this.isActive = status;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Person;
});
define("models/parent", ["require", "exports", "models/common/person", "services/parent-service"], function (require, exports, person_1, parent_service_1) {
    "use strict";
    class Parent extends person_1.default {
        constructor(name, contacts) {
            super(name, contacts);
            this.id;
        }
        remove() {
            parent_service_1.default.removeById(this.id);
        }
        save() {
            parent_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Parent;
});
define("services/parent-service", ["require", "exports", "services/store", "services/service", "models/parent"], function (require, exports, store_1, service_1, parent_1) {
    "use strict";
    const parents = new store_1.default();
    class ParentService extends service_1.default {
        static getStore() {
            return parents;
        }
        static create(name, contacts) {
            return new parent_1.default(name, contacts);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ParentService;
});
define("builder/parent-bulder", ["require", "exports", "builder/data/parent-data", "services/parent-service"], function (require, exports, parent_data_1, parent_service_2) {
    "use strict";
    class ParentBuilder {
        static fillParents() {
            for (let parent in parent_data_1.default) {
                parent_service_2.default.create(parent_data_1.default[parent]).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ParentBuilder;
});
define("builder/data/student-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        jon: { name: 'Jon Targaryen', contacts: '+ 1 1000 100', dateOfBirth: '1.01.1980' },
        arya: { name: 'Arya Stark', contacts: '+ 1 1000 200', dateOfBirth: '1.01.1992' },
        ramsey: { name: 'Ramsey Snow', contacts: '+100 200 300', dateOfBirth: '12.04.1990' },
        jofri: { name: 'Jofri Barateon', contacts: '+100 200 320', dateOfBirth: '12.04.1993' },
    };
});
define("models/student", ["require", "exports", "models/common/person", "services/student-service"], function (require, exports, person_2, student_service_1) {
    "use strict";
    class Student extends person_2.default {
        constructor(user) {
            super(user);
            this.parents = [];
        }
        setParents(parents) {
            this.parents = parents;
        }
        getParents() {
            return this.parents;
        }
        addParent(parent) {
            this.parents.push(parent);
        }
        remove() {
            student_service_1.default.removeById(this.id);
        }
        save() {
            student_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Student;
});
define("services/student-service", ["require", "exports", "services/store", "services/service", "models/student"], function (require, exports, store_2, service_2, student_1) {
    "use strict";
    const students = new store_2.default();
    class StudentService extends service_2.default {
        static getStore() {
            return students;
        }
        //ToDO: refactor
        static create(student) {
            return new student_1.default(student);
        }
        static findByName(name) {
            let callBack;
            students.forEach(function (student) {
                if (student.name === name) {
                    callBack = student;
                }
            });
            return callBack;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StudentService;
});
define("builder/student-bulder", ["require", "exports", "builder/data/student-data", "services/student-service"], function (require, exports, student_data_1, student_service_2) {
    "use strict";
    class StudentBuilder {
        static fillStudents() {
            for (let student in student_data_1.default) {
                student_service_2.default.create(student_data_1.default[student]).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StudentBuilder;
});
define("builder/data/teacher-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        john: { name: 'John Doe', dateOfBirth: '123123', contacts: '+200100' },
        katrine: { name: 'Katrine Milley', dateOfBirth: '023292093', contacts: '+300100299' }
    };
});
define("models/subject", ["require", "exports", "services/subject-service"], function (require, exports, subject_service_1) {
    "use strict";
    class Subject {
        constructor(name, level, hours, quote) {
            this.setName(name);
            this.setLevel(level);
            this.setHours(hours);
            this.setQuote(quote);
            this.books = [];
        }
        addBook(book) {
            this.books.push(book);
        }
        setName(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
        setLevel(level) {
            this.level = level;
        }
        getLevel() {
            return this.level;
        }
        setHours(hours) {
            this.hours = hours;
        }
        getHours() {
            return this.hours;
        }
        setQuote(quote) {
            this.quote = quote;
        }
        getQuote() {
            return this.quote;
        }
        addBook(book) {
            this.books.push(book);
        }
        getBooks() {
            return this.books;
        }
        remove() {
            subject_service_1.default.removeById(this.id);
        }
        save() {
            subject_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Subject;
});
define("services/subject-service", ["require", "exports", "services/store", "services/service", "models/subject"], function (require, exports, store_3, service_3, subject_1) {
    "use strict";
    const subjects = new store_3.default();
    class SubjectService extends service_3.default {
        static getStore() {
            return subjects;
        }
        static create(name, level, hours, quote) {
            return new subject_1.default(name, level, hours, quote);
        }
        static getPayment(subject) {
            return (+subject.quote) * (+subject.hours);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SubjectService;
});
// Надо удалить если будет все работать
// const Student = require('./student');
// const Teacher = require('./teacher');
// const TeachersRole = require('./teachers-role');
define("models/student-group", ["require", "exports", "services/student-group-service"], function (require, exports, student_group_service_1) {
    "use strict";
    class StudentGroup {
        constructor(level, name) {
            this.setLevel(level);
            this.setGroupNumber(name);
            this.students = [];
            this.teachersRole = [];
            this.isActive = false;
        }
        isActive(status) {
            this.isActive = status;
        }
        setLevel(level) {
            this.level = level;
        }
        getLevel() {
            return this.level;
        }
        setGroupNumber(number) {
            this.groupNumber = number;
        }
        getGroupNumber() {
            return this.groupNumber;
        }
        getStudents() {
            return this.students;
        }
        groupName() {
            return `${this.level} ${this.groupNumber}`;
        }
        remove() {
            student_group_service_1.default.removeById(this.id);
        }
        save() {
            student_group_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StudentGroup;
});
// const StudentService = require('./student-service');
// import StudentService from './student-service';
// const TeachersRoleService = require('./teachers-role-service');
// import TeachersRoleService './teachers-role-service'
define("services/student-group-service", ["require", "exports", "services/store", "services/service", "models/student-group"], function (require, exports, store_4, service_4, student_group_1) {
    "use strict";
    const studentGroups = new store_4.default();
    class StudentGroupService extends service_4.default {
        static getStore() {
            return studentGroups;
        }
        static create(level, groupNumber) {
            return new student_group_1.default(level, groupNumber);
        }
        static findByGroupName(name) {
            let group;
            studentGroups.forEach(function (studentGroup) {
                if (studentGroup.groupName() === name) {
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
        static activeStudentGroups() {
            let activeGroups = [];
            studentGroups.forEach(function (studentGroup) {
                if (studentGroup.isActive) {
                    activeGroups.push(studentGroup);
                }
            });
            return activeGroups;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StudentGroupService;
});
define("models/teachers-role", ["require", "exports", "services/teachers-role-service"], function (require, exports, teachers_role_service_1) {
    "use strict";
    class TeachersRole {
        constructor(teacher, subject) {
            this.setSubject(subject);
            this.setTeacher(teacher);
        }
        setSubject(subject) {
            this.subject = subject;
        }
        getSubject() {
            return this.subject;
        }
        setTeacher(teacher) {
            this.teacher = teacher;
        }
        getTeacher() {
            return this.teacher;
        }
        remove() {
            TeachersRole.removeById(this.id);
        }
        save() {
            teachers_role_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TeachersRole;
});
define("services/teachers-role-service", ["require", "exports", "services/store", "services/service", "services/student-group-service", "models/teachers-role"], function (require, exports, store_5, service_5, student_group_service_2, teachers_role_1) {
    "use strict";
    const teachersRole = new store_5.default;
    class TeachersRoleService extends service_5.default {
        static getStore() {
            return teachersRole;
        }
        static create(teacher, subject) {
            return new teachers_role_1.default(teacher, subject);
        }
        static addTeacherRole(teacherRole) {
            teachersRole.push(teacherRole);
        }
        static activeTeachersRoles() {
            let activeGroups = student_group_service_2.default.activeStudentGroups();
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
            });
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TeachersRoleService;
});
define("models/teacher", ["require", "exports", "models/common/person", "services/teacher-service"], function (require, exports, person_3, teacher_service_1) {
    "use strict";
    class Teacher extends person_3.default {
        constructor(name, contacts) {
            super(name, contacts);
            this.positions = [];
            this.subjects = [];
        }
        setSubjects(subjects) {
            this.subjects = subjects;
        }
        getSubjects() {
            return this.subjects;
        }
        addSubject(subject) {
            this.subjects.push(subject);
        }
        setPositions(positions) {
            this.positions = positions;
        }
        addPosition(position) {
            this.positions.push(position);
        }
        getPositions() {
            return this.positions;
        }
        remove() {
            teacher_service_1.default.removeById(this.id);
        }
        save() {
            teacher_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Teacher;
});
define("services/teacher-service", ["require", "exports", "services/store", "services/service", "services/subject-service", "services/teachers-role-service", "models/teacher"], function (require, exports, store_6, service_6, subject_service_2, teachers_role_service_2, teacher_1) {
    "use strict";
    const teachers = new store_6.default();
    class TeacherService extends service_6.default {
        static getStore() {
            return teachers;
        }
        static create(name, contacts) {
            return new teacher_1.default(name, contacts);
        }
        static salary(teacher) {
            let subjectPayout = 0;
            let teacherRoles = teachers_role_service_2.default.findTeacherRolesByTeacher(teacher);
            teacherRoles.forEach(function (teacherRole) {
                subjectPayout += subject_service_2.default.getPayment(teacherRole.subject);
            });
            let positionPayout = 0;
            teacher.positions.forEach(function (position) {
                positionPayout += position.quote;
            });
            return (+subjectPayout) + (+positionPayout);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TeacherService;
});
define("builder/teacher-builder", ["require", "exports", "builder/data/teacher-data", "services/teacher-service"], function (require, exports, teacher_data_1, teacher_service_2) {
    "use strict";
    class TeacherBuilder {
        static fillTeachers() {
            for (let teacher in teacher_data_1.default) {
                teacher_service_2.default.create(teacher_data_1.default[teacher]).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TeacherBuilder;
});
define("builder/data/subject-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        math: { name: 'Math', level: 1, hours: 3, quote: 100 },
        biology: { name: 'Biology', level: 2, hours: 20, quote: 130 },
        chemistry: { name: 'Chemistry', level: 6, hours: 150, quote: 120 }
    };
});
define("builder/subject-builder", ["require", "exports", "builder/data/subject-data", "services/subject-service"], function (require, exports, subject_data_1, subject_service_3) {
    "use strict";
    class SubjectBuilder {
        static fillSubjects() {
            for (let subject in subject_data_1.default) {
                subject_service_3.default.create(subject_data_1.default[subject].name, subject_data_1.default[subject].level, subject_data_1.default[subject].hours, subject_data_1.default[subject].quote).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SubjectBuilder;
});
define("builder/data/position-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        director: { name: 'Director', quote: 2 },
        headTeacher: { name: 'Head Teacher', quote: 2500 }
    };
});
define("models/position", ["require", "exports", "services/position-service"], function (require, exports, position_service_1) {
    "use strict";
    class Position {
        constructor(name, quote) {
            this.setQuote(quote);
            this.setName(name);
        }
        setQuote(quote) {
            this.quote = quote;
        }
        getQuote() {
            return this.quote;
        }
        setName(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
        remove() {
            position_service_1.default.removeById(this.id);
        }
        save() {
            position_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Position;
});
define("services/position-service", ["require", "exports", "services/store", "services/service", "models/position"], function (require, exports, store_7, service_7, position_1) {
    "use strict";
    const positions = new store_7.default();
    class PositionService extends service_7.default {
        static getStore() {
            return positions;
        }
        static create(quote, name) {
            return new position_1.default(quote, name);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PositionService;
});
define("builder/position-builder", ["require", "exports", "builder/data/position-data", "services/position-service"], function (require, exports, position_data_1, position_service_2) {
    "use strict";
    class PositionBuilder {
        static fillPositions() {
            for (let position in position_data_1.default) {
                position_service_2.default.create(position_data_1.default[position].name, position_data_1.default[position].quote).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PositionBuilder;
});
define("builder/data/group-data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        group1E: { level: 1, name: 'E' },
        group2S: { level: 2, name: 'S' }
    };
});
define("builder/group-builder", ["require", "exports", "builder/data/group-data", "services/student-group-service"], function (require, exports, group_data_1, student_group_service_3) {
    "use strict";
    class GroupBuilder {
        static fillGroups() {
            for (let group in group_data_1.default) {
                student_group_service_3.default.create(group_data_1.default[group].level, group_data_1.default[group].name).save();
            }
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GroupBuilder;
});
define("builder/builder", ["require", "exports", "builder/parent-bulder", "builder/student-bulder", "builder/teacher-builder", "builder/subject-builder", "builder/position-builder", "builder/group-builder"], function (require, exports, parent_bulder_1, student_bulder_1, teacher_builder_1, subject_builder_1, position_builder_1, group_builder_1) {
    "use strict";
    class Builder {
        static run() {
            parent_bulder_1.default.fillParents();
            student_bulder_1.default.fillStudents();
            teacher_builder_1.default.fillTeachers();
            subject_builder_1.default.fillSubjects();
            position_builder_1.default.fillPositions();
            group_builder_1.default.fillGroups();
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Builder;
});
define("models/book", ["require", "exports", "services/book-service"], function (require, exports, book_service_1) {
    "use strict";
    class Book {
        constructor(subject, name, level) {
            this.setSubject(subject);
            this.setName(name);
            this.setLevel(level);
        }
        setSubject(subject) {
            this.subject = subject;
        }
        getSubject() {
            return this.subject;
        }
        setName(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
        setLevel(level) {
            this.level = level;
        }
        getLevel() {
            return this.level;
        }
        remove() {
            book_service_1.default.removeById(this.id);
        }
        save() {
            book_service_1.default.add(this);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Book;
});
define("services/book-service", ["require", "exports", "services/store", "services/service", "models/book"], function (require, exports, store_8, service_8, book_1) {
    "use strict";
    const books = new store_8.default();
    class BookService extends service_8.default {
        static getStore() {
            return books;
        }
        static create(subject, name, level) {
            return new book_1.default(subject, name, level);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BookService;
});
define("builder/fill-db", ["require", "exports", "services/parent-service", "services/student-service", "services/teacher-service", "services/subject-service", "services/position-service", "services/book-service", "services/student-group-service", "services/teachers-role-service"], function (require, exports, parent_service_3, student_service_3, teacher_service_3, subject_service_4, position_service_3, book_service_2, student_group_service_4, teachers_role_service_3) {
    "use strict";
    const classroomTeacher = subject_service_4.default.create('classroomTeacher', null, 1, 1);
    class FillDb {
        static fill() {
            // Teachers add subjects
            let jonDoe = teacher_service_3.default.findBy('name', 'John Doe');
            let math = subject_service_4.default.findBy('name', 'Math');
            let director = position_service_3.default.findBy('name', 'Director');
            let biology = subject_service_4.default.findBy('name', 'Biology');
            jonDoe.addSubject(math);
            jonDoe.addSubject(biology);
            jonDoe.addPosition(director);
            let katrine = teacher_service_3.default.findBy('name', 'Katrine Milley');
            let chemistry = subject_service_4.default.findBy('name', 'Chemistry');
            let headTeacher = position_service_3.default.findBy('name', 'Head Teacher');
            katrine.addSubject(biology);
            katrine.addSubject(chemistry);
            katrine.addPosition(headTeacher);
            // // Groups
            let group1E = student_group_service_4.default.findByGroupName('1 E');
            group1E.isActive = true;
            let group2S = student_group_service_4.default.findByGroupName('2 S');
            group2S.isActive = true;
            //Parents
            const nedStark = parent_service_3.default.findBy('name', 'Ned Stark');
            //Students
            const jonTargaryen = student_service_3.default.findByName('Jon Targaryen');
            jonTargaryen.addParent(nedStark);
            // Student Groups
            student_group_service_4.default.addStudent(jonTargaryen, '1 E');
            student_group_service_4.default.addStudent(student_service_3.default.findByName('Arya Stark'), '1 E');
            student_group_service_4.default.addStudent(student_service_3.default.findByName('Ramsey Snow'), '1 E');
            student_group_service_4.default.addStudent(student_service_3.default.findByName('Ramsey Snow'), '2 S');
            student_group_service_4.default.addStudent(student_service_3.default.findByName('Jofri Barateon'), '2 S');
            // Teachers Role
            let johnMath = teachers_role_service_3.default.create(jonDoe, math);
            johnMath.save();
            let johnClassroomMaster = teachers_role_service_3.default.create(jonDoe, classroomTeacher);
            johnClassroomMaster.save();
            let katrineBiology = teachers_role_service_3.default.create(katrine, biology);
            katrineBiology.save();
            student_group_service_4.default.addTeacherRole(johnMath, '1 E');
            student_group_service_4.default.addTeacherRole(johnMath, '2 S');
            student_group_service_4.default.addTeacherRole(johnClassroomMaster, '1 E');
            student_group_service_4.default.addTeacherRole(katrineBiology, '2 S');
            // Books
            book_service_2.default.create(math, 'Mathematics', '5').save();
            book_service_2.default.create(biology, 'Biology', '3').save();
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FillDb;
});
define("main", ["require", "exports", "builder/builder", "services/parent-service", "services/student-service", "services/teacher-service", "services/subject-service", "services/position-service", "services/book-service", "services/student-group-service", "builder/fill-db"], function (require, exports, builder_1, parent_service_4, student_service_4, teacher_service_4, subject_service_5, position_service_4, book_service_3, student_group_service_5, fill_db_1) {
    "use strict";
    function getFields(store) {
        let firstObject = store.next().value;
        return Object.keys(firstObject);
    }
    function createParentSelect(selectDivId, selectListId) {
        let selectParent = document.getElementById(selectDivId);
        selectParent.innerHTML = '';
        //Create array of options to be added
        const parents = parent_service_4.default.findAll();
        //Create and append select list
        let selectList = document.createElement("select");
        selectList.setAttribute("id", selectListId);
        selectParent.appendChild(selectList);
        //Create and append the options
        for (let parent of parents) {
            let option = document.createElement("option");
            option.setAttribute("value", parent.id);
            option.text = parent.name;
            selectList.appendChild(option);
        }
    }
    function createStudentEditButton(object) {
        createParentSelect('modalParentSelect', 'modalParentSelectList');
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#myModal');
        button.onclick = function () {
            const studentForm = document.getElementById('modalEditStudent');
            studentForm.name.value = object.name;
            studentForm.contacts.value = object.contacts;
            studentForm.dateOfBirth.value = object.dateOfBirth;
            studentForm.updateStudent.innerHTML = 'Edit Student';
            studentForm.updateStudent.onclick = function () {
                object.addParent(getSelectedParent());
                object.setName(studentForm.name.value);
                object.setContacts(studentForm.contacts.value);
                object.setDateOfBirth(studentForm.dateOfBirth.value);
                createStudentsTable();
            };
        };
        button.innerHTML = 'Edit';
        td.appendChild(button);
        return td;
    }
    function createTable(store, tableFields, deleteActionCallback, editButtonCode) {
        tableFields.push('Actions');
        function createTd(value) {
            let td = document.createElement('td');
            td.textContent = '' + value;
            return td;
        }
        function createTh(value) {
            let th = document.createElement('th');
            th.textContent = '' + value;
            return th;
        }
        function createDeleteButton(object, deleteActionCallback) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.onclick = function () {
                removeObject(object, deleteActionCallback);
            };
            td.appendChild(button);
            return td;
        }
        const table = document.createElement('table');
        table.className = "table table-bordered";
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tr = document.createElement('tr');
        thead.appendChild(tr);
        tableFields.forEach(function (field) {
            let th = createTh(field);
            tr.appendChild(th);
        });
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for (let object of store) {
            let trb = document.createElement('tr');
            Object.getOwnPropertyNames(object)
                .forEach(function (val) {
                const value = object[val];
                if (value instanceof Array) {
                    if (value.length == 0) {
                        trb.appendChild(createTd(value));
                    }
                    let td = document.createElement('td');
                    value.forEach(function (element) {
                        //ToDo: Удалить проверку на элемент
                        if (element) {
                            // tdA.appendChild(document.createTextNode(element.name));
                            td.appendChild(createTd(element.name));
                        }
                        trb.appendChild(td);
                    });
                }
                else {
                    const td = createTd(value);
                    trb.appendChild(td);
                }
            });
            trb.appendChild(createDeleteButton(object, deleteActionCallback));
            if (editButtonCode == 'createStudentEditButton') {
                trb.appendChild(createStudentEditButton(object));
            }
            tbody.appendChild(trb);
        }
        return table;
    }
    function createObject(form) {
        const object = {};
        for (let i = 0; i < form.length; i++) {
            object[form.elements[i].name] = form.elements[i].value;
            form[i].value = '';
        }
        return object;
    }
    function removeObject(object, callback) {
        object.remove();
        callback();
        // createStudentsTable();
        // createTeachersTable();
        // createSubjectsTable();
        // createParentsTable();
        // createPositionsTable();
        // createBooksTable();
    }
    function createStudentsTable() {
        createParentSelect('parentSelect', 'parentSelectList');
        const students = student_service_4.default.findAll();
        const studentsTable = document.getElementById('studentsTable');
        studentsTable.innerHTML = '';
        const table = createTable(students, getFields(student_service_4.default.findAll()), createStudentsTable, 'createStudentEditButton');
        studentsTable.appendChild(table);
    }
    function createTeachersTable() {
        const teachers = teacher_service_4.default.findAll();
        const teachersTable = document.getElementById('teachersTable');
        teachersTable.innerHTML = '';
        const table = createTable(teachers, getFields(teacher_service_4.default.findAll()), createTeachersTable, 'ignore');
        teachersTable.appendChild(table);
    }
    function createSubjectsTable() {
        const subjects = subject_service_5.default.findAll();
        let subjectsTable = document.getElementById('subjectsTable');
        subjectsTable.innerHTML = '';
        let table = createTable(subjects, getFields(subject_service_5.default.findAll()), createSubjectsTable, 'ignore');
        subjectsTable.appendChild(table);
    }
    function createPositionsTable() {
        const positions = position_service_4.default.findAll();
        const positionsTable = document.getElementById('positionsTable');
        positionsTable.innerHTML = '';
        const table = createTable(positions, getFields(position_service_4.default.findAll()), createPositionsTable, 'ignore');
        positionsTable.appendChild(table);
    }
    function createParentsTable() {
        const parents = parent_service_4.default.findAll();
        const parentsTable = document.getElementById('parentsTable');
        parentsTable.innerHTML = '';
        const table = createTable(parents, getFields(parent_service_4.default.findAll()), createParentsTable, 'ignore');
        parentsTable.appendChild(table);
    }
    function createBooksTable() {
        const books = book_service_3.default.findAll();
        const booksTable = document.getElementById('booksTable');
        booksTable.innerHTML = '';
        const table = createTable(books, getFields(book_service_3.default.findAll()), createBooksTable, 'ignore');
        booksTable.appendChild(table);
    }
    function createSG() {
        const sg = student_group_service_5.default.findAll();
        const sgTable = document.getElementById('sgTable');
        sgTable.innerHTML = '';
        const table = createTable(sg, getFields(student_group_service_5.default.findAll()), createSG, 'ignore');
        sgTable.appendChild(table);
    }
    function getSelectedParent() {
        let parentSelect = document.getElementById('parentSelectList');
        let selected = parentSelect.options[parentSelect.selectedIndex].value;
        return parent_service_4.default.findById(+selected);
    }
    function createStudent() {
        console.log('111');
        // let parentSelect   = document.getElementById('parentSelectList');
        // let selected       = parentSelect.options[parentSelect.selectedIndex].value;
        // let selectedParent = Main.default.ParentService.findById(+selected);
        let parent = getSelectedParent();
        const studentForm = document.getElementById('studentForm');
        const student = student_service_4.default.create(createObject(studentForm));
        student.addParent(parent);
        student.save();
        createStudentsTable();
        // this.parentNode.remove();
    }
    function createTeacher() {
        let teacherForm = document.getElementById('teacherForm');
        // let teacher = TeacherService.create(createObject(teacherForm));
        teacher.save();
        createTeachersTable();
    }
    // let element = document.getElementById('createStudentButton');
    // element.addEventListener('click', createStudent);
    const Run = function myFunction() {
        console.log('start Run');
        // document.getElementById('paragraph').innerHTML = 'Привет, Javasript';
        builder_1.default.run();
        fill_db_1.default.fill();
        createStudentsTable();
        createTeachersTable();
        createSubjectsTable();
        createParentsTable();
        createPositionsTable();
        createBooksTable();
        createSG();
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Run,
    };
});
