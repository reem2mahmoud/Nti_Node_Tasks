const fs = require('fs') ;
const chalk = require('chalk') ;


//ReadStudents
readStudentsData = ()=>{
    let students ;
    try{
         
        students = JSON.parse(fs.readFileSync('./students.json').toString()) ;
        
    }catch(e){
        console.log('err' , e) ;
        students = [] ;
    }
    return students ;
}
//WriteStudent
writeStudentData = (data)=>{
    try{
      fs.writeFileSync('./students.json',JSON.stringify(data)) ;
      return console.log(chalk.green('student add successfully'))
    }catch(e){
        console.log(chalk.red('cannot add this student'))
    }
}
//AddNewStudent
addNewStudent = (data)=>{

    let students = readStudentsData();
    let classNames = ['a','b','c'] ;
    if(!classNames.includes(data.class)) return console.log(chalk.red('please reenter className'))
    let student = {
        id : students.length+1,
        ...data 
    }
    students.push(student);
    writeStudentData(students);  
}

//ShowAllStudents 
showAllStudents = ()=>{
    let students = readStudentsData();
    if(students){
        console.table(students) ;
    }
}
//GetSingleStudent 
getStudent = (student_id) =>{
 let students = readStudentsData() ;
 let index = students.findIndex(student=>{
    
    return student.id  == student_id 
  })
  if(!index==-1) {return {student : students[index] , index : index}}
 // console.log("index" ,students[index]) ;
  else{console.log(chalk.red(`not found students with id ${student_id}`))} 
}
//AddSubjectToStudent
addSubject= (student_id , new_subject)=>{
    let students = readStudentsData() ;
    let result = getStudent(student_id) ;
    let subject_found = false ;
     students[result.index].sub.forEach((subject) => {
        if(subject.subName == new_subject.subName){
            subject_found = true  ; 
        }
    })
    if(subject_found){``
        console.log(chalk.red(`Oobs ,this subject added before to ${result.student.name}`)) ;
    }else{
        students[result.index].sub.push(new_subject) ;
        writeStudentData(students) ;
    }
}
//StudentsTotalDegree
calcStudentsDegress = ()=>{
    let students = readStudentsData();
    let degrees = [] ;
     students.forEach(student =>{
        let student_grades  = 0;
         student.sub.forEach(subject=>{
            student_grades+=subject.grade ;
        })
        degrees.push({"name" : student.name , "total_degree" : student_grades})
    })
    return degrees ;
}

module.exports={ addNewStudent , 
                 showAllStudents  ,
                 getStudent ,
                 addSubject,
                 calcStudentsDegress}