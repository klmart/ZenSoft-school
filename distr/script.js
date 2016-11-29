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

let selectedParent = undefined;

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
function createStudentEditButton(object) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');
    button.onclick = function () {
        studentForm = document.getElementById('modalEditStudent');
        studentForm.name.value = object.name;
        studentForm.contacts.value = object.contacts;
        studentForm.dateOfBirth.value = object.dateOfBirth;
        studentForm.updateStudent.innerHTML = 'Edit Student';
        studentForm.updateStudent.onclick = function () {
            //ToDo: fix select correct parent
            object.addParent(selectedParent);
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

function setParent(value) {
    console.log('---------------');
    console.log(value);
    selectedParent = value;
}

function createStudentsTable() {
    require(['main'], function (Main) {
        function createTeacherSelect() {
            let selectParent = document.getElementById("selectParent2");
            selectParent.innerHTML = '';

//Create array of options to be added
            const parents = Main.default.ParentService.findAll();

//Create and append select list
            var selectList = document.createElement("select");
            selectList.setAttribute("id", "parentSelect");
            selectParent.appendChild(selectList);


//Create and append the options
            for (let parent of parents) {
                var option = document.createElement("option");
                option.setAttribute("value", parent);
                option.text = parent.name;
                selectList.appendChild(option);
                selectList.onclick = function () {
                    setParent(parent);
                };
            }

        }

        createTeacherSelect();
        const students = Main.default.StudentService.findAll();
        studentsTable = document.getElementById('studentsTable');
        studentsTable.innerHTML = '';
        table = createTable(students, getFields(Main.default.StudentService.findAll()), createStudentsTable, 'createStudentEditButton');
        studentsTable.appendChild(table);
    });
}

function createTeachersTable() {
    require(['main'], function (Main) {


        const teachers = Main.default.TeacherService.findAll();
        teachersTable = document.getElementById('teachersTable');
        teachersTable.innerHTML = '';
        table = createTable(teachers, getFields(Main.default.TeacherService.findAll()), createTeachersTable);
        teachersTable.appendChild(table);
    });
}

function createSubjectsTable() {
    require(['main'], function (Main) {
        const subjects = Main.default.SubjectService.findAll();
        subjectsTable = document.getElementById('subjectsTable');
        subjectsTable.innerHTML = '';
        table = createTable(subjects, getFields(Main.default.SubjectService.findAll()), createSubjectsTable);
        subjectsTable.appendChild(table);
    });
}

function createPositionsTable() {
    require(['main'], function (Main) {
        const positions = Main.default.PositionService.findAll();
        positionsTable = document.getElementById('positionsTable');
        positionsTable.innerHTML = '';
        table = createTable(positions, getFields(Main.default.PositionService.findAll()), createPositionsTable);
        positionsTable.appendChild(table);
    });
}

function createParentsTable() {
    require(['main'], function (Main) {
        const parents = Main.default.ParentService.findAll();
        parentsTable = document.getElementById('parentsTable');
        parentsTable.innerHTML = '';
        table = createTable(parents, getFields(Main.default.ParentService.findAll()), createParentsTable);
        parentsTable.appendChild(table);
    });
}

function createBooksTable() {
    require(['main'], function (Main) {
        const books = Main.default.BookService.findAll();
        booksTable = document.getElementById('booksTable');
        booksTable.innerHTML = '';
        table = createTable(books, getFields(Main.default.BookService.findAll()), createBooksTable);
        booksTable.appendChild(table);
    });
}

function createSG() {
    require(['main'], function (Main) {
        const sg = Main.default.StudentGroupService.findAll();
        sgTable = document.getElementById('sgTable');
        sgTable.innerHTML = '';
        table = createTable(sg, getFields(Main.default.StudentGroupService.findAll()), createSG);
        sgTable.appendChild(table);
    });
}

function createStudent() {
    require(['main'], function (Main) {
        // console.log(selectedParent);
        // var parentSelect = document.getElementById('parentSelect');
        // var selected = parentSelect.options[parentSelect.selectedIndex].value;
        const studentForm = document.getElementById('studentForm');
        const student = Main.default.StudentService.create(createObject(studentForm));
        //ToDo: fix select correct parent
        student.addParent(selectedParent);
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