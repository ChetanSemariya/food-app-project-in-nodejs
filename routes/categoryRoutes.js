const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {
        createCategoryController,
    } = require('../controllers/categoryController');
const router = express.Router();

// routes

// create category
router.post('/create', authMiddleware, createCategoryController)



module.exports = router;