const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT;
//database connection 
 mongoose.connect(process.env.DB_CONNECTION)
 .then(res=> console.log(" Database connected : "+res))
 .catch(err=> console.log(" Database error : "+err));
//end 
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const routes=require('./routes/routes');
app.use("/api",routes);
app.use("*",(req,res)=>{
    res.status(404).json({"message":"Endpoint not found"});
})
app.listen(PORT,(err)=>{
    if(err){
         console.log("Error "+err)
    }
    else console.log(`Work on ${PORT}`)
})