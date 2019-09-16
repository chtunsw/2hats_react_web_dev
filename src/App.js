import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import UserPanel from "./components/UserPanel";
import DietTable from "./components/DietTable";
import AddButton from "./components/AddButton";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  overflow-y: scroll;
  .container {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <UserPanel />
        <DietTable />
      </div>
      <AddButton />
    </Wrapper>
  );
}

export default App;
