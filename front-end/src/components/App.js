import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import AllCourses from '../pages/AllCourses'
import MyCourses from '../pages/MyCourses'
import UpdateCourse from '../pages/UpdateCourse'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import { useCookies } from 'react-cookie'

function App() {
    const [cookies, setCookies, removeCookie]=useCookies({
        student_number: '',
        password: ''
    })

  return (
    <Router>
        <Header cookies={cookies} setCookies={setCookies} />
        <ToastContainer position='top-center' />
        <Routes>
            <Route exact path='/student/:student_number' element={<MyCourses cookies={cookies} setCookies={setCookies} removeCookie={removeCookie} />} />
            <Route exact path='/student' element={<MyCourses cookies={cookies} setCookies={setCookies} removeCookie={removeCookie} />} />
            <Route exact path='/course' element={<AllCourses cookies={cookies} />} />
            <Route exact path='/update/student/:student_number/:course_code/:course_section' element={<UpdateCourse />} />
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
