const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }
)
.then(() => { console.log("Connected to the mongodb!") })
.catch((error)=>console.log("Error while connecting to server!",error.message));
