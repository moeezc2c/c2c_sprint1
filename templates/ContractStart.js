function StartContractTemplate (clientUserName,jobTitle) {
    return {
        title: "Start Contract Invitation",
        body: `<b>Hi Cyber To Cyber Expert </b></br>${clientUserName} Has Invited for a job proposal </br> Kindly use below link to responde to ${clientUserName} for ${jobTitle}. <a href='http://localhost:3000/contract-start?token=&reset_type=email'>Cyber to Cyber</a>`
    }
}

module.exports = StartContractTemplate;