import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import styled from "styled-components";

import TextField from "../../primitives/TextField";

import SuggestionsList from "./SuggestionsList";

import { useBoolean } from "../../ownHooks/useBoolean";

const filterSuggestions = (userInput: string, suggestions: string[]) => {
  if (userInput === "") {
    return suggestions;
  }

  return suggestions.filter(suggestion => {
    const suggestionWithoutSpace = suggestion.split(" ").join("");
    const userInputWithoutSpace = userInput.split(" ").join("");
    return suggestionWithoutSpace
      .toLowerCase()
      .includes(userInputWithoutSpace.trim().toLowerCase());
  });
};

interface AutocompleteInterface {
  className?: string;
  suggestions: string[];
  suggestionsCount?: number;
  selectedValues: string;
  placeholder?: string;
  wait?: number;
  setSelectedValues: (value: string) => void;
}

function Autocomplete({
  className,
  suggestions,
  suggestionsCount,
  selectedValues,
  placeholder,
                        wait,
  setSelectedValues
}: AutocompleteInterface) {
  const [isListOpen, openList, closeList] = useBoolean(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [userInput, setUserInput] = useState("");
  const elementWasSelected = useRef(false);
  const setFilteredSuggestionsWithDebounce = useRef(
    debounce(
      (userInput: string, suggestions: string[]) =>
        setFilteredSuggestions(filterSuggestions(userInput, suggestions)),
      wait
    )
  );

  const inputOnBlur = () => {
    setTimeout(() => {
      if (elementWasSelected.current || filteredSuggestions.length === 0)
        return;
      if (userInput === "") {
        setSelectedValues(null);
        closeList();
        return;
      }
      setUserInput(filteredSuggestions[0]);
      setSelectedValues(filteredSuggestions[0]);
      closeList();
    }, 100);
  };

  useEffect(() => {
    if (selectedValues) {
      setUserInput(selectedValues);
    }
  }, [selectedValues]);

  return (
    <div className={className}>
      <TextField
        value={userInput}
        placeholder={placeholder}
        onChange={value => {
          setUserInput(value);
          setFilteredSuggestionsWithDebounce.current(value, suggestions);
        }}
        onFocus={() => {
          elementWasSelected.current = false;
          openList();
        }}
        onBlur={inputOnBlur}
      />
      {isListOpen && (
        <SuggestionsList
          userInput={userInput}
          suggestions={filteredSuggestions}
          suggestionsCount={suggestionsCount}
          setSuggestionInUserInput={value => {
            elementWasSelected.current = true;
            setUserInput(value);
            setSelectedValues(value);
            closeList();
          }}
        />
      )}
    </div>
  );
}

Autocomplete.defaultPropety = {
  wait: 500
};

export default styled(Autocomplete)`
  display: flex;
  flex-direction: column;
  width: 350px;
`;
