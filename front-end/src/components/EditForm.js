import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import URL from '../config'
import {toast} from "react-toastify";


const EditForm = () => {

    const {student_number, course_code, course_section}=useParams()
    const [currentCourse, setCurrentCourse]=useState({})
    const [section, setSection]=useState(course_section)
    const navigate=useNavigate()

    useEffect(() => {
        getCourseByCourseCode(course_code)
    }, [])

    const getCourseByCourseCode = async (course_code)=>{
        const response = await axios.get(`${URL}/course`)
        if(response.status === 200){
            const currentCourse = response.data.find(course => course.course_code === course_code)
            setCurrentCourse(currentCourse)
        }
    }


    const updateForm = async (e)=>{
        e.preventDefault()
        const updateURL=`${URL}/student/${student_number}/${course_code}/${section}`
        const response = await axios.patch(updateURL)
        if(response.status === 200){
            toast.success(response.data)
            navigate(`/student/${student_number}`)
        }
    }

    const getNewSection = (e)=>{
        const newSection=e.target.value
        setSection(newSection)
    }


    return (
        <>
            <Container style={{marginTop:'100px'}}>
                <Row>
                    <Col />
                    <Col xs={6}>
                        <h3>Edit this course</h3>
                        <br/>
                        <Form onSubmit={(e)=>updateForm(e)}>
                            {/* Course code */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control type="text" disabled value={currentCourse.course_code || ''} />
                            </Form.Group>

                            {/* Course name */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control type="text" disabled value={currentCourse.course_name || ''} />
                            </Form.Group>

                            {/* Course section */}
                            <Form.Label>Course Section</Form.Label>
                            <Form.Select onChange={(e)=>getNewSection(e)}  aria-label="Default select example">
                                {
                                    currentCourse.section&&currentCourse.section.map((section, index)=>(
                                        <option key={index} value={section}>{section}</option>
                                    ))
                                }
                            </Form.Select>

                            {/* Course semester */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Course Semester</Form.Label>
                                <Form.Control type="text" disabled value={currentCourse.semester || ''} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
    );
};

export default EditForm;
