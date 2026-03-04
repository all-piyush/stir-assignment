import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routes/Route.js';

const app=express();
dotenv.config();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json());
app.listen(process.env.PORT,()=>{
    console.log(`app started at port ${process.env.PORT} ` );
})
app.get('/',(req,res)=>{
    res.send("Welcome To Backend Server");
})
app.use('/api/v1',router);
