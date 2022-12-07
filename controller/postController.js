const dataModel=require('../model/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require("jsonwebtoken");
const userModel=require('../model/userModel');
function login(req,res){
    const {uname,password}=req.body;
    userModel.findOne({ username: uname }, (err, data) => {
        if (err) {
            res.status(400).json({err:1,message:"Something went wrong"})
        }
        else if (data == null) {
            res.status(400).json({err:1,message:"Uname and password is not correct"})
        }
        else {
            if (bcrypt.compareSync(password, data.password)) {
            //creating jwt totken 
             token=jwt.sign(
                {userId:data._id,username:data.username},process.env.SECRET_KEY,{expiresIn:"1h"}
             )
                res.status(200).json({err:0,"msg":"Login Success",_token:token})
            }
            else {
                res.status(400).json({err:1,message:"Uname and password is not correct"})
            }
        }
})}
function regis(req,res){
    let { email,uname, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    userModel.create({ email:email,username: uname, password: hash})
        .then(data => {
            res.status(200).json({err:0,"msg":"User Registered"})
        })
        .catch(err=>{
            res.status(400).json({err:1,"msg":"Email or username already exists"})
        })
}
function access(req,res){
    //Bearer token
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(200).json({message:"Error : token was not provided"})
    }
    else {
        const decodeToken=jwt.verify(token,process.env.SECRET_KEY);
        res.status(200).json({userId:decodeToken.userId,username:decodeToken.username});
    }
}
async function addProduct(req,res){
    const data=new dataModel({
        name:req.body.name,
        city:req.body.city
    })
     try{
        const dataSave=await data.save();
        res.status(200).json({"message":"Data Added"})
     }
     catch(error){
         res.status(400).json({"message":error.message})
     }
    
}
async function getProduct(req,res){
    try{
        const data=await dataModel.find();
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
async function getProductById(req,res){
    try{
        const data=await dataModel.findOne({_id:req.params.id});
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
async function deleteProduct(req,res){
    try{
        const id=req.params.id;
        const data=await dataModel.findByIdAndDelete(id);
        res.status(200).json({"message":"Data Deleted"})
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
async function updateProduct(req,res){
    try{
        const id=req.params.id;
        const updateData=req.body;
        const options={new:true};
        const data=await dataModel.findByIdAndUpdate(id,updateData,options);
        res.status(200).json({"message":"Data Updated"})
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
module.exports={addProduct,getProduct,getProductById,deleteProduct,updateProduct,login,regis,access}