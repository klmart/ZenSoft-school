import ParentBuilder from './parent-bulder';
import StudentBuilder from './student-bulder';
import TeacherBuilder from './teacher-builder';
import SubjectBuilder from './subject-builder';
import PositionBuilder from './position-builder';
import GroupBuilder from './group-builder';

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
export default Builder;