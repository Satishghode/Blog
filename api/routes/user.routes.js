import express from 'express';
import { updateUser } from "../controllers/user.controllres.js";
import { verifyUser } from '../utils/verifyUser.js';

const routes = express.Router();



routes.put("/update/:userId",verifyUser , updateUser);

export default routes;