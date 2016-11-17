document.addEventListener('DOMContentLoaded', function () {
    require(['main'], function (Main) {
        console.log('--------');
        console.log(Main);
        Main.default.Run();
        const papa = Main.default.ParentService.create({name: 'Papa Papovich'});
        const marat = Main.default.StudentService.create({name: 'Marat Kulbaev'});
        const John = Main.default.TeacherService.create({name: 'John Doe'});
        const math = Main.default.SubjectService.create('Math');
        const director = Main.default.PositionService.create('Director');
        const book = Main.default.BookService.create(math, 'The Lord of The Rings');
        const gr1 = Main.default.StudentGroupService.create('2', 'A');
        const johnMath = Main.default.TeachersRoleService.create(John, math);
        Main.default.Builder.run();
        const students = Main.default.StudentService.findAll();

        const teacher = Main.default.TeacherService.findBy('name', 'John Doe');
        document.getElementById('myDiv').innerHTML = teacher.name;

        // console.log(teacher);
        // console.log(papa);
        // console.log(marat);
        // console.log(John);
        // console.log(math);
        // console.log(director);
        // console.log(book);
        // console.log(gr1);
        // console.log(johnMath);

        // const lambo = new App.default.Car('lambo');
        // console.log(lambo.name);
        // lambo.start();
    });
});