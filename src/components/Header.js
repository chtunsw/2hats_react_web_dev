import React from "react";
import styled from "styled-components";
import { OpenSansBold, PassionPurple } from "../assets/js/variables";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

const Wrapper = styled.div`
  background: ${PassionPurple};
  .container {
    margin: 0 auto;
    padding: 25px 0 0;
    width: 50%;
    .search-input {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .search-icon {
        font-size: 2rem;
        padding: 5px;
      }
    }
    .date-selector {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;
      font-family: ${OpenSansBold};
      color: white;
      .arrow-icon {
        font-size: 3rem;
        color: white;
      }
    }
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <div className="container">
        <Paper className="search-input">
          <SearchIcon className="search-icon" />
          <InputBase
            fullWidth={true}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <div className="date-selector">
          <IconButton className="arrow-icon">
            <ArrowLeft fontSize="inherit" />
          </IconButton>
          {"Today"}
          <IconButton className="arrow-icon">
            <ArrowRight fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
