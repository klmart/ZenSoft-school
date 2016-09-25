const ParentBuilder = require('./parent-bulder');
const StudentBuilder = require('./student-bulder');
const TeacherBuilder = require('./teacher-builder');
const SubjectBuilder = require('./subject-builder');
const PositionBuilder = require('./position-builder');
const GroupBuilder = require('./group-builder');

class Builder{
    static run(){
        ParentBuilder.fillParents();
        StudentBuilder.fillStudents();
        TeacherBuilder.fillTeachers();
        SubjectBuilder.fillSubjects();
        PositionBuilder.fillPositions();
        GroupBuilder.fillGroups();
    }
}

module.exports = Builder;