'use strict';
const nodemailer = require('nodemailer');
const user = process.env.REACT_APP_MAILER_USER;
const pass = process.env.REACT_APP_MAILER_PASS;

const sendMail = async mail => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Sidesuite" <jaime.liu@proximitycr.com>', // sender address
      to: mail.destination, // list of receivers
      subject: 'Social media verification code', // Subject line
      text: mail.text, // plain text body
      html: '<b>Policy=' + mail.text + '</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
  } catch (error) {
    console.error(error);
  }

  // create reusable transporter object using the default SMTP transport
};

module.exports = sendMail;
