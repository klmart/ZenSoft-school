import TeachersRoleService from '../services/teachers-role-service';

class TeachersRole {
  constructor(teacher, subject){
    this.setSubject(subject);
    this.setTeacher(teacher);
  }

  setSubject(subject){
    this.subject = subject;
  }

  getSubject(){
    return this.subject;
  }

  setTeacher(teacher){
    this.teacher = teacher;
  }

  getTeacher(){
    return this.teacher
  }

  remove(){
    TeachersRole.removeById(this.id)
  }


  save(){
    TeachersRoleService.add(this);
  }

}

export default TeachersRole;