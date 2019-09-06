import React from "react";
import styled from "styled-components";
import {
  screen,
  OpenSansBold,
  OpenSansNormal,
  LightPurple,
  PassionPurple,
  DarkPurple,
  LightGrey,
  DarkGrey,
  NormalBlack
} from "../assets/js/variables";
import { diet } from "../assets/js/mockDiet";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

const {
  first_name,
  last_name,
  portrait,
  height_cm,
  weight_kg,
  daily_goal
} = diet;

const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
  background: ${LightGrey};
  .date-selector {
    display: none;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    font-family: ${OpenSansBold};
    color: ${NormalBlack};
    @media ${screen.small} {
      display: flex;
    }
    .arrow-icon {
      font-size: 3rem;
      color: ${PassionPurple};
    }
  }
  .avatar-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0 10px;
    @media ${screen.small} {
      display: none;
    }
    .avatar-middle {
      width: 90px;
      height: 90px;
    }
    .avatar-side {
      width: 60px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${DarkGrey};
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
  .user-name {
    padding-bottom: 30px;
    text-align: center;
    font-family: ${OpenSansBold};
    font-size: 1.1rem;
    color: ${NormalBlack};
    @media ${screen.small} {
      display: none;
    }
  }
  .calorie-container {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .first-box {
      span {
        font-family: ${OpenSansNormal};
        font-size: 1.1rem;
        line-height: 1.5;
        color: ${NormalBlack};
      }
      p {
        font-family: ${OpenSansNormal};
        font-size: 0.8rem;
        color: ${DarkGrey};
      }
    }
    .second-box {
      text-align: right;
      span {
        font-family: ${OpenSansNormal};
        font-size: 1.1rem;
        line-height: 1.5;
        color: ${NormalBlack};
      }
      p {
        font-family: ${OpenSansNormal};
        font-size: 0.8rem;
        color: ${DarkGrey};
      }
    }
  }
  .progress-bar {
    background-color: ${LightPurple};
    .MuiLinearProgress-barColorPrimary {
      background-color: ${PassionPurple};
    }
  }
  .progress-percentage {
    padding: 5px 0 20px;
    text-align: center;
    font-family: ${OpenSansNormal};
    font-size: 0.8rem;
    color: ${NormalBlack};
  }
  .meal-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .text-box {
      text-align: center;
      span {
        font-family: ${OpenSansNormal};
        font-size: 1rem;
        line-height: 1.5;
        color: ${NormalBlack};
      }
      p {
        font-family: ${OpenSansNormal};
        font-size: 0.8rem;
        color: ${DarkGrey};
      }
    }
  }
`;

const UserPanel = () => {
  return (
    <Wrapper>
      <div className="date-selector">
        <IconButton className="arrow-icon">
          <ArrowLeft fontSize="inherit" />
        </IconButton>
        {"Today"}
        <IconButton className="arrow-icon">
          <ArrowRight fontSize="inherit" />
        </IconButton>
      </div>
      <div className="avatar-container">
        <Avatar className="avatar-side">
          <span>{weight_kg}</span>
          <p>kg</p>
        </Avatar>
        <Avatar className="avatar-middle" alt="user potrait" src={portrait} />
        <Avatar className="avatar-side">
          <span>{height_cm}</span>
          <p>cm</p>
        </Avatar>
      </div>
      <div className="user-name">
        {first_name} {last_name}
      </div>
      <Divider orientation="horizontal" />
      <div className="calorie-container">
        <div className="first-box">
          <span>{"1500"} cal</span>
          <p>consumed</p>
        </div>
        <div className="second-box">
          <span>{daily_goal} cal</span>
          <p>daily goal</p>
        </div>
      </div>
      <LinearProgress
        className="progress-bar"
        value={80}
        variant="determinate"
      />
      <div className="progress-percentage">{80} %</div>
      <div className="meal-container">
        <div className="text-box">
          <span>{"100"}</span>
          <p>Breakfast</p>
        </div>
        <div className="text-box">
          <span>{"100"}</span>
          <p>Lunch</p>
        </div>
        <div className="text-box">
          <span>{"100"}</span>
          <p>Dinner</p>
        </div>
        <div className="text-box">
          <span>{"100"}</span>
          <p>Snack</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserPanel;
