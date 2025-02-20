import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { User } from "@/models/user.model";
interface SendMailParams {
  email: string;
  emailType: "VERIFY" | "RESET"; // Assuming only these two values are allowed
}
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendMail = async ({ email, emailType }: SendMailParams): Promise<any> => {
  console.log("Email is: ", process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)
  const user = await User.findOne({email});
  if (!user) {
    throw new Error("User not Found")
  }
  const token = jwt.sign({ email }, process.env.EMAIL_SECRET!);
  if(emailType === "VERIFY"){
    user.verifyToken = token;
    user.verifyTokenExpiry = Date.now() + (24 * 60 * 60 * 1000);
   }else{
    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = Date.now() + (24 * 60 * 60 * 1000);
   }
  await user.save();

  const info = await transporter.sendMail({
    from: 'npatodia085@gmail.com', // sender address
    to: email, // list of receivers
    subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Password",
    html: `<p>
  <a href="${process.env.DOMAIN}/${emailType==='VERIFY'?'verifyemail':'resetpassword'}?token=${token}">Click Here</a>
  <br> OR Copy Below Link:<br>
  ${process.env.DOMAIN}/${emailType==='VERIFY'?'verifyemail':'resetpassword'}?token=${token}
</p>`, // html body
  });

  return info
}


export { sendMail }