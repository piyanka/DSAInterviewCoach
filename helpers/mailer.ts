import User from "@/models/UserModel";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const emailSender = async ({ email, emailType, userId }: any) => {
    try {
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const path =
            emailType === "VERIFY" ? "/user/verifyemail" : "/user/resetpassword";
        const actionText =
            emailType === "VERIFY" ? "Verify Email" : "Reset Password";
        const actionUrl = `${process.env.NEXTAUTH_URL}${path}?token=${rawToken}`;
        const message =
            emailType === "VERIFY"
                ? "Please confirm your email address by clicking the button below."
                : "Click the button below to reset your password.";

        const mailOptions = {
            from: "noreply@dsa",
            to: email,
            subject:
                emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                        <table width="600" style="background: #ffffff; padding: 30px; border-radius: 8px;">
                            
                            <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <h2 style="margin: 0; color: #333;">
                                ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
                                </h2>
                            </td>
                            </tr>

                            <tr>
                            <td style="color: #555; font-size: 16px; line-height: 1.5;">
                                <p>Hello,</p>
                                <p>${message}</p>
                            </td>
                            </tr>

                            <tr>
                            <td align="center" style="padding: 25px 0;">
                                <a href="${actionUrl}" 
                                style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                                        text-decoration: none; border-radius: 5px; font-size: 16px;">
                                ${actionText}
                                </a>
                            </td>
                            </tr>

                            <tr>
                            <td style="color: #555; font-size: 14px;">
                                <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
                                <p style="word-break: break-all; color: #1a73e8;">
                                ${actionUrl}
                                </p>
                            </td>
                            </tr>

                            <tr>
                            <td style="padding-top: 20px; color: #999; font-size: 12px;">
                                <p>If you didn’t request this, you can safely ignore this email.</p>
                                <p>— Your Team</p>
                            </td>
                            </tr>

                        </table>
                        </td>
                    </tr>
                    </table>
                </div>
                `,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(`Email sent ${emailType}:`, mailResponse.response);
        return mailResponse;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to send email';
        throw new Error(message);
    }
};
