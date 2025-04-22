const userModel = require("../models/userModel");

// REGISTER
const registerController = async(req, res) => {
    try{
        const {userName, email, password, phone, address} = req.body // destructuring

        // validation
        if(!userName || !email || !password || !address || !phone){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }

        // check user
        const existing =  await userModel.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email already registered please loginsassssss'
            })
        }

        // create new user
        const user = await userModel.create({userName,email,password,address,phone});

        res.status(201).send({
            success:true,
            message:"Successfully registered",
            data:user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error:error
        })
    }

}

module.exports = {registerController}