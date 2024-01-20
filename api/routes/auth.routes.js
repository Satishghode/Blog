import express from 'express';
import  { singnUp, signIn } from '../controllers/auth.controller.js'

const routes = express.Router();

routes.post('/signup', singnUp).get('/signIn', signIn);

export default routes;