const mongoose = require('mongoose');

// define schema
const categorySchema = new mongoose.Schema({
   title:{
     type:String,
     required:[true, 'Category title is required']
   },
   imageUrl : {
     type:String,
     default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
   }
    
}, {timestamps:true})

// export
module.exports = mongoose.model('category', categorySchema);