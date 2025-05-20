const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async(req, res) => {
    try{
        // retuzxrn res.json("hello resturant");
        const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    } = req.body

    // validation
    if(!title || !coords) {
        return res.status(500).send({
            success:false,
            message:'Please provide title and address'
        });
    }

    const newResturant = new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    });

    await newResturant.save();

    res.status(201).send({
        success:true,
        message:"New Resturant create successfully!"
    })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create restraunt API",
            error
        })
    }

}

// GET ALL RESTRAUNT
const getAllRestrauntController = async(req, res) => {
    try{
        const restraunts = await resturantModel.find({}); // get all resturant
        if(!restraunts){
            return res.status(404).send({
                success:false,
                message:'No resturant available'
            })
        }

        res.status(200).send({
            success:true,
            totalCount:restraunts.length,
            restraunts
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all restraunt api",
            error
        })
    }

}

// GET RESTURANT BY ID
const getResturantByIdController = async(req, res) => {
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Please provide resturant id",
            })
        }

        // find resturant
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            res.status(404).send({
                success:false,
                message:"No resturant found"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Resturant retrieve successfully!",
            data: resturant
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get resturant by Id",
            error
        })
    }

}

// DELETE RESTURANT
const deleteResturantController = async(req, res) => {
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'No resturant found or provide restraunt id'
            })
        }

        const resturant = await resturantModel.findByIdAndDelete(resturantId);
        return res.status(200).json({
            success:true,
            message:'Resturant deleted successfully'
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in deleting restraunt',
            error
        });
    }

}

module.exports = {
    createResturantController,
    getAllRestrauntController,
    getResturantByIdController,
    deleteResturantController
}