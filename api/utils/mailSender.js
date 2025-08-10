import nodemailer from "nodemailer"
import { newReg } from "./mailTemplates/newReg.js";
import { otpSend } from "./mailTemplates/otpSend.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILEMAIL,
        pass: process.env.MAILPASSWORD,
    },
});

export const sendMailFn = async ({ to, reason, userName, userEmail, rDate,otp }) => {
    if (!to) {
        console.error("❌ No recipient email address provided.");
        return;
    }
    console.log(to);
    
    let subject = "";
    let htmlbody = "";

    switch (reason) {
        case "newReg":
            subject = "New User Registration";
            htmlbody = newReg(userName, userEmail, rDate); // your HTML template function
            break;

        case "otpSend":
            subject = "OTP for Forgot Password";
            htmlbody = otpSend(otp); // your HTML template function
            break;

        default:
            console.error("Unknown email reason:", reason);
            return;
    }

    const mailOptions = {
        from: `"FindStay Admin" <${process.env.MAILEMAIL}>`,
        to,
        subject,
        html: htmlbody,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};
