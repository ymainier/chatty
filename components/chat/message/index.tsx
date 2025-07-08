import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import Markdown from "react-markdown";
import { AssistantActions } from "@/components/chat/message/assistant-actions";

export function Message({
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
        <AssistantActions id={id} content={content} />
      )}
    </div>
  );
}
