import configs from "../configs";
import nodemailer from "nodemailer";

class MailSender {
  private transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configs.mailHost,
      port: configs.mailPort,
      auth: {
        user: configs.mailUser,
        pass: configs.mailPassword,
      },
    } as nodemailer.TransportOptions);
  }

  async sendTestEmail(email: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Test Email",
      text: "This is a test email",
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(email: string, token: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Verify Email",
      text: `Click this link to verify your email: ${configs.FRONTEND_URL}/auth/verify-account/${token}`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Reset Password",
      text: `Click this link to reset your password: ${configs.FRONTEND_URL}/auth/reset-password/${token}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

const mailSender = new MailSender();

export default mailSender;
