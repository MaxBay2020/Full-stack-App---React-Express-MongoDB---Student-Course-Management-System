import express from 'express'
import {
    getAllStudents,
    createStudent,
    getStudentByStudentNumber,
    updateCourse,
    deleteCourseByCourseCode,
    getAllSelectedCoursesByStudentNumber,
    addCourseToAStudent
} from '../controllers/students_controller.js'

const students_router=express.Router()

/* get all students in DB */
students_router.get('/', getAllStudents)

/* add student to DB */
students_router.post('/create', createStudent)

/* get student by student_number*/
// students_router.get('/:student_number', getStudentByStudentNumber)

/* update course option */
students_router.patch('/:student_number/:course_code/:course_section', updateCourse)

/* delete course from a student by course_code and delete this student from students*/
students_router.delete('/:student_number/:course_code', deleteCourseByCourseCode)

/* get all selected courses by student_number */
students_router.get('/:student_number', getAllSelectedCoursesByStudentNumber)

/* add course to a student */
students_router.post('/:student_number/:course_code/:course_section', addCourseToAStudent)

export default students_router
