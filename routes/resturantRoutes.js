const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
        createResturantController,
        getAllRestrauntController,
        getResturantByIdController,
        deleteResturantController
    } = require('../controllers/resturantController');
const router = express.Router();

// routes

// CREATE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController)

// GET ALL RESTRAUNT 
router.get('/get-all-restraunt', getAllRestrauntController);

// GET ALL RESTURANT BY ID
router.get('/single-resturant/:id', getResturantByIdController);

// DELETE RESTURANT
router.delete('/delete/:id', authMiddleware, deleteResturantController)

module.exports = router;