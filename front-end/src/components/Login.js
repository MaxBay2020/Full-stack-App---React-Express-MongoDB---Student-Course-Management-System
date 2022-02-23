import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import URL from '../config'
import {toast} from "react-toastify";


const Login = ({cookies, setCookies, removeCookie}) => {
    const initialStudent={
        student_number: '',
        password: ''
    }

    const [student, setStudent]=useState(initialStudent)
    const navigate=useNavigate()

    const handleLogin=async (e)=>{
        e.preventDefault()
        const {student_number, password}=student
        if(!student_number||!password)  toast.error('Please fill all fields!')
        else{
            // TODO: Login this student if it is valid
            const response = await axios.get(`${URL}/student/${student_number}`)
            if(response.status===200){
                const storage=window.localStorage
                if(typeof response.data==='string'){
                    toast.error(response.data)
                    storage.clear()
                }else{
                    toast.success('Login successfully!')
                    // // save student_number locally
                    // storage['student_number']=student.student_number
                    removeCookie('student_number')
                    removeCookie('password')
                    // save student_number and password to cookies
                    setCookies('student_number', student.student_number)
                    setCookies('password', student.password)

                    navigate(`/student/${student.student_number}`)
                    console.log(response.data)
                }

            }else   toast.error('Server error, please try again later')
        }




        // // save student_number locally
        // const storage=window.localStorage
        // storage['student_number']=student.student_number
    }

    return (
        <>
            <Container style={{marginTop:'100px'}}>
                <Row>
                    <Col/>
                    <Col>
                        <h3>Please login first</h3>
                        <br/>
                        <Form onSubmit={(e)=>handleLogin(e)}>
                            {/*student_number*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your student number"
                                    onChange={(e)=>(
                                        setStudent({...student, student_number: e.target.value})
                                    )}
                                />
                            </Form.Group>

                            {/*password*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e)=>(
                                        setStudent({...student, password: e.target.value})
                                    )}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </>
    );
};

export default Login;
