import express from 'express';
import  { singnUp, signIn, google } from '../controllers/auth.controller.js'

const routes = express.Router();

routes.post('/signup', singnUp);
routes.post('/signin', signIn);
routes.post('/google', google );


export default routes;