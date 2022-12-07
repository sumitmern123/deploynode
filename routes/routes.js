const express=require('express');
const {body,validationResult}=require('express-validator');
const jwtvalidate=require('../middleware/auth');
const validate=validations=>{
    return async (req,res,next)=>{
        await Promise.all(validations.map(validation=> validation.run(req)))
        const errors=validationResult(req);
        if(errors.isEmpty()){
          next();
        }
        res.status(400).json({
            error:1,
            errors:errors.array()
        })
    }
}
const {addProduct,getProduct,getProductById,deleteProduct,updateProduct, login, regis,access}=require('../controller/postController')
const router=express.Router();
router.post("/product/add",jwtvalidate(),addProduct);
router.get("/product/get",jwtvalidate(),getProduct)
router.get("/product/getproductbyid/:id",getProductById)
router.delete("/product/delete/:id",deleteProduct);
router.put("/product/update/:id",updateProduct)
router.post("/signin",login);
router.post("/signup",regis);
router.get("/accesstoken",access)
module.exports=router;