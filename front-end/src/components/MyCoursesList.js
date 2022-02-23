import React, {useState, useEffect} from 'react'
import axios from 'axios'
import URL from '../config'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {toast} from "react-toastify"
import {useNavigate} from 'react-router-dom'
import StudentsList from "./StudentsList";


const MyCoursesList = ({cookies, setCookies}) => {
    // const storage=window.localStorage
    const {student_number, password} = cookies
    const [myCourses, setMyCourses]=useState([])
    const [myCoursesDetail, setMyCoursesDetail]=useState([])
    const [studentsList, setStudentsList]=useState([])
    const [showStudentsList, setShowStudentsList]=useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getAllSelectedCoursesByStudentNumber()
    }, [myCourses]);

    const getAllSelectedCoursesByStudentNumber = async ()=>{
        const response=await axios.get(`${URL}/student/${student_number}`)
        if(response.status === 200){
            setMyCourses(response.data)
            getMyCoursesDetails(response.data)
        }
    }

    const getMyCoursesDetails=async (myCourses)=>{
        const response = await axios.get(`${URL}/course`)
        if(response.status === 200){
            const allCourses=response.data
            // console.log(myCourses)
            // console.log(allCourses)
            let finalCoursesList=[]
            for (let i = 0; i < allCourses.length; i++) {
                for (let j = 0; j < myCourses.length; j++) {
                    if(myCourses[j].course_code === allCourses[i].course_code){
                        const tempCourse={
                            course_code: myCourses[j].course_code,
                            course_name: allCourses[i].course_name,
                            course_section: myCourses[j].course_section,
                            course_semester: allCourses[i].semester
                        }
                        finalCoursesList.push(tempCourse)
                    }

                }
            }

            setMyCoursesDetail(finalCoursesList)
        }

    }

    const dropCourse = async (e)=>{
        if(window.confirm('Are you sure to drop this course?')){
            const student_number=e.target.getAttribute('student_number')
            const course_code=e.target.getAttribute('course_code')
            const response=await axios.delete(`${URL}/student/${student_number}/${course_code}`)
            if(response.status === 200){
                toast.success('You have dropped this course')
                const newMyCourses=myCourses.filter(course=>course.course_code !== course_code)
                setMyCourses(newMyCourses)
            }
        }
    }

    const gotoEditPage = (e)=>{
        const student_number=e.target.getAttribute('student_number')
        const course_code=e.target.getAttribute('course_code')
        const course_section=e.target.getAttribute('course_section')
        navigate(`/update/student/${student_number}/${course_code}/${course_section}`)
    }

    const getAllStudents = async ()=>{
        const response =await axios.get(`${URL}/student`)
        if(response.status === 200){
            setStudentsList(response.data)
            setShowStudentsList(true)
        }
    }

    return (
        <>
            {
                showStudentsList && <StudentsList showStudentsList={showStudentsList} setShowStudentsList={setShowStudentsList} studentsList={studentsList} />
            }
            <Container style={{marginTop: '100px'}}>
                <Row>

                    <Col />
                    <Col xs={8}>
                        <h4>My Selected Courses:</h4>
                        <br/>
                        <Button variant="outline-success" onClick={()=>getAllStudents()}>View All Students</Button>
                        <br/>
                        <br/>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Section</th>
                                <th>Semester</th>
                                <th>Edit</th>
                                <th>Drop</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                myCoursesDetail.map((course, index)=>(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{course.course_code}</td>
                                        <td>{course.course_name}</td>
                                        <td>{course.course_section}</td>
                                        <td>{course.course_semester}</td>
                                        <td>
                                            <Button size="sm" variant="warning"
                                                    student_number={student_number}
                                                    course_code={course.course_code}
                                                    course_section={course.course_section}
                                                    onClick={(e)=>gotoEditPage(e)}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        <td>
                                            <Button size="sm" variant="danger"
                                                    student_number={student_number}
                                                    course_code={course.course_code}
                                                    onClick={(e)=>dropCourse(e)}
                                            >
                                                Drop
                                            </Button>
                                        </td>
                                    </tr>
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

export default MyCoursesList;
