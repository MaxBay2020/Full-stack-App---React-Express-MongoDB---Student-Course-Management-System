import React, {useState, useEffect} from 'react';
import URL from '../config'
import axios from "axios";
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {toast} from "react-toastify";
import StudentsListModal from "./StudentsListModal";

const Courses = ({cookies}) => {

    const [courses, setCourses]=useState([])
    const [studentsListModal, setStudentsListModal]=useState(false)
    const [studentsList, setStudentsList]=useState([])

    useEffect(()=>{
        getAllCourses()
    }, [])

    const getAllCourses=async ()=>{
        const response = await axios.get(`${URL}/course`)
        if(response.status === 200){
            setCourses(response.data)
            getFinalCoursesDetail(response.data)
        }
    }

    const getFinalCoursesDetail=(courses)=>{
        let finalAllCourses=[]
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < courses[i].section.length; j++) {
                const tempCourse={
                    ...courses[i],
                    section: courses[i].section[j]
                }
                finalAllCourses.push(tempCourse)
            }
        }

        setCourses(finalAllCourses)
    }
    const addCourse=async (e)=>{
        const course_code = e.target.getAttribute('course_code')
        const course_section = e.target.getAttribute('course_section')

        // add this course to this student
        const {student_number}=cookies
        if(!student_number) return toast.error('Please login first!')

        const addCourseURL=`${URL}/student/${student_number}/${course_code}/${course_section}`
        const response = await axios.post(addCourseURL)
        if(response.status === 200){
            toast.success('Add successfully!')
            // remove this course_code course from the list
            const newCourses=courses.filter(course=>course.course_code!==course_code)
            setCourses(newCourses)
        }
    }

    const viewStudentList = async (e)=>{
        const course_code=e.target.getAttribute('course_code')
        const getListURL=`${URL}/course/${course_code}`
        const response = await axios.get(getListURL)
        if(response.status === 200){
            const {students}=response.data
            setStudentsList(students)
            setStudentsListModal(true)
        }
    }

    return (
        <>
            {
                studentsListModal?
                    <StudentsListModal
                        setStudentsListModal={setStudentsListModal}
                        studentsList={studentsList}
                        studentsListModal={studentsListModal}
                    />
                    :null
            }
            <Container style={{marginTop: '100px'}}>
                <Row>
                    <Col />
                    <Col xs={8}>
                        <h4>All Courses Available</h4>
                        <br/>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Section</th>
                                <th>Semester</th>
                                <th>Student List</th>
                                <th>Add</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                courses.map((course, index) => (
                                    (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{course.course_code}</td>
                                            <td>{course.course_name}</td>
                                            <td>{course.section}</td>
                                            <td>{course.semester}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary" size='sm'
                                                    course_code={course.course_code}
                                                    onClick={(e)=>viewStudentList(e)}
                                                >View List</Button>
                                            </td>
                                            <td>
                                                <Button
                                                    course_code={course.course_code}
                                                    course_section={course.section}
                                                    variant="outline-success" size='sm'
                                                    onClick={(e)=>addCourse(e)}
                                                >Add</Button>
                                            </td>
                                        </tr>
                                    )
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </>
    );
};

export default Courses;
