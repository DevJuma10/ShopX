const nodemailer = requirie('nodemailer')
const asyncHandler = require('express-async-handler')

//  SEND MAIL
const sendEmail = asyncHandler(async (data, req, res) => {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.EMAIL_USER  ||  'jumamelvine10@gmail.com',
            pass: process.env.EMAIL_PASS || "sghe vulj alxp byus"
            }
    })

    // SEND MAIL WITH DEFINED TRANSPORT

    let info = await transporter.sendMail({
        from: '"Juma Melvin" <jumamelvine10@gmail.com>', // sender address
        to: 'receiver\'s address ||\' jumamelvine10@gmail.com', // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        html: data.html// html body
    })

    console.log("Message sent:  %s", info.messageId)

    console.log("Preview URL:  %s", nodemailer.getTestMessageUrl(info))
   

    




    })
            




module.exprts = sendEmail