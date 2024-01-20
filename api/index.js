import express from 'express';
import connectDB from './db/connection.js';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
dotenv.config();


const app = express();
app.use(express.json());

// establishing a database connection to the server and connect to the database server.

connectDB()
.then(() => {
    console.log("connection established");
})
.catch((error) =>{
    console.log(`this is DB connection error ${error}`); 
})

// create a server instance and assign the port to the server instance 
app.listen(process.env.PORT || 3000 , () => {
    console.log(`server is listening on port  ${process.env.PORT} `  )
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
