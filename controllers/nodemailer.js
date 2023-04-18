const nodemailer = require('../config/nodemailer');
const speakEasy = require("speakeasy");
const OTPTest = require('../models/otpTest');


module.exports.sendMail = async (req, res) => {
    try{
        const secret = speakEasy.generateSecret({length: 20}).base32;
        console.log("secret", secret);

        const data = await OTPTest.create({
            secret,
        })

        const token = speakEasy.totp({
            secret,
            encoding: "base32",
        })

        console.log("token", token);
        const emailData = await nodemailer.transporter.sendMail({
            from: "peacewithinme96@gmail.com",
            to: "sandeep2016shah@gmail.com",
            subject: "First Mail via nodemailer",
            text: "Hello Peace!",
            html: `<h1>Nice to meet with you after sooo long! ${token} </h1>`
        });

        return res.status(200).json({
            message: "Mail send successfully!",
            data: {
                emailData,
                data
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong!",
            data: 
            error,
        })
    }
}

module.exports.verify = async (req, res) => {
    try{
        const { userId, token } = req.body;
        const data = await OTPTest.findById(userId);
        const valid = speakEasy.totp.verify({
            encoding: "base32",
            secret: data.secret,
            token,
            window: 3,
        })

        return res.status(200).json({
            message: "Yuppp",
            data: {
                valid,
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong!",
            data: 
            error,
        })
    }
}