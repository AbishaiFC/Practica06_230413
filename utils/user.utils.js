import { publicEncrypt, privateDecrypt, constants } from 'crypto'
import { privateKey, publicKey } from '../config/keys.js'


import moment from 'moment-timezone'
import os from 'os';

const userUtils = {};

userUtils.encryptData = (data) => {
    try {
        const encryptedData = publicEncrypt({
            key: publicKey,
            padding: constants.RSA_OAEP_PADDING 
        }, Buffer.from(data));
        return encryptedData.toString('base64');
    } catch (error) {
        console.error('Error encrypting data:', error);
        throw error; 
    }
};

userUtils.desencryptData = (data) => {
    try {
        const decryptedData = privateDecrypt({
            key: privateKey,
            padding: constants.RSA_OAEP_PADDING
        }, Buffer.from(data, 'base64'));  
        return decryptedData.toString('utf8');
    } catch (error) {
        console.error('Error decrypting data:', error);
        throw error;
    }
};

userUtils.formatedDates = (date) => {
    return moment(date).tz("America/Mexico_City").format("YYYY-MM-DD HH:mm:ss");
};

userUtils.timeDifference = (date) => {
    const sessionAgeMs = new Date() -  new Date(date);
    const hours = Math.floor(sessionAgeMs / (1000 * 60 * 60));
    const minutes =  Math.floor(sessionAgeMs % (1000 * 60 * 60) / (1000 * 60));
    const seconds =  Math.floor(sessionAgeMs % (1000 * 60) / 1000);
    
    return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}
userUtils.getServerNetworkInfo = () => {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return { serverIp: iface.address, serverMac: iface.mac };
            }
        }
    }
    return null;
};

export default userUtils;