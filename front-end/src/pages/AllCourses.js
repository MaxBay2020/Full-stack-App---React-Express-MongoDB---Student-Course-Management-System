import React from 'react';
import Courses from '../components/Courses'

const AllCourses = ({cookies}) => {
    return (
        <div style={{minHeight: '550px'}}>
            <Courses cookies={cookies} />
        </div>
    );
};

export default AllCourses
