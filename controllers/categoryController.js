const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY CONTROLLER
const createCategoryController = async(req, res) => {
    try{
        const {title, imageUrl} = req.body;

        // validation
        if(!title || !imageUrl) {
            return res.status(500).send({
                success:false,
                message:"Please provide category title or image"
            })
        }

        const newCategory = await categoryModel({title, imageUrl});
        await newCategory.save();

        return res.status(201).send({
            success:true,
            message:"Category created successfully",
            data : newCategory
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create category API",
            error
        })
    }

}

// export
module.exports = {createCategoryController}