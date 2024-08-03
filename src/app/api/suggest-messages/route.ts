import { google } from "@ai-sdk/google";
import { streamText } from "ai";

let mLimit = 0;
let dLimit = 0;

export async function POST(req: Request) {
  try {
    // const { messages } = await req.json();
    mLimit++;
    dLimit++;

    console.log(mLimit)
    console.log(dLimit)

    if (mLimit <= 12 || dLimit <= 1450) {
      const prompt =
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questons are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||if you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensures the questions are intriguing, foster curiosity, and contribute to a positive and welcoming coversational environment.";

      const result = await streamText({
        model: google("models/gemini-1.5-flash-latest"),
        prompt: prompt,
      });

      return result.toDataStreamResponse();
    }

    if(mLimit > 12) {
      setTimeout(() => {
        mLimit = 0;
      }, 60000)
    }

    if(dLimit > 1450) {
      setTimeout(() => {
        dLimit = 0;
      }, 1440000);
    }

    return Response.json({
      success: false,
      message: "This feature isn't available at the moment. Try again later",
    }, {status: 403});
  } catch (error) {
    console.error("An error occured in suggest-messages");
    // throw error;
    return Response.json({
      success: false,
      message: "This feature isn't available at the moment. Try again later",
    }, {status: 403});
  }
}
