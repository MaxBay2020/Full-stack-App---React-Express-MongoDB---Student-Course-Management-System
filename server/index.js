import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import URL from './DB/config.js'
mongoose.connect(URL, {useNewUrlParser: true,useUnifiedTopology:true})


import students_router from './routes/students.js'
import courses_router from './routes/courses.js'

import passport from 'passport'

const PORT=5000
const app=express()

app.use(bodyParser.json())
app.use(cors())

// app.use(passport.initialize())
// app.use(passport.session())

app.use('/student', students_router)
app.use('/course', courses_router)

app.listen(PORT, ()=>{
    console.log(`Server is running at localhost:${PORT}`)
})
