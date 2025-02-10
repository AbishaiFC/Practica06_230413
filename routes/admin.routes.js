import adminController from '../controllers/admin.controller.js'
import{ adminVerify } from '../middlewares/user.middlewares.js'
import { Router } from 'express';

const adminRouter = Router();

adminRouter.get('/allSessions', adminVerify,adminController.allSessions);

adminRouter.get('/activesSessions', adminVerify ,adminController.activeSessions);

adminRouter.post('/deleteAllSessions', adminVerify, adminController.deleteAll);

export default adminRouter