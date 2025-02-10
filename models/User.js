import {model, Schema} from 'mongoose'

const usersSchema = new Schema({
    user_id:{
        unique:true,
        required:true,
        type:String
    },
    name:String,
    email:String,
    clientData:{
        ipAddress: String,
        macAddress: String
    },
    serverData:{
        ipAddress: String,
        macAddress: String
    },
    status: {
        currentStatus: {
            type: Boolean,
            default: true
        },
        description: {
            type: String,
            default: ''
        }
    },
    type: {
        type: String,
        enum:['user', 'admin'],
        default:'user'
    },
    lastActivity: Date
},{
    versionKey: false,
    timestamps: true
});

export default model('user', usersSchema);