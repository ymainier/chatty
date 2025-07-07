import React, { useRef } from "react";
import Markdown from "react-markdown";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./message";

type ChatMessagesProps = {
  messages: UIMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-grow pb-32 pt-12 px-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
