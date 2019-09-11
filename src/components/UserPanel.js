import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  screen,
  OpenSansBold,
  OpenSansNormal,
  LightPurple,
  PassionPurple,
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

import { connect } from "react-redux";
import { changeDateIndex } from "../redux/actions";

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
  padding: 15px;
  background: ${LightGrey};
  @media ${screen.small} {
    width: 100%;
  }
  .date-selector {
    display: none;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-family: ${OpenSansBold};
    color: ${NormalBlack};
    @media ${screen.small} {
      display: flex;
    }
    .arrow-icon {
      font-size: 2rem;
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
    .second-box {
      text-align: right;
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

const UserPanel = props => {
  const { changeDateIndex, currentDateIndex, currentDietList } = props;

  // get date string from dateIndex
  const getDateFromIndex = index => {
    let date = undefined;
    switch (index) {
      case 0:
        date = "Today";
        break;
      case 1:
        date = "Yesterday";
        break;
      case 2:
        const dateStringArray = new Date().toDateString().split(" ");
        date = dateStringArray[2] + " " + dateStringArray[1];
        break;
      default:
    }
    return date;
  };

  // update dateIndex in redux store
  const updateDateIndex = action => {
    const newDateIndex = currentDateIndex + action;
    if (newDateIndex > 2) {
      changeDateIndex(0);
    } else if (newDateIndex < 0) {
      changeDateIndex(2);
    } else {
      changeDateIndex(newDateIndex);
    }
  };

  // define calorie object
  const [calorieObj, setCalorieObj] = useState({
    consumed: 0,
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0
  });

  // init and update calorie object
  useEffect(() => {
    const mealList = currentDietList[currentDateIndex].intake_list;
    let newCalorieObj = {
      consumed: 0,
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0
    };
    mealList.length !== 0 &&
      mealList.map(meal => {
        newCalorieObj.consumed += meal.nf_calories;
        if (meal.meal_type === "breakfast") {
          newCalorieObj.breakfast += meal.nf_calories;
        } else if (meal.meal_type === "lunch") {
          newCalorieObj.lunch += meal.nf_calories;
        } else if (meal.meal_type === "dinner") {
          newCalorieObj.dinner += meal.nf_calories;
        } else if (meal.meal_type === "snack") {
          newCalorieObj.snack += meal.nf_calories;
        }
        return null;
      });
    setCalorieObj(newCalorieObj);
  }, [currentDateIndex, currentDietList]);

  return (
    <Wrapper>
      <div className="date-selector">
        <IconButton className="arrow-icon" onClick={() => updateDateIndex(+1)}>
          <ArrowLeft fontSize="inherit" />
        </IconButton>
        {getDateFromIndex(currentDateIndex)}
        <IconButton className="arrow-icon" onClick={() => updateDateIndex(-1)}>
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
          <span>{calorieObj.consumed} cal</span>
          <p>consumed</p>
        </div>
        <div className="second-box">
          <span>{daily_goal} cal</span>
          <p>daily goal</p>
        </div>
      </div>
      <LinearProgress
        className="progress-bar"
        value={(calorieObj.consumed / daily_goal) * 100}
        variant="determinate"
      />
      <div className="progress-percentage">
        {((calorieObj.consumed / daily_goal) * 100).toFixed(1)} %
      </div>
      <div className="meal-container">
        <div className="text-box">
          <span>{calorieObj.breakfast}</span>
          <p>Breakfast</p>
        </div>
        <div className="text-box">
          <span>{calorieObj.lunch}</span>
          <p>Lunch</p>
        </div>
        <div className="text-box">
          <span>{calorieObj.dinner}</span>
          <p>Dinner</p>
        </div>
        <div className="text-box">
          <span>{calorieObj.snack}</span>
          <p>Snack</p>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  currentDateIndex: state.date.dateIndex,
  currentDietList: state.diet.dietList
});

export default connect(
  mapStateToProps,
  { changeDateIndex }
)(UserPanel);
