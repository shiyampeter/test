const nodemailer = require("nodemailer");
const {google} = require('googleapis');
const CLIENT_ID = '311600023632-ukcpltp1n3jagaaa19q8nsgrhs4v1ltn.apps.googleusercontent.com'
const CLIENT_SECRET =  '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04sSU5xK6BVPECgYIARAAGAQSNwF-L9IrkPq94qtWoCxUq1O3-H-D9RcpOi6cteGTRhfH_7oUu51bgIEx5sC8-XC74KL6q4qgnHA'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const mail = async(req,res,next) => {
    const accesstoken = await oAuth2Client.getAccessToken()
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type:'OAUTH2',
          user: 'mytestpetershiyam@gmail.com', 
          clientId: CLIENT_ID,
          clientSecret : CLIENT_SECRET,
          refreshToken : REFRESH_TOKEN,
          accessToken : accesstoken
        }
      });



    var compose = {
        from: '"peter" <mytestpetershiyam@gmail.com>', // sender address
        to: "shiyampeter@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body


    }

    transporter.sendMail(compose,(error,info) => {
        if(error){
            console.log(error)
        }
        else{
            console.log("success")
        }
    })
}

const mailout = async(req,res,next) => {
    
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          
          user: 'mytestpetershiyam@outlook.com', 
          pass: 'petershiyam@123'
        }
      });



    var compose = {
        from: '"peter" <mytestpetershiyam@outlook.com>', // sender address
        to: "shiyampeter@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body


    }

    transporter.sendMail(compose,(error,info) => {
        if(error){
            console.log(error)
        }
        else{
            console.log("success")
        }
    })
}
module.exports = {mail,mailout};