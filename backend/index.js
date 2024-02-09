import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('welcome to MERN stack tutorial');
});

app.use('/books', booksRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('app connected to database successfully');
    app.listen(PORT, () => {
        console.log('App is litening to port: ' + PORT );
    });    
})
.catch((err) => {
    console.log(err);
});
