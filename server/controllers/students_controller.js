import Student from '../DB/models/Student.js'
import Course from '../DB/models/Course.js'


export const getAllStudents=(req,res,next)=>{
    Student.find((error,students)=>{
        if(error) console.log('Server error')
        else res.send(students)
    })

}

export const createStudent = (req,res,next)=>{

    const {student_number}=req.body

    Student.findOne({student_number}, (error, student)=>{
        if(error) console.log(error.message)
        else if(student)    res.send('Student number already exists!')
        else{
            const newStudent=new Student(req.body)
            newStudent.save((error, result)=>{
                if(error) console.log(error.message)
                else res.send('Add student successfully!')
            })
        }
    })
}

export const getStudentByStudentNumber = (req, res, next)=>{
    const {student_number}=req.params
    Student.findOne({student_number}, (error, student)=>{
        if(error) console.log(error.message)
        else if(!student)   res.send('No such student number yet!')
        else res.send(student)
    })
}

export const updateCourse = async (req,res,next)=>{
    const {student_number, course_code, course_section}=req.params

    const currentStudent=await Student.findOne({student_number})

    const updatedCourses=currentStudent.courses.map(course =>{
        if(course.course_code===course_code) {
            course.course_section=course_section
        }
        return course
    })


    currentStudent.courses=updatedCourses
    currentStudent.save((error, result)=>{
        if(error) console.log(error.message)
        else res.send('Updated successfully!')
    })
}

export const deleteCourseByCourseCode = (req,res,next)=>{
    const {student_number, course_code}=req.params

    // detete this course from this student
    Student.findOne({student_number}, (error, student)=>{
        if(error) console.log(error.message)
        else{
            const updatedCourses=student.courses.filter(course => course.course_code !== course_code)

            student.courses=updatedCourses
            student.save((error, result)=>{
                if(error) console.log(error.message)
                else {
                    // delete this student from the students list of this course
                    Course.findOne({course_code}, (error, course)=>{
                        if(error) console.log(error.message)
                        else if(!course) res.send('No such course_code')
                        else{
                            const allStudents=course.students
                            const allNewStudents=allStudents.filter(student=>student_number!==student)
                            course.students=allNewStudents
                            course.save((error, result)=>{
                                if(error) console.log(error.message)
                                else res.send('Delete this student from this course and delete this course from this student!')
                            })
                        }
                    })
                }
            })

        }
    })

}

export const getAllSelectedCoursesByStudentNumber=(req,res,next)=>{
    const {student_number}=req.params

    Student.findOne({student_number}, (error, student)=>{
        if(error) console.log(error.message)
        else if(!student)   res.send('Student number or password incorrect!')
        else {
            res.send(student.courses)
        }
    })
}


export const addCourseToAStudent = (req,res,next)=>{
    const {student_number, course_code, course_section}=req.params
    // add this course_code to this student.courses
    Student.findOne({student_number}, (error,student)=>{
        if(error) console.log(error.message)
        else{
            // find this course by the course_code
            Course.findOne({course_code}, (error,course)=>{
                if(error) console.log(error.message)
                else if(!course) res.send('No such course_code found!')
                else {
                    const hasSection = course.section.find(section=>course_section===section)
                    if(!hasSection){
                        res.send('No such section for this course')
                    }else{
                        // save course to student
                        student.courses.push({
                            course_code,
                            course_section
                        })
                        student.save((error, result)=>{
                            if(error) console.log(error.message)
                            else {

                            }
                        })
                        // add this student_number to this course.students
                        course.students.push(student_number)
                        course.save((error, result)=>{
                            if(error) console.log(error.message)
                            else    res.send('Add this course to this student and add this student to the course successfully!')
                        })
                    }
                }
            })

        }
    })





}
