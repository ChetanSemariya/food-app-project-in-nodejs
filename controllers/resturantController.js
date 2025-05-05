const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async(req, res) => {
    try{
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

module.exports = {createResturantController}