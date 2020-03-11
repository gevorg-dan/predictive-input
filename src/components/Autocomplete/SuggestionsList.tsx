import React from "react";
import styled from "styled-components";

interface SuggestionsListInterface {
  className?: string;
  userInput: string;
  suggestions: string[];
  suggestionsCount?: number;
  setSuggestionInUserInput: (suggestion: string) => void;
}

function SuggestionsList({
  className,
  suggestions,
  suggestionsCount,
  setSuggestionInUserInput
}: SuggestionsListInterface) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {suggestions.map((suggestion, index) => {
        if (suggestionsCount && index > suggestionsCount - 1) {
          return null;
        }
        return (
          <Suggestion
            key={index}
            text={suggestion}
            onClick={() => setSuggestionInUserInput(suggestion)}
          />
        );
      })}
    </ul>
  );
}

interface SuggestionInterface {
  className?: string;
  text: string;
  onClick: () => void;
}

const Suggestion = styled(
  ({ className, text, onClick }: SuggestionInterface) => (
    <li className={className} onClick={onClick}>
      {text}
    </li>
  )
)`
  width: 100%;
  padding: 10px 20px 10px 15.5px;
  color: rgb(33, 33, 33);
  font-size: 1.1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  letter-spacing: 0.00938em;
  line-height: 1.6;
  cursor: pointer;
  :hover {
    background-color: rgb(245, 245, 245);
  }
`;

export default styled(SuggestionsList)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  overflow: auto;
  padding: 7px 0;
`;
