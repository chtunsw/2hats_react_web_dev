import React from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { PassionPurple, DarkPurple } from "../assets/js/variables";
import * as Scroll from "react-scroll";

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
  let scrollToTop = Scroll.animateScroll.scrollToTop;
  // scroll to top and focus search input
  const addButtonOnClick = () => {
    scrollToTop({ duration: 700 });
    document.getElementById("search-input").focus();
  };
  return (
    <Wrapper>
      <Fab
        color="primary"
        className="fab"
        aria-label="add"
        onClick={addButtonOnClick}
      >
        <AddIcon />
      </Fab>
    </Wrapper>
  );
};

export default AddButton;
