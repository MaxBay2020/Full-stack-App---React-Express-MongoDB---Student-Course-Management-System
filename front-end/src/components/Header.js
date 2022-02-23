import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'


const Header = ({cookies, setCookies}) => {
    const [activeTab, setActiveTab]=useState('MyCourses')
    const location = useLocation()

    const getStudentNumber=()=>{

    }
    // const storage=window.localStorage
    // const {student_number}=storage

    // get current logged in student_number and pssword

    const {student_number, password}=cookies
    useEffect(() => {
        console.log(student_number, password)
    }, [student_number, password]);


    return (
        <>
            <Navbar  bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/student">Student Course Management System</Navbar.Brand>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link href={student_number ? '/student/'+student_number : '/student'} onClick={()=>setActiveTab('MyCourses')}  >My Courses</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/course" onClick={()=>setActiveTab('AllCourses')} >All Courses</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
