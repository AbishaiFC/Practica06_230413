import usersDAO from "../daos/user.dao.js";

export const adminVerify = (req, res, next) => {
    const password = req.query.password;

    if (password !== '********') {
        return res.status(403).json({
            message: "Acceso denegado: Contraseña incorrecta"
        });
    }

    next();
};

export const updateLastActivity = async (req, res, next) => {
    if (!req.session.user_id) {
        return next(); 
    }

    try {
        await usersDAO.updateLastActivity(req.session.user_id);
    } catch (error) {
        console.error('Error actualizando la última actividad:', error);
    }
    next();
};
