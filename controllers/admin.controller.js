import adminService from "../services/admin.service.js";

const adminController = {};

adminController.allSessions = async(req,res) => {
    try{
        const allSessions = await adminService.allSessions();

        return res.status(200).json({
            allSessions
        });
    }catch(error){
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
}

adminController.activeSessions = async(req,res) => {
    try{
        const activeSessions = await adminService.activeSessions();

        return res.status(200).json({
            activeSessions
        });
    }catch(error){
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
}

adminController.deleteAll = async(req,res) => {
    const { confirm } = req.body;

    if(!confirm){
        return res.status(400).json({ 
            message: "Confirmación requerida para eliminar los datos." 
        });
    }
    
    try{
        const deleteSessions = await adminService.deleteAll(confirm);

        return res.status(200).json({
            deleteSessions
        });
    }catch(error){
        return res.status(500).json({ 
            message: "Error del servidor", 
            error: error.message 
        });
    }
}

export default adminController;