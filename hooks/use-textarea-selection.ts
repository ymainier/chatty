import { RefObject, useRef } from "react";

export function useTextareaSelection(textareaRef: RefObject<HTMLTextAreaElement>) {
  const selectionStateRef = useRef<{ start: number | null; end: number | null }>({ start: null, end: null });

  const saveSelectionState = () => {
    if (textareaRef.current) {
      selectionStateRef.current = {
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      };
    }
  };

  const restoreSelectionState = () => {
    const textarea = textareaRef.current;
    const { start, end } = selectionStateRef.current;
    if (textarea && start !== null && end !== null) {
      textarea.focus();
      textarea.setSelectionRange(start, end);
    } else if (textarea) {
      textarea.focus();
    }
  };

  return { saveSelectionState, restoreSelectionState };
}
