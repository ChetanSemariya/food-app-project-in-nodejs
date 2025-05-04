const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async(req, res) => {
    try{
        const {userName, email, password, phone, address, answer} = req.body // destructuring

        // validation
        if(!userName || !email || !password || !address || !phone || !answer){
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
                message:'Email already registered please login'
            })
        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const user = await userModel.create({
            userName,
            email,
            password:hashedPassword,
            address,
            phone,
            answer
        });

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

// LOGIN
const loginController = async(req, res) => {
    try{
        // destructure email and password
        const {email, password} = req.body

        // validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please provide email and password'
            })
        }

        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found!'
            })
        }

        // check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(500).send({
                success:false,
                message:"Password not match"
            });
        }

        // create jwt token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        
        // Note :- generate krne ke liye sign func ka use krte hai and check krne ke liye verify func ka. sign func mai hum vo value dete hai jiske behalf pr hume encryption krna hai and second paramter mai humari secret key ka name aata hai and in third parameter we define expiration time

        user.password = undefined; // password ko hide krne ke liye 

        res.status(200).send({
            success:true,
            message:'Login Successfully!',
            token,
            user
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        })
    }
}

module.exports = {registerController, loginController}