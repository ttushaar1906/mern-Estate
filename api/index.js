import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// mongoose.connect(process.env.MONGO)
mongoose.connect("mongodb+srv://ttushaar45:tushar1906@cluster0.dtjlqer.mongodb.net/estate_mern?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log("Error while connecting",err)
})
const app = express();

app.listen(3000, ()=>{
    console.log('Server is running on port 4545')
})
