import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Lightbulb, ArrowUp, CircleStop } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTextareaSelection } from "@/hooks/use-textarea-selection";

type ActiveButton = "none" | "add" | "deepSearch" | "think";

type ChatInputProps = {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  isMobile: boolean;
  status: "submitted" | "streaming" | "ready" | "error";
  stop: () => void;
};

export function Input({
  input,
  onInputChange,
  onSubmit,
  isMobile,
  status,
  stop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  const inputContainerRef = useRef<HTMLDivElement>(null!);
  const [activeButton, setActiveButton] = useState<ActiveButton>("none");
  const { saveSelectionState, restoreSelectionState } =
    useTextareaSelection(textareaRef);
  const canStop = status === "streaming" || status === "submitted";

  // Focus the textarea on component mount (only on desktop)
  useEffect(() => {
    if (textareaRef.current && !isMobile) {
      textareaRef.current.focus();
    }
  }, [isMobile]);

  const handleInputContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target === e.currentTarget ||
      (e.currentTarget === inputContainerRef.current &&
        !(e.target as HTMLElement).closest("button"))
    ) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      onSubmit(e);
      return;
    }
    if (!isMobile && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const handleToggleButton = (button: ActiveButton) => {
    saveSelectionState();
    setActiveButton((prev) => (prev === button ? "none" : button));
    setTimeout(() => {
      restoreSelectionState();
    }, 0);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
        <div
          ref={inputContainerRef}
          className={cn(
            "relative w-full rounded-3xl border border-gray-200 bg-white p-3 cursor-text"
          )}
          onClick={handleInputContainerClick}
        >
          <div className="pb-9">
            <Textarea
              ref={textareaRef}
              placeholder="Ask Anything"
              className="min-h-10 max-h-[156px] w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 placeholder:text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-2 pr-4 pt-0 pb-0 resize-none overflow-y-auto leading-tight shadow-none focus:outline-none focus:ring-0"
              value={input}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (textareaRef.current) {
                  textareaRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full h-8 w-8 flex-shrink-0 border-gray-200 p-0 transition-colors",
                    activeButton === "add" && "bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleToggleButton("add")}
                >
                  <Plus
                    className={cn(
                      "h-4 w-4 text-gray-500",
                      activeButton === "add" && "text-gray-700"
                    )}
                  />
                  <span className="sr-only">Add</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "rounded-full h-8 px-3 flex items-center border-gray-200 gap-1.5 transition-colors",
                    activeButton === "deepSearch" &&
                      "bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleToggleButton("deepSearch")}
                >
                  <Search
                    className={cn(
                      "h-4 w-4 text-gray-500",
                      activeButton === "deepSearch" && "text-gray-700"
                    )}
                  />
                  <span
                    className={cn(
                      "text-gray-900 text-sm",
                      activeButton === "deepSearch" && "font-medium"
                    )}
                  >
                    DeepSearch
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "rounded-full h-8 px-3 flex items-center border-gray-200 gap-1.5 transition-colors",
                    activeButton === "think" && "bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleToggleButton("think")}
                >
                  <Lightbulb
                    className={cn(
                      "h-4 w-4 text-gray-500",
                      activeButton === "think" && "text-gray-700"
                    )}
                  />
                  <span
                    className={cn(
                      "text-gray-900 text-sm",
                      activeButton === "think" && "font-medium"
                    )}
                  >
                    Think
                  </span>
                </Button>
              </div>
              {canStop ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8 border-0 bg-black scale-110 transition-all duration-200 cursor-pointer"
                  onClick={stop}
                >
                  <CircleStop className="h-4 w-4 text-white" />
                  <span className="sr-only">Stop</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full h-8 w-8 border-0 flex-shrink-0 transition-all duration-200 cursor-pointer",
                    input.trim() ? "bg-black scale-110" : "bg-gray-200"
                  )}
                  disabled={!input.trim()}
                >
                  <ArrowUp
                    className={cn(
                      "h-4 w-4 transition-colors",
                      input.trim() ? "text-white" : "text-gray-500"
                    )}
                  />
                  <span className="sr-only">Submit</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
