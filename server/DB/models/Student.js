import mongoose from 'mongoose'
const Schema=mongoose.Schema

let studentSchema=new Schema({
    student_number:{type: String, required: true},
    password:{type: String, required: true},
    first_name:{type: String, required: true},
    last_name:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    phone_number:{type: Number, required: true},
    email:{type: String, required: true},
    program:{type: String, required: true},
    courses: [
        {
            course_code:String,
            course_section: String
        }
    ]
})

let Student=mongoose.model('Student', studentSchema)

export default Student
