const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// GET USER INFO
const getUserController = async(req, res) => {
    try{
        // find user
        const user = await userModel.findById(req.user.id)
        // const user = await userModel.findById(req.user.id,{_id:0}) // agar hum id ko show nahi karana chahte hai to iss tarah se krskte hai

        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found!'
            })
        }
        // hide password
        user.password = undefined

        return res.status(200).send({
            success:true,
            message:"User get successfully!",
            user
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get user API",
            error
        })
    }
}

// UPDATE USER
const updateUserController = async(req, res) => {
    try{
        // find user
        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found',
            })
        }
        // update user
        const {userName, address, phone} = req.body

        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        // save user
        await user.save();
        res.status(200).send({
            success:true,
            message:'User updated successfully!',
        });
        res.send("hello from udpate api");

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Failed to update user",
            error
        })
    }
}

// UPDATE PASSWORD
const updatePasswordController = async(req, res) => {
    try{
        // find password
        const user = await userModel.findById(req.user.id);
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found!'
            })
        }

        // get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old or new password"
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old password"
            })
        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword; // update new password
        await user.save();
        
        res.status(200).send({
            success:true,
            message:'Password updated successfully!'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in update password API',
            error
        })
    }

}

// RESET PASSWORD
const resetPasswordController = async(req, res) => {
    try{
        const {email, newPassword, answer} = req.body 
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }

        // find user
        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found!'
            })
        }

        // password hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword; // replacxe old pass with new hashed password
        await user.save();

        res.status(200).send({
            success:true,
            message:'Password reset successfully!'
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in reset password API',
            error
        });
    }

}

module.exports = {getUserController, updateUserController, resetPasswordController,updatePasswordController}