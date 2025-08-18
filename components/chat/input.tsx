import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "../ai-elements/suggestion";

const suggestions = [
  "Can you explain how to play tennis?",
  "What information would you need to provide a weekly exercise plan?",
  "How do I make a really good fish taco?",
];

type ChatInputProps = {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  status: "submitted" | "streaming" | "ready" | "error";
};

export function Input({
  input,
  onInputChange,
  onSubmit,
  status,
}: ChatInputProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Suggestions>
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion}
            onClick={() => {
              onInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLTextAreaElement>);
            }}
            suggestion={suggestion}
          />
        ))}
      </Suggestions>
      <PromptInput onSubmit={onSubmit}>
        <PromptInputTextarea onChange={onInputChange} value={input} />
        <PromptInputToolbar>
          <PromptInputTools />
          <PromptInputSubmit status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
