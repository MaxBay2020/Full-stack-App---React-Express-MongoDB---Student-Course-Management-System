import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    course_code: {type: String, required: true},
    course_name: {type:String, required: true},
    section: [],
    semester: {type:String, required: true},
    students:[]
})

const Course=mongoose.model('Course', courseSchema)

export default  Course
