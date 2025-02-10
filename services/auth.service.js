import usersDAO from '../daos/user.dao.js'
import userUtils from '../utils/user.utils.js'
const authService = {};


authService.login = async(user) => {
    const { serverIp, serverMac } = userUtils.getServerNetworkInfo();
    const newUser = await usersDAO.login({
        ...user,
        serverData: {
            ipAddress: userUtils.encryptData(serverIp),
            macAddress: userUtils.encryptData(serverMac)
        }
    });

    if(newUser){
        return{
            status: "Sesión creada con éxito",
            message: `Bienvenido, ${newUser.name}`,
            user_id: newUser.user_id
        }
    }

    return null
}

authService.userExist = async(email) => {
    const existingUser = await usersDAO.userExists(email);

    if(existingUser){
        const user = await usersDAO.existingUser(existingUser.user_id);

        return{
            status: "Sesión reactivada",
            message: `Bienvenido de nuevo, ${user.name}`,
            user_id: user.user_id
        }
    }

    return null;
}

authService.logout = async(user_id) => {
    const userLogout = await usersDAO.logout(user_id);

    if(userLogout){
        return{
            status: "Sesión finalizada con éxito",
            message: `Hasta luego, ${userLogout.name}`,
            user_id: userLogout.user_id
        }
    }
    return { 
        status: "error", 
        message: "No se encontró el usuario" 
    };
}

authService.errorlogout = async (user_id) => {
    const userLogout = await usersDAO.logout(user_id);

    if(userLogout){
        return{
            status: "Sesión finalizada por el sistema",
            message: `Hasta luego, ${userLogout.name}`,
            user_id: userLogout.user_id
        }
    }
}

export default authService;