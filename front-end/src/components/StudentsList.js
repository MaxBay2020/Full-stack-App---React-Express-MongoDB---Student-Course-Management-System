import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const StudentsList = ({setShowStudentsList, studentsList, showStudentsList}) => {
    return (
        <>
            <Modal show={showStudentsList} onHide={()=>setShowStudentsList(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>All Students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        studentsList.map((student, index) =>(
                            <p key={index}>{`${student.first_name} ${student.last_name}`}</p>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowStudentsList(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudentsList;
