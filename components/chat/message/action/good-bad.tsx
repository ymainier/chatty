import { Button } from "@/components/chat/message/action/button";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export function GoodBad({ id }: { id: string }) {
  const [selection, setSelection] = useState<null | "good" | "bad">(null);
  return (
    <>
      {selection !== "bad" && (
        <Button
          tooltip={
            selection === "good" ? "Marked Good" : "Good response"
          }
          onClick={() => {
            setSelection("good");
            alert(`👍 ${id}`);
          }}
        >
          <ThumbsUp
            className={cn("h-4 w-4", selection === "good" && "text-gray-800")}
          />
        </Button>
      )}
      {selection !== "good" && (
        <Button
          tooltip={selection === "bad" ? "Marked bad" : "Bad response"}
          onClick={() => {
            setSelection("bad");
            alert(`👎 ${id}`);
          }}
        >
          <ThumbsDown
            className={cn("h-4 w-4", selection === "bad" && "text-gray-800")}
          />
        </Button>
      )}
    </>
  );
}
