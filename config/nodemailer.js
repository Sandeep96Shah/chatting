const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // avoid 2 factor authentication
    auth: {
        user: "peacewithinme96@gmail.com",
        pass: "wfinqngvxzcducjt"
    }
});

// todo to create the template of the mail

module.exports = {
    transporter,
}

// pass: "Shah@1996",