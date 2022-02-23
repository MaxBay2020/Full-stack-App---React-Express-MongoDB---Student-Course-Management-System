import express from 'express'
import {
    getAllCourses,
    createCourse,
    getAllStudentsTakingTheCourseByCourseCode
} from '../controllers/courses_controller.js'

const courses_router=express.Router()

/* get all courses in DB */
courses_router.get('/', getAllCourses)

/* add course to DB */
courses_router.post('/create', createCourse)

/* get all students and section options of a specific course by course_code */
courses_router.get('/:course_code', getAllStudentsTakingTheCourseByCourseCode)



export default courses_router
