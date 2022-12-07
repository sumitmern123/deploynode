const mongoose=require('mongoose');
const dataSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true,
      unique:true
   },
   city:{
    type:String,
    required:true
   }
})
module.exports=mongoose.model('data',dataSchema);