import React from 'react';
import {Modal, Button} from 'react-bootstrap'

const StudentsListModal = ({setStudentsListModal, studentsList, studentsListModal}) => {
    return (
        <Modal show={studentsListModal} onHide={()=>setStudentsListModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Students Taking This Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    studentsList.map((student, index)=>(
                        <p key={index}>{student}</p>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setStudentsListModal(false)}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default StudentsListModal;
