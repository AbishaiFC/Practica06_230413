import authService from '../services/auth.service.js';
import { v4 as uuidv4 } from 'uuid';
import userUtils from '../utils/user.utils.js';
const authController = {};

authController.login = async (req, res) => {
    try {
        const { name, email, clientMac } = req.body;

        if (!name || !email || !clientMac) {
            return res.status(400).json({ 
                message: "Datos no válidos, verifique de nuevo" 
            });
        }

        const existingUser = await authService.userExist(email);
        if (existingUser) {
            req.session.user_id = existingUser.user_id;
            
            return res.json({ 
                existingUser 
            });
        }

        const uuid = uuidv4();
        const user = {
            user_id: uuid,
            name,
            email,
            clientData: {
                ipAddress: userUtils.encryptData(req.clientIp), 
                macAddress: userUtils.encryptData(clientMac)
            },
            lastActivity: new Date()
        };

        const request = await authService.login(user);

        if (request) {
            req.session.user_id = uuid;

            return res.json({ 
                request 
            });
        } else {
            return res.status(500).json({ 
                message: "Error al iniciar sesión" 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
};

authController.logout = async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({
                message: "Ninguna sesión activa",
                status: "Sesión finalizada por el sistema"
            });
        }

        const logoutUser = await authService.logout(req.session.user_id);
        req.session.destroy(async (error) => {
            if (error) {
                return res.status(500).json({ 
                    message: "Error al cerrar sesión", 
                    error 
                });
            }

            
        });
            return res.json({
                logoutUser
            });
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
};

export default authController;
