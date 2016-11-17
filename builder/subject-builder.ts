import subjects from './data/subject-data';
import SubjectService from '../services/subject-service';

class SubjectBuilder{
    static fillSubjects(){
        for(let subject in subjects){
            SubjectService.create(subjects[subject].name, subjects[subject].level,
                                    subjects[subject].hours,subjects[subject].quote).save();
        }
    }
}

export default SubjectBuilder;