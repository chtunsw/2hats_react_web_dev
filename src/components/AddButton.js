import React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { PassionPurple, DarkPurple } from "../assets/js/variables";

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  .fab {
    background-color: ${PassionPurple};
    :hover {
      background-color: ${DarkPurple};
    }
  }
`;

const AddButton = () => {
  return (
    <Wrapper>
      <Fab color="primary" className="fab" aria-label="add">
        <AddIcon />
      </Fab>
    </Wrapper>
  );
};

export default AddButton;
