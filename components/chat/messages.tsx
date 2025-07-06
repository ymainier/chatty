import React, { useRef } from "react";
import Markdown from "react-markdown";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { UIMessage } from "ai";
import { cn } from "@/lib/utils";

type ChatMessagesProps = {
  messages: UIMessage[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-grow pb-32 pt-12 px-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] px-4 py-2 rounded-2xl",
                message.role === "user"
                  ? "bg-white border border-gray-200 rounded-br-none"
                  : "text-gray-900 prose"
              )}
            >
              <Markdown>{message.content}</Markdown>
            </div>
            {message.role === "assistant" && (
              <div className="flex items-center gap-2 px-4 mt-1 mb-2">
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(message.content);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => {
                    alert("👍 not implemented yet");
                  }}
                >
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => {
                    alert("👎 not implemented yet");
                  }}
                >
                  <ThumbsDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
