import React from "react";
import styled from "styled-components";
import {
  screen,
  OpenSansBold,
  OpenSansNormal,
  PassionPurple,
  DarkPurple
} from "../assets/js/variables";
import { diet } from "../assets/js/mockDiet";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

const { first_name, portrait, height_cm, weight_kg } = diet;

const Wrapper = styled.div`
  width: 100%;
  background: ${PassionPurple};
  .container {
    margin: 0 auto;
    padding: 25px 10px 0;
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
      @media ${screen.small} {
        display: none;
      }
      .arrow-icon {
        font-size: 3rem;
        color: white;
      }
    }
    .user-info {
      display: none;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      @media ${screen.small} {
        display: flex;
      }
      .first-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 60px;
          height: 60px;
        }
        span {
          padding-left: 10px;
          font-family: ${OpenSansBold};
          color: white;
        }
      }
      .second-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .first-avatar {
          margin-right: 10px;
        }
        .avatar {
          width: 60px;
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${DarkPurple};
          span {
            font-size: 1rem;
            font-family: ${OpenSansBold};
          }
          p {
            font-size: 0.8rem;
            font-family: ${OpenSansNormal};
          }
        }
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
        <div className="user-info">
          <div className="first-box">
            <Avatar className="avatar" alt="user potrait" src={portrait} />
            <span>{first_name}</span>
          </div>
          <div className="second-box">
            <Avatar className="avatar first-avatar">
              <span>{weight_kg}</span> <p>kg</p>
            </Avatar>
            <Avatar className="avatar">
              <span>{height_cm}</span> <p>cm</p>
            </Avatar>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
