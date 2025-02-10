import usersService from '../services/user.service.js';

const userController = {};

userController.home = (req,res) =>{
    res.json({
        message: "Bienvenido al sistema de manejo de sesiones persistentes con MongoDB",
        author: "Osvaldo Abishai Flores Campos"
    })
}

userController.getSession = async(req,res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({
                message: "Ninguna sesión activa",
                status: "Sesión finalizada por el sistema"
            });
        }

        const currentSession = await usersService.session(req.session.user_id);

        if (!currentSession) {
            return res.status(500).json({ 
                message: "No se pudo obtener la sesión" 
            });
        }

        return res.status(200).json({
            currentSession
        });

    }catch(error){
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
}

userController.update = async(req,res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({
                message: "Ninguna sesión activa",
                status: "Sesión finalizada por el sistema"
            });
        }

        const updatedSession = await usersService.update(req.session.user_id);

        if (!updatedSession) {
            return res.status(500).json({ message: "No se pudo actualizar la sesión" });
        }

        return res.status(200).json({
            message: "Sesión actualizada exitosamente",
            updatedSession
        });
    }catch(error){
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
}

export default userController;