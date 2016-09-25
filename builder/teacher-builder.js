const teachers = require('./data/teacher-data');
const TeacherService = require('../services/teacher-service');

class TeacherBuilder {
    static fillTeachers(){
        for(let teacher in teachers){
            TeacherService.create(teachers[teacher]).save();
        }
    }
}

module.exports = TeacherBuilder;