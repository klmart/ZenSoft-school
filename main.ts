import Builder from './builder/builder';

import ParentService  from './services/parent-service';
import StudentService from './services/student-service';
import TeacherService from './services/teacher-service';
import SubjectService from './services/subject-service';
import PositionService from './services/position-service';
import BookService from'./services/book-service';
import StudentGroupService from './services/student-group-service';
// import TeachersRoleService from './services/teachers-role-service';
import FillDb from './builder/fill-db';

function getFields(store) {
    let firstObject = store.next().value;
    return Object.keys(firstObject);
}

function createParentSelect(selectDivId, selectListId) {
    let selectParent = document.getElementById(selectDivId);
    selectParent.innerHTML = '';

//Create array of options to be added
    const parents = ParentService.findAll();

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
                    })
                } else {
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
    return table
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
    const students = StudentService.findAll();
    const studentsTable = document.getElementById('studentsTable');
    studentsTable.innerHTML = '';
    const table = createTable(students, getFields(StudentService.findAll()), createStudentsTable,
        'createStudentEditButton');
    studentsTable.appendChild(table);
}

function createTeachersTable() {
    const teachers = TeacherService.findAll();
    const teachersTable = document.getElementById('teachersTable');
    teachersTable.innerHTML = '';
    const table = createTable(teachers, getFields(TeacherService.findAll()), createTeachersTable, 'ignore');
    teachersTable.appendChild(table);
}

function createSubjectsTable() {
    const subjects = SubjectService.findAll();
    let subjectsTable = document.getElementById('subjectsTable');
    subjectsTable.innerHTML = '';
    let table = createTable(subjects, getFields(SubjectService.findAll()), createSubjectsTable, 'ignore');
    subjectsTable.appendChild(table);
}

function createPositionsTable() {
    const positions = PositionService.findAll();
    const positionsTable = document.getElementById('positionsTable');
    positionsTable.innerHTML = '';
    const table = createTable(positions, getFields(PositionService.findAll()), createPositionsTable, 'ignore');
    positionsTable.appendChild(table);
}

function createParentsTable() {
    const parents = ParentService.findAll();
    const parentsTable = document.getElementById('parentsTable');
    parentsTable.innerHTML = '';
    const table = createTable(parents, getFields(ParentService.findAll()), createParentsTable, 'ignore');
    parentsTable.appendChild(table);
}

function createBooksTable() {
    const books = BookService.findAll();
    const booksTable = document.getElementById('booksTable');
    booksTable.innerHTML = '';
    const table = createTable(books, getFields(BookService.findAll()), createBooksTable, 'ignore');
    booksTable.appendChild(table);
}

function createSG() {
    const sg = StudentGroupService.findAll();
    const sgTable = document.getElementById('sgTable');
    sgTable.innerHTML = '';
    const table = createTable(sg, getFields(StudentGroupService.findAll()), createSG, 'ignore');
    sgTable.appendChild(table);
}

function getSelectedParent() {
    let parentSelect = document.getElementById('parentSelectList');
    let selected = parentSelect.options[parentSelect.selectedIndex].value;
    return ParentService.findById(+selected);
}

function createStudent() {
    console.log('111');
    // let parentSelect   = document.getElementById('parentSelectList');
    // let selected       = parentSelect.options[parentSelect.selectedIndex].value;
    // let selectedParent = Main.default.ParentService.findById(+selected);

    let parent = getSelectedParent();
    const studentForm = document.getElementById('studentForm');
    const student = StudentService.create(createObject(studentForm));
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
    Builder.run();
    FillDb.fill();
    createStudentsTable();
    createTeachersTable();
    createSubjectsTable();
    createParentsTable();
    createPositionsTable();
    createBooksTable();
    createSG();
};

export default {
    Run,
};