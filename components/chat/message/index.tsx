import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import Markdown from "react-markdown";
import { ChatAssistantButton } from "@/components/chat/message/assistant-button";

export function ChatMessage({
  message: { id, role, content },
}: {
  message: UIMessage;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        role === "user" ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-2xl",
          role === "user"
            ? "bg-white border border-gray-200 rounded-br-none"
            : "text-gray-900 prose"
        )}
      >
        <Markdown>{content}</Markdown>
      </div>
      {role === "assistant" && (
        <div className="flex items-center gap-2 px-4 mt-1 mb-2">
          <ChatAssistantButton tooltip="Copy to clipboard"
            onClick={() => navigator.clipboard.writeText(content)}
          >
            <Copy className="h-4 w-4" />
          </ChatAssistantButton>
          <ChatAssistantButton tooltip="Good response" onClick={() => alert(`👍 ${id}`)}>
            <ThumbsUp className="h-4 w-4" />
          </ChatAssistantButton>
          <ChatAssistantButton tooltip="Bad response" onClick={() => alert(`👎 ${id}`)}>
            <ThumbsDown className="h-4 w-4" />
          </ChatAssistantButton>
        </div>
      )}
    </div>
  );
}
