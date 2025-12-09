// import nodemailer from 'nodemailer';

// const mailService = async() => {
//     // Create a test account or replace with real credentials.
//     const transporter = nodemailer.createTransport({
//         host: process.env.MAILTRAP_HOST,
//         port: process.env.MAILTRAP_PORT,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: process.env.MAILTRAP_USERNAME,
//             pass: process.env.MAILTRAP_PASSWORD,
//         },
//     });

//     try {
//          const info = await transporter.sendMail({
//             from: process.env.MAILTRAP_SENDERMAIL,
//             to: "bkbajpay0905@gmail.com",
//             subject: "Verify your email",
//             text: `plz click on the followin link: 
//                 ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain‑text body
//             html: "<b>Hello world?</b>", // HTML body
//         });
//         console.log(info);
//         return info;
//     } catch (error) {
//         console.log("mail error: ", error);
//         throw error;
//     }
// }

// export default mailService;

import { MailtrapClient } from "mailtrap";

const mailService = async (email, token) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_API_TOKEN,
    });

    const sender = {
        email: process.env.MAILTRAP_SENDER_EMAIL,
        name: process.env.MAILTRAP_SENDER_NAME,
    };

    const recipients = [
        {
            email: email,
        }
    ];

    try {
        const info = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            text: `Please click on the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
            html: `<h1>Email Verification</h1>
                   <p>Please click on the link below to verify your email:</p>
                   <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">Verify Email</a>`,
            category: "Email Verification",
        });
        
        console.log("Email sent successfully:", info);
        return info;
    } catch (error) {
        console.log("Mail error:", error);
        throw error;
    }
}

export default mailService;