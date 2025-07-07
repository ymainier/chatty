"use client";

import type React from "react";
import { useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessages } from "@/components/chat/messages";
import { ChatInput } from "@/components/chat/input";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";
import { ChatHeader } from "@/components/chat/header";

export function Chat() {
  const mainContainerRef = useRef<HTMLDivElement>(null!);

  const { isMobile, viewportHeight } = useMobileViewport(mainContainerRef);

  const { messages, input, handleInputChange, handleSubmit, status, stop } = useChat();

  return (
    <div
      ref={mainContainerRef}
      className="bg-gray-50 flex flex-col overflow-hidden"
      style={{ height: isMobile ? `${viewportHeight}px` : "100svh" }}
    >
      <ChatHeader />

      <ChatMessages messages={messages} />

      <ChatInput
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isMobile={isMobile}
        status={status}
        stop={stop}
      />
    </div>
  );
}
