import React, {useState, useEffect} from 'react';
import {useParams, Link, useLocation, useNavigate} from 'react-router-dom'
import Login from "../components/Login";
import Register from "../components/Register";
import {Container, Row, Col } from 'react-bootstrap'
import MyCoursesList from '../components/MyCoursesList'
import Header from "../components/Header";

const MyCourses = ({cookies, setCookies,removeCookie}) => {
    const {student_number}=useParams()
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const {pathname}=useLocation()
    const navigate=useNavigate()

    useEffect(() => {
        if(cookies.student_number)  navigate(`/student/${cookies.student_number}`)
    }, []);

    const showRegisterComponent=(e)=>{
        e.preventDefault()
        setShowLogin(false)
        setShowRegister(true)
    }

    const showLoginComponent = (e)=>{
        e.preventDefault()
        setShowLogin(true)
        setShowRegister(false)
    }

    if(!student_number){
        if(showLogin){
            return (
                <>
                    <Login cookies={cookies} setCookies={setCookies} removeCookie={removeCookie} />
                    <Container>
                        <Row>
                            <Col />
                            <Col>
                                <Link to='/' onClick={(e)=>{showRegisterComponent(e)}}>Create one</Link>
                            </Col>
                            <Col/>
                        </Row>
                    </Container>
                </>
            )
        }
        if(showRegister){
            return (
                <>
                    <Register cookies={cookies} setCookies={setCookies} removeCookie={removeCookie} />
                    <Container>
                        <Row>
                            <Col />
                            <Col>
                                <Link to='/' onClick={(e)=>{showLoginComponent(e)}}>Login</Link>
                            </Col>
                            <Col/>
                        </Row>
                    </Container>
                </>
            )
        }
    }else{
        return (
            <div  style={{minHeight: '550px'}}>
                <MyCoursesList cookies={cookies} setCookies={setCookies} />
            </div>
        )
    }




};

export default MyCourses;
