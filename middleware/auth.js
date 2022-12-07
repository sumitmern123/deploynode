const jwt=require('jsonwebtoken');
const jwtvalidate=()=>{
    return (req,res,next)=>{
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer')
        {
           let token=req.headers.authorization.split(' ')[1];
           jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
             if(err){
    res.status(400).json({err:1,message:"Invalid token"})
             }
             else{
                next();
             }
           })
        }
        else{
            res.status(400).json({
                err:1,
                message:"Please provide a token"
            })
        }
    }

}
module.exports=jwtvalidate;