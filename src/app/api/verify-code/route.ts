import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        // for learing purposes
        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({username: decodedUsername});

        if(!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, {status: 500}
            )
        }

        const isCodeValid = user.verifyCode === code;
        const iscodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && iscodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "User Verified Successfully!"
                }, {status: 200}
            )
        } else if(!iscodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired, please sign up again to get a new code"
                }, {status: 400}
            )
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code"
                }, {status: 400}
            )
        }

    } catch (error: any) {
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            }, {status: 500}
        )
    }
}