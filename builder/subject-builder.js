const subjects = require('./data/subject-data');
const SubjectService = require('../services/subject-service');

class SubjectBuilder{
    static fillSubjects(){
        for(let subject in subjects){
            SubjectService.create(subjects[subject].name, subjects[subject].level,
                                    subjects[subject].hours,subjects[subject].quote).save();
        }
    }
}

module.exports = SubjectBuilder;