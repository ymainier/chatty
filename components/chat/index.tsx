"use client";

import type React from "react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessages } from "@/components/chat/messages";
import { Input } from "@/components/chat/input";
import { Header } from "@/components/chat/header";
import { DefaultChatTransport } from "ai";

export function Chat() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  return (
    <div className="bg-gray-50 flex flex-col overflow-hidden h-screen p-4 max-w-4xl mx-auto">
      <Header />

      <div className="flex-1 overflow-auto">
        <ChatMessages messages={messages} />
      </div>

      <Input
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          } else if (status) {
            stop();
          }
        }}
        status={status}
      />
    </div>
  );
}
