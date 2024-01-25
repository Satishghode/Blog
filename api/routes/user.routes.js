import express from 'express';
import { updateUser , deleteUser } from "../controllers/user.controllres.js";
import { verifyUser } from '../utils/verifyUser.js';

const routes = express.Router();



routes.put("/update/:userId",verifyUser , updateUser);
routes.delete("/delete/:userId", verifyUser, deleteUser);

export default routes;