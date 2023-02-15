const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const cors = require('cors');

// app.use(express.static('./build'));
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested:With, Content-Type, Accept"
    );
    next();
})

require('dotenv').config();
require('./config/mongoose');
require('./config/passport_jwt');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', require('./routes/index'));

chatServer.listen(port, (err) => {
    if(err){
        console.log(`error while running on port`);
        return;
    }
    console.log(`Running on port ${port}`);
})