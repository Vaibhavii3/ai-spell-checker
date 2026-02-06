const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires: 60 * 5,
    }
});

async function sendVerificationEmail(email, otp) {
    try{
        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #667eea;">AIChecker - Email Verification</h2>
                <p>Your OTP for verification is:</p>
                <h1 style="color: #764ba2; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
                <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
            </div>
        `;

        const mailResponse = await mailSender(
            email, 
            "Verification Email From AIChecker", 
            emailBody
        );
        console.log("Email sent Successfully:", mailResponse);
    } catch(error){
        console.log("error occured while sending mails:", error)
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    console.log("Sending verification email to:", this.email);
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);
