import Course from '../DB/models/Course.js'


export const getAllCourses=(req,res,next)=>{
    Course.find((error, courses)=>{
        if(error) console.log(error.message)
        else    res.send(courses)
    })
}


export const createCourse = (req, res, next)=>{

    const {course_code}=req.body

    Course.findOne({course_code}, (error, course) => {
        if(error) console.log(error.message)
        else if(course) res.send('Course code exists!')
        else{
            const newCourse=new Course(req.body)
            newCourse.save((error, result)=>{
                if(error) console.log(error.message)
                else    res.send('Course added successfully!')
            })
        }
    })

}

export const getAllStudentsTakingTheCourseByCourseCode=(req,res,next)=>{
    const {course_code} = req.params
    Course.findOne({course_code}, (error, course)=>{
        if(error) console.log(errror.message)
        else if(!course)    res.send('No such course_code found!')
        else  res.send({
                section:course.section,
                students:course.students
            })
    })

}
