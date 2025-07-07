export function ChatAssistantButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
