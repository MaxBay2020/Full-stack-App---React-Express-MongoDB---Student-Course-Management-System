import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import {toast} from "react-toastify";
import axios from 'axios'
import URL from '../config'
import { useCookies } from 'react-cookie'

const Register = ({cookies, setCookies, removeCookie}) => {
    const initialStudent={
        student_number:'',
        password:'',
        first_name:'',
        last_name:'',
        address:'',
        city: '',
        phone_number: -1,
        email: '',
        program: ''
    }

    const [student, setStudent]=useState(initialStudent)
    const navigate=useNavigate()


    const handleChange=(e)=>{
        const {name, value}=e.target
        setStudent({
            ...student,
            [name]:value
        })
    }

    const registerStudent=(e)=>{
        e.preventDefault()
        const {student_number, password, first_name, last_name, address, city, phone_number, email, program}=student
        if(!student_number||!password||!first_name||!last_name||!address||!city||!phone_number||!email||!program){
            toast.error('Please fill all fields!')
        }
        else{
            createStudentToDB()
        }
    }

    const createStudentToDB =async ()=> {
        const response=await axios.post(`${URL}/student/create`, student)
        if(response.status===200){
            // // save student_number locally
            // const storage=window.localStorage
            // storage['student_number']=student.student_number
            removeCookie('student_number')
            removeCookie('password')
            // save student_number and password to cookies
            setCookies('student_number', student.student_number)
            setCookies('password', student.password)

            toast.success(response.data)
            navigate(`/student/${student.student_number}`)
        }else   toast.error('Cannot save student to DB, please try again later')
    }

    return (
        <>
            <Container style={{marginTop:'40px'}}>
                <Row>
                    <Col/>
                    <Col>
                        <h3>Create an account</h3>
                        <br/>
                        <Form onSubmit={(e)=>registerStudent(e)}>
                            {/*student_number*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control name='student_number' type="text" placeholder="Create a student number for yourself" onChange={(e)=>handleChange(e)} />
                                <Form.Text className="text-muted">
                                    You will use the student number to login
                                </Form.Text>
                            </Form.Group>

                            {/*password*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' type="password" placeholder="Create a password for yourself" onChange={(e)=>handleChange(e)} />
                                <Form.Text className="text-muted">
                                    You will use the password to login
                                </Form.Text>
                            </Form.Group>

                            {/*first_name*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name='first_name' type="text" placeholder="Enter your first name" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*last_name*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name='last_name' type="text" placeholder="Enter your last name" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*address*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name='address' type="text" placeholder="Enter your address" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*city*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>City</Form.Label>
                                <Form.Control name='city' type="text" placeholder="Enter your city" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*phone_number*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control name='phone_number' type="number" placeholder="Enter your phone number" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*email*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name='email' type="email" placeholder="Enter your email" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            {/*program*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Program</Form.Label>
                                <Form.Control name='program' type="text" placeholder="Enter your program" onChange={(e)=>handleChange(e)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Register now
                            </Button>
                        </Form>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </>
    );
};

export default Register;
