const students = require('./data/student-data');
const StudentService = require('../services/student-service');

class StudentBuilder {
    static fillStudents(){
        for(let student in students){
            StudentService.create(students[student]).save();
        }
    }
}
module.exports = StudentBuilder;