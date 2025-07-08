import { Button } from "@/components/chat/message/action/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Copy } from "@/components/chat/message/action/copy";
import { GoodBad } from "@/components/chat/message/action/good-bad";

export function AssistantActions({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 mt-1 mb-2">
      <Copy content={content} />
      <GoodBad id={id} />
    </div>
  );
}
