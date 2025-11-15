import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage, tool, stepCountIs } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const weather = tool({
  description: "Get the weather in a location",
  inputSchema: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  // location below is inferred to be a string:
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});

export async function POST(req: Request) {
  const { messages, mode }: { messages: UIMessage[], mode: string } = await req.json();

  const isPirate = mode === "pirate";

  const result = streamText({
    model: openai("gpt-4o"),
    system: isPirate ? "You are a helpful assistant named Chatty, you always speak as a pirate. answer using markdown unless asked otherwise." :
      "You are a helpful assistant named Chatty. answer using markdown unless asked otherwise.",
    messages: convertToModelMessages(messages),
    tools: { weather },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
