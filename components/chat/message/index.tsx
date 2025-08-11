import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import Markdown from "react-markdown";
import { AssistantActions } from "@/components/chat/message/assistant-actions";

export function Message({
  message: { id, role, parts },
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
        {parts.map((part, index) =>
          part.type === "text" ? (
            <Markdown key={index}>{part.text}</Markdown>
          ) : null
        )}
      </div>
      {role === "assistant" && (
        <AssistantActions
          id={id}
          content={parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("\n\n")}
        />
      )}
    </div>
  );
}
