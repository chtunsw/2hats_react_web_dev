import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import UserPanel from "./components/UserPanel";
import DietTable from "./components/DietTable";
import AddButton from "./components/AddButton";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
  background: azure;
  overflow: hidden;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <UserPanel />
      <DietTable />
      <AddButton />
    </Wrapper>
  );
}

export default App;
