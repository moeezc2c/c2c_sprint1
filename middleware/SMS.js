const twilio = require('twilio');

/*
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
*/

const accountSid = 'AC96583873b67b9c27b9fa690df1375f66'; 
const authToken = '40a71429ad84d30d698dfcc20dc0a829'; 
const client = require('twilio')(accountSid, authToken); 

let sendSMS = (phone, message) => client.messages
    .create({
        body: message,
        //from: '+17129000015',
        messagingServiceSid: 'MG1c2cc6f2988c71a022c65213a5f4928e',  
        to: phone
    })
    //.then(message => console.log(message));
    .then(message => console.log(message.sid));

module.exports = sendSMS;