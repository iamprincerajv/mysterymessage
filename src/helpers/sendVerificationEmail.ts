import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        
        await resend.emails.send({
            from: "hello@devprince.in",
            to: email,
            subject: "Verify Your Email",
            react: VerificationEmail({username, otp: verifyCode})
        });

        return {
            success: true,
            message: "Verification Email Sent !"
        };

    } catch (emailError) {
        console.log("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}