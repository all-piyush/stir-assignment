import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routes/Route.js';

const app=express();
dotenv.config();
app.use(cors({
    origin:['http://localhost:3000','https://stir-assignment-seven.vercel.app'],
    credentials:true
}))
app.use(express.json());
const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`app started at port ${process.env.PORT} ` );
})
app.get('/',(req,res)=>{
    res.send("Welcome To Backend Server");
})
app.use('/api/v1',router);
