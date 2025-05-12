import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';

import cookieParser from "cookie-parser";

// import all routes
import userRoutes from "./routes/user.routes.js";










dotenv.config();

const app = express();

app.use(cors({
        origin: process.env.BASE_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const port = process.env.PORT || 4000;
//connect to db
db();

app.get('/', (req, res) => {
        res.send('Hello World!');
})

// user routes 
app.use("/api/v1/users" , userRoutes);  
 
















app.listen(port, ()=>{
        console.log(`server is running at http://localhost:${port}`);    
})


