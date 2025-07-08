import { Button } from "@/components/chat/message/action/button";
import { Check, Copy as CopyIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Button
      tooltip={isCopied ? "Copied!" : "Copy to clipboard"}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setIsCopied(false), 5000);
      }}
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-green-800" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
