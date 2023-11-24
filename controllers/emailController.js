const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

//  SEND MAIL
const sendEmail = asyncHandler(async (data, req, res) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jumamelvine10@gmail.com',
          pass: "sghe vulj alxp byus"
        }
      });
      
      const mailOptions = {
        from: 'jumamelvine10@gmail.com',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html:data.html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    




    })
            




module.exports = sendEmail