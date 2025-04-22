const express = require('express')
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDb = require('./config/db');

// configure env
dotenv.config();
// dotenv.config({path:'./'}) // agar env file koi dusre path pr hai root mai nahi hai

// DB connection
connectDb() // call the database

// rest object express ke feature ko use krne k liye
const app = express()

// middleware
app.use(cors());
app.use(express.json()); // client se data ko access krne ke liye json format mai
app.use(morgan('dev')); // dev hume yhh batayga ki konsa url hit hua hai kis time pr

// route
// url => http:localhost:8000
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);


app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to food server Appp</h1>');
});

// port
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgMagenta.white);
});

// morgan package = Jo bhi api hit hoti hai usko hume show karata hai
// cors => Cross origin jab bhi hume node ko kisi dusre server se communicate karana hai to uske liye iss package ki need padti hai