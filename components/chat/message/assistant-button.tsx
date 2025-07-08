import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatAssistantButton({
  tooltip,
  onClick,
  children,
}: {
  tooltip: string;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          onClick={onClick}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent className="relative bg-gray-900 text-white rounded px-3 py-2 shadow-lg">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
