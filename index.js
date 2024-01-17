import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

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