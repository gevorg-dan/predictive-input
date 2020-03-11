import React, { useState } from "react";
import styled from "styled-components";

import { top100Films } from "./top100Films";

import Autocomplete from "./components/Autocomplete/Index";

function App({ className }: { className?: string }) {
  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className={className}>
      <Autocomplete
        suggestions={top100Films}
        suggestionsCount={10}
        selectedValues={selectedFilm}
        setSelectedValues={setSelectedFilm}
        placeholder="Find film"
        wait={400}
      />
    </div>
  );
}

export default styled(App)`
  display: flex;
  justify-content: center;
  padding: 50px 0;
`;
