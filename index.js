import express, { response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongo')
}).catch((error) => {
    console.log(error)
})

const app = express();

app.listen(3333, () => {
    console.log('Running')
})

app.use('/api/user', userRouter)