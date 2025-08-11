"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessages } from "@/components/chat/messages";
import { Input } from "@/components/chat/input";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";
import { Header } from "@/components/chat/header";
import { DefaultChatTransport } from "ai";

export function Chat() {
  const mainContainerRef = useRef<HTMLDivElement>(null!);

  const { isMobile, viewportHeight } = useMobileViewport(mainContainerRef);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  return (
    <div
      ref={mainContainerRef}
      className="bg-gray-50 flex flex-col overflow-hidden"
      style={{ height: isMobile ? `${viewportHeight}px` : "100svh" }}
    >
      <Header />

      <ChatMessages messages={messages} />

      <Input
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
        isMobile={isMobile}
        status={status}
        stop={stop}
      />
    </div>
  );
}
