import userController from '../controllers/user.controller.js';
import {updateLastActivity} from '../middlewares/user.middlewares.js'
import { Router } from "express";

const usersRouter = Router()

usersRouter.get('/', userController.home);
usersRouter.get('/session', updateLastActivity,userController.getSession);
usersRouter.post('/update', updateLastActivity,userController.update)

export default usersRouter;