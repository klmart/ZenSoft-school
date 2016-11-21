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

        subjectsTable = document.getElementById('subjectsTable');
        table = createtable(subjects, getFields(Main.default.SubjectService.findAll()));
        subjectsTable.appendChild(table);

        parentsTable = document.getElementById('parentsTable');
        table = createtable(parents, getFields(Main.default.ParentService.findAll()));
        parentsTable.appendChild(table);

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
            const td = createTd(value);
            trb.appendChild(td);
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
    });
});