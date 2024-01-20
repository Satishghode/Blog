import express from 'express';
import { test } from '../controllers/user.controllres.js';

const routes = express.Router();


routes.get('/test', test)

export default routes;