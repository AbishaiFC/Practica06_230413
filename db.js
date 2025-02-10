import mongoose from "mongoose";

mongoose.connect('mongodb+srv://aprendienteacademico05:J3nn1f3r2023@cluster-abishai.wtg62.mongodb.net/system_users?retryWrites=true&w=majority&appName=Cluster-Abishai')
.then((db=>console.log("MongoDB Atlas conectado")))
.catch((error)=>console.error(error));

export default mongoose;