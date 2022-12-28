const Message = require("../models/ProposalAndContract/Message")


const sendEmailsUnread =async () => {
    const message =await Message.find({read:false}).populate('freelancer_id').populate('hire_manager_id').exec();
}

module.exports ={
    sendEmailsUnread
}