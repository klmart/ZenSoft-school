function tableGo() {
    require(['main'], function (Main) {
        const teachers = Main.default.TeacherService.findAll();
        const subjects = Main.default.SubjectService.findAll();
        const parents = Main.default.ParentService.findAll();
        const positions = Main.default.PositionService.findAll();
        const books = Main.default.BookService.findAll();
        const sg = Main.default.StudentGroupService.findAll();


        teachersTable = document.getElementById('teachersTable');
        table = createtable(teachers, getFields(Main.default.TeacherService.findAll()));
        teachersTable.appendChild(table);


        positionsTable = document.getElementById('positionsTable');
        table = createtable(positions, getFields(Main.default.PositionService.findAll()));
        positionsTable.appendChild(table);

        booksTable = document.getElementById('booksTable');
        table = createtable(books, getFields(Main.default.BookService.findAll()));
        booksTable.appendChild(table);


        sgTable = document.getElementById('sgTable');
        table = createtable(sg, getFields(Main.default.StudentGroupService.findAll()));
        sgTable.appendChild(table);
    });

}

function getFields(store) {
    let firstObject = store.next().value;
    return Object.keys(firstObject);
}

function createTableMain(store, tableFields) {
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

    function createDeleteButton(object) {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.onclick = function () {
            removeObject(object);
        };
        td.appendChild(button);
        return td;
    }

    table = document.createElement('table');
    table.className = "table table-bordered";
    thead = document.createElement('thead');
    table.appendChild(thead);
    tr = document.createElement('tr');
    thead.appendChild(tr);

    tableFields.forEach(function (field) {
        th = createTh(field);
        tr.appendChild(th);
    });

    tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let object of store) {
        trb = document.createElement('tr');
        Object.getOwnPropertyNames(object).forEach(function (val) {
            const value = object[val];
            const td = createTd(value);
            trb.appendChild(td);
        });
        trb.appendChild(createDeleteButton(object));

        tbody.appendChild(trb);
    }

    return table

}

function createTable(store, tableFields) {
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

    function createDeleteButton(object) {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.onclick = function () {
            removeObject(object);
        };
        td.appendChild(button);
        return td;
    }

    table = document.createElement('table');
    table.className = "table table-bordered";
    thead = document.createElement('thead');
    table.appendChild(thead);
    tr = document.createElement('tr');
    thead.appendChild(tr);

    tableFields.forEach(function (field) {
        th = createTh(field);
        tr.appendChild(th);
    });

    tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let object of store) {
        trb = document.createElement('tr');
        Object.getOwnPropertyNames(object).forEach(function (val) {
            const value = object[val];
            if (value instanceof Array) {
                if (value.length == 0) {
                    const td = createTd(value);
                    trb.appendChild(td);
                }
                let td = document.createElement('td');
                value.forEach(function (element) {
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

        trb.appendChild(createDeleteButton(object));

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

function removeObject(object) {
    object.remove();
    createStudentsTable();
    createTeachersTable();
    createSubjectsTable();
    createParentsTable();
    createPositionsTable();
    createBooksTable();
}

function createStudentsTable() {
    require(['main'], function (Main) {
        const students = Main.default.StudentService.findAll();
        studentsTable = document.getElementById('studentsTable');
        studentsTable.innerHTML = '';
        table = createTable(students, getFields(Main.default.StudentService.findAll()));
        studentsTable.appendChild(table);
    });
}

function createTeachersTable() {
    require(['main'], function (Main) {


        const teachers = Main.default.TeacherService.findAll();
        teachersTable = document.getElementById('teachersTable');
        teachersTable.innerHTML = '';
        table = createTable(teachers, getFields(Main.default.TeacherService.findAll()));
        teachersTable.appendChild(table);
    });
}

function createSubjectsTable() {
    require(['main'], function (Main) {
        const subjects = Main.default.SubjectService.findAll();
        subjectsTable = document.getElementById('subjectsTable');
        subjectsTable.innerHTML = '';
        table = createTable(subjects, getFields(Main.default.SubjectService.findAll()));
        subjectsTable.appendChild(table);
    });
}

function createPositionsTable() {
    require(['main'], function (Main) {
        const positions = Main.default.PositionService.findAll();
        positionsTable = document.getElementById('positionsTable');
        positionsTable.innerHTML = '';
        table = createTable(positions, getFields(Main.default.PositionService.findAll()));
        positionsTable.appendChild(table);
    });
}

function createParentsTable() {
    require(['main'], function (Main) {
        const parents = Main.default.ParentService.findAll();
        parentsTable = document.getElementById('parentsTable');
        parentsTable.innerHTML = '';
        table = createTable(parents, getFields(Main.default.ParentService.findAll()));
        parentsTable.appendChild(table);
    });
}

function createBooksTable() {
    require(['main'], function (Main) {
        const books = Main.default.BookService.findAll();
        booksTable = document.getElementById('booksTable');
        booksTable.innerHTML = '';
        table = createTable(books, getFields(Main.default.BookService.findAll()));
        booksTable.appendChild(table);
    });
}

function createSG() {
    require(['main'], function (Main) {
        const sg = Main.default.StudentGroupService.findAll();
        console.log(sg.teachersRole);
        sgTable = document.getElementById('sgTable');
        sgTable.innerHTML = '';
        table = createTable(sg, getFields(Main.default.StudentGroupService.findAll()));
        sgTable.appendChild(table);
    });
}




function createStudent() {
    require(['main'], function (Main) {
        const studentForm = document.getElementById('studentForm');
        const student = Main.default.StudentService.create(createObject(studentForm));
        student.save();
        createStudentsTable();
    });
}

function createTeacher() {
    require(['main'], function (Main) {
        const teacherForm = document.getElementById('teacherForm');
        const teacher = Main.default.TeacherService.create(createObject(teacherForm));
        teacher.save();
        createTeachersTable();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    require(['main'], function (Main) {

        Main.default.Builder.run();
        Main.default.FillDb.fill();
        createStudentsTable();
        createTeachersTable();
        createSubjectsTable();
        createParentsTable();
        createPositionsTable();
        createBooksTable();
        createSG();
    });
});