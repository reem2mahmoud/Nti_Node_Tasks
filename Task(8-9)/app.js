const students = require("./myModules/student");
const yargs = require('yargs')


// students.addNewStudent({ "name":"ahmed","class":"b","sub": [{"subName":"cdd", grade:10}]})
// students.showAllStudents();
// console.log(getStudent(1)) ;
// students.addSubject(1, {"subName": "english","grade": 20}) ;
 console.log(students.calcStudentsDegress())



// yargs for add student
yargs.command({
    command : 'add',
    describe:"add new student",
    builder:{
        name:{
            type:String
        },
        class:{
            type:String
         },
        sub : {
                subName: { type:String },
                grade:   { type : Number}
         }  
        
    },
    handler : function(argv){
        students.addNewStudent(argv.name, argv.class , argv.sub)
    }
})
//yargs for show al students
yargs.command({
    command : 'show',
    describe:"show all students",
    builder:{
         
    },
    handler : function(argv){
        students.showAllStudents()
    }
})
// yargs for get single students using student_id 
yargs.command({
    command : 'get',
    describe:" get student",
    builder:{
        student_id:{
            type:Number
        },   
    },
    handler : function(argv){
        students.getStudent(argv.student_id)
    }
})
//yargs for add subject
yargs.command({
    command : 'add_subject',
    describe:" add student",
    builder:{
        id:{
            type:Number
        },   
        sub : {
            subName: { type:String },
            grade:   { type : Number}
     }  
    },
    handler : function(argv){
        students.addSubject(argv.id , argv.sub)
    }
})
// students Degrees
yargs.command({
    command : 'get_degrees',
    describe:"get students degrees",
    builder:{
         
    },
    handler : function(argv){
        students.studentsDegress()
    }
})
yargs.argv