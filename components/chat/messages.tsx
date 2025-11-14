import React, { useRef } from "react";
import { UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "../ai-elements/tool";

type ChatMessagesProps = {
  messages: UIMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  // What information would you need to provide a weekly exercise plan?
  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {message.parts.map((part, i) => {
                  console.log(part.type, part.output);
                  switch (part.type) {
                    case "text": // we don't use any reasoning or tool calls in this example
                      return (
                        <Response key={`${message.id}-${i}`}>
                          {part.text}
                        </Response>
                      );
                    case "tool-weather":
                      return (
                        <Tool key={`weather-${message.id}-${i}`}>
                          <ToolHeader
                            type="tool-fetch_weather_data"
                            state={part.state}
                          />
                          <ToolContent>
                            <ToolInput input={part.input} />
                            <ToolOutput
                              output={<Response>{JSON.stringify(part.output)}</Response>}
                              errorText={part.errorText}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}
