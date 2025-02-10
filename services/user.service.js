import usersDAO from '../daos/user.dao.js'
import userUtils from '../utils/user.utils.js';

const usersService = {};


usersService.session = async(user_id) =>{
    console.log(user_id);
    const session = await usersDAO.getSession(user_id);

    if(session){
        return {
            id: session.user_id,
            name: session.name,
            email: session.email,
            clientData: {
                ipAddress: userUtils.desencryptData(session.clientData.ipAddress),
                macAddress: userUtils.desencryptData(session.clientData.macAddress)
            },
            serverData: {
                ipAddress: userUtils.desencryptData(session.serverData.ipAddress),
                macAddress: userUtils.desencryptData(session.serverData.macAddress)
            },
            lastAccess: userUtils.formatedDates(session.lastAccess),
            createdAt: userUtils.formatedDates(session.createdAt),
            sessionTime: userUtils.timeDifference(session.lastAccess)
        }
    }
    return {
        message: "Ocurrio un error inesperado"
    }
}

usersService.update = async(user_id) => {
    const updated = await usersDAO.update(user_id);

    if(updated){
        return {
            message:'Datos actualizados exitosamente' 
        }
    }
    return {
        message: "Ocurrio un error inesperado"
    }
}

export default usersService;