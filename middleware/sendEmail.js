"use strict";

const express = require("express");

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (emailAddress, body) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreply@cybertocyber.com",
      pass: "4zUbBcsMGm",
    }
  });

  // Email Options
  let mailoptions = {
    from: '"CYBER TO CYBER" <noreply@cybertocyber.com>', // sender address
    to: emailAddress, // list of receivers
    subject: body.title, // Subject line
    //text: "", // plain text body
    text: body.text, // plain text body

    html: body.body, // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailoptions);

  return info;
}


// // async..await is not allowed in global scope, must use a wrapper
// const newAccountEmailFunc = async (emailAddress)  =>{

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.titan.email",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "noreply@cybertocyber.com",
//       pass: "4zUbBcsMGm",
//     }
//   });

//   // Email Options
//   let mailoptions = {
//     from: '"CYBER TO CYBER" <noreply@cybertocyber.com>', // sender address
//     to: emailAddress, // list of receivers
//     subject: "WELCOME on CYBER To CYBER", // Subject line
//     text: "", // plain text body
//     html: "<b>Hi User, </b></br> We welcome you on cyber to cyber platform.", // html body
//   }

//   // send mail with defined transport object
//   let info = await transporter.sendMail(mailoptions);

//   return info;
// }


// router.post('/:emailAddress', [], async(req, res) => {

//   try {

//       const {
//       emailType,
//     } = req.body;


//     if (emailType == "forgotpassword")
//     {
//       let responseData = await forgetpasswordEmailFunc(req.params.emailAddress);
//       return res.json(responseData)
//     } else {
//       let responseData = await newAccountEmailFunc(req.params.emailAddress);
//       return res.json(responseData)
//     }

//     } catch (err) {
//       
//       res.status(500).send('Server Error');
//   }

// });

module.exports = { sendEmail };