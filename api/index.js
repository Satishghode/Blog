import express from 'express';
import { env } from 'process';

const app = express();

const port = env.port;

app.listen( env.port ||  3000 , () => {
    console.log("server is listening on port 3000!!!")
});

app.get('/',(req, res) => {

    res.send("Server is on home page");
})