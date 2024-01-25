import express from 'express';
import { updateUser , deleteUser, signout } from "../controllers/user.controllres.js";
import { verifyUser } from '../utils/verifyUser.js';

const routes = express.Router();



routes.put("/update/:userId",verifyUser , updateUser);
routes.delete("/delete/:userId", verifyUser, deleteUser);
routes.post("/signout", signout);

export default routes;