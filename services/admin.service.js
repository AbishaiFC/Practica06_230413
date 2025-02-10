import usersDAO from '../daos/user.dao.js'
import userUtils from '../utils/user.utils.js'
const adminService = {};

adminService.allSessions = async() => {
    const sessions = await usersDAO.getAll()

    if(sessions.length > 0){
        

        return sessions.map( 
            session => ({
                id: session.user_id,
                name: session.name,
                email: session.email,
                clientData: {
                    ipAddress: session.clientData.ipAddress,
                    macAddress: session.clientData.macAddress
                },
                serverData: {
                    ipAddress: session.serverData.ipAddress,
                    macAddress: session.serverData.macAddress
                },
                lastAccess: userUtils.formatedDates(session.lastAccess),
                createdAt: userUtils.formatedDates(session.createdAt),
                sessionTime: userUtils.timeDifference(session.lastAccess),
                status: {
                    currentStatus: session.status.currentStatus,
                    description: session.status.description
               }
            })
        );
    }

    return{
        message: "No se encontró ningún usuario registrado"
    }
}

adminService.activeSessions = async() => {
    const sessions = await usersDAO.getActives()

    if(sessions.length > 0){
        return sessions.map( 
            session => ({
                id: session.user_id,
                name: session.name,
                email: session.email,
                clientData: {
                    ipAddress: session.clientData.ipAddress,
                    macAddress: session.clientData.macAddress
                },
                serverData: {
                    ipAddress: userUtils.desencryptData(session.serverData.ipAddress),
                    macAddress: userUtils.desencryptData(session.serverData.macAddress)
                },
                lastAccess: userUtils.formatedDates(session.lastAccess),
                createdAt: userUtils.formatedDates(session.createdAt),
                sessionTime: userUtils.timeDifference(session.lastAccess),
                inactivityTime: userUtils.timeDifference(session.lastActivity),
                status: {
                     currentStatus: session.status.currentStatus,
                     description: session.status.description
                }
            })
        );
    }

    return{
        message: "No se encuentran usuarios activos actualmente"
    }
}

adminService.deleteAll = async (confirm) => {
    if(confirm.toLowerCase() == 'si'){
        const deleteAll = await usersDAO.deleteAll();

        if(deleteAll){
            return {
                message: "Todos los usuarios eliminados con éxito"
            }
        }

        return{
            message: "Fallo del servidor al realizar esta acción intente de nuevo"
        }
    }
    
    return {
        message: "Acción cancelada"
    }
}

export default adminService;