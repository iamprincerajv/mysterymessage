import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "You must be logged in to do that."
            
            }, {status: 401}
        );
    }

    const userId = user._id;

    const {acceptMessage} = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessage},
            {new: true}
        );

        if(!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update accept message"
            }, {status: 401})
        }

        return Response.json({
            success: true,
            message: "Accept Message Status Updated Successfully",
            updatedUser
        }, {status: 200});

    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update accept message"
        }, {status: 500})
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "You must be logged in to do that."
            
            }, {status: 401}
        );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);
    
        if(!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
                }, {status: 404});
        }
    
        return Response.json({
            success: true,
            isAcceptingMessage: foundUser.isAcceptingMessage
            }, {status: 200}
        );
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while getting message acceptance status"
            }, {status: 500}
        );
    }
}