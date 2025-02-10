import User from '../models/User.js';

const usersDAO = {};

// Users
usersDAO.getSession = async(user_id) => {
    return await User.findOne({user_id: user_id});
};

usersDAO.update =async(user_id)=>{
    return await User.findOneAndUpdate({
        user_id: user_id
    }, { 
        $set :{
            lastAccess: new Date()
        }
    }, { 
        new: true 
    })
}

usersDAO.updateLastActivity = async(user_id)=>{
    return await User.findOneAndUpdate({
        user_id: user_id
    }, { 
        $set :{
            lastActivity: new Date()
        }
    })
}
// Auth
usersDAO.login=async(user)=>{
    return await User.create(user);
};

usersDAO.userExists=async(email)=>{
    return await User.findOne({ email });
};

usersDAO.existingUser=async(user_id)=>{
    return await User.findOneAndUpdate({
        user_id: user_id
    }, { 
        $set :{
            "status.currentStatus":true,
            "status.description":'',
            lastAccess: new Date(),
            lastActivity: new Date()
        }
    }, { 
        new: true 
    })
};

usersDAO.logout =async(user_id)=>{
    return await User.findOneAndUpdate({
        user_id: user_id
    }, { 
        $set :{
            "status.currentStatus":false,
            "status.description":'Finalizada por el usuario'
        }
    })
}
usersDAO.errorlogout =async(user_id)=>{
    return await User.findOneAndUpdate({
        user_id: user_id
    }, { 
        $set :{
            "status.currentStatus":false,
            "status.description":'Finalizada por el sistema'
        }
    })
}

// Admin
usersDAO.getAll=async()=>{
    return await User.find()
}

usersDAO.getActives=async()=>{
    return await User.find({"status.currentStatus":{$eq: true}})
}

usersDAO.deleteAll=async()=>{
    return await User.deleteMany({});
}

export default usersDAO;