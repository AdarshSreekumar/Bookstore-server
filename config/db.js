const mongoose=require('mongoose')

// get connection string from .env file
const connectionString=process.env.ATLASDBCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connection Successful");
    
}).catch(err=>{
    console.log("database connecion Failed");
    console.log(err);
     
})