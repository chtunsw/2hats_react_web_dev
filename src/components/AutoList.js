import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  screen,
  OpenSansBold,
  OpenSansNormal,
  PassionPurple,
  DarkPurple,
  DarkGrey,
  NormalBlack
} from "../assets/js/variables";
import {
  appId,
  appIdValue,
  appKey,
  appKeyValue
} from "../assets/js/apiAccessToken";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import { Divider } from "@material-ui/core";

const Wrapper = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  .divider-tag {
    padding-top: 16px;
    padding-left: 16px;
    padding-bottom: 6px;
    font-size: 1rem;
    font-family: ${OpenSansBold};
    color: ${DarkGrey};
  }
  .menu-item {
    padding: 10px 16px;
    .image-container {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .common-title-container {
      max-width: 50%;
      overflow: hidden;
      padding-left: 16px;
      .first-title {
        font-family: ${OpenSansNormal};
        font-size: 1.1rem;
        line-height: 1.5;
        color: ${NormalBlack};
      }
    }
    .branded-title-container {
      max-width: 50%;
      overflow: hidden;
      padding-left: 16px;
      height: 100%;
      .first-title {
        font-family: ${OpenSansNormal};
        font-size: 1.1rem;
        line-height: 1.5;
        color: ${NormalBlack};
      }
      .second-title {
        font-family: ${OpenSansNormal};
        font-size: 1.1rem;
        line-height: 1.5;
        color: ${DarkGrey};
      }
    }
  }
`;

const AutoList = props => {
  const { isInputActive, inputValue, inputRef, foodList } = props;
  const commonList = foodList && foodList.common;
  const brandedList = foodList && foodList.branded;

  // create food detail state
  const [foodDetail, setFoodDetail] = useState();

  // create dialog open state
  const [dialogSwitch, setDialogSwitch] = useState(false);

  const handleItemClick = async foodName => {
    try {
      const promise = await axios({
        method: "post",
        url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        headers: {
          [appId]: appIdValue,
          [appKey]: appKeyValue
        },
        data: {
          query: foodName
        }
      });
      const foodResult = promise.data.foods[0];
      setFoodDetail(foodResult);
      setDialogSwitch(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Popper
      open={isInputActive && inputValue !== ""}
      autoFocus={false}
      variant="menu"
      anchorEl={inputRef}
    >
      <Paper
        style={{
          marginTop: 8,
          width: inputRef ? inputRef.clientWidth : undefined
        }}
      >
        <Wrapper>
          {commonList && commonList.length !== 0 && (
            <>
              <div className="divider-tag">COMMON</div>
              {commonList.map((food, index) => (
                <div key={food.food_name + index}>
                  <MenuItem
                    className="menu-item"
                    onClick={() => handleItemClick(food.food_name)}
                  >
                    <div className="image-container">
                      <img src={food.photo.thumb} alt="food-icon" />
                    </div>
                    <div className="common-title-container">
                      <Typography noWrap={true} className="first-title">
                        {food.food_name}
                      </Typography>
                    </div>
                  </MenuItem>
                  <Divider></Divider>
                </div>
              ))}
            </>
          )}
          {brandedList && brandedList.length !== 0 && (
            <>
              <div className="divider-tag">BRANDED</div>
              {brandedList.map((food, index) => (
                <div key={food.food_name + index}>
                  <MenuItem
                    className="menu-item"
                    onClick={() => handleItemClick(food.food_name)}
                  >
                    <div className="image-container">
                      <img src={food.photo.thumb} alt="food-icon" />
                    </div>
                    <div className="branded-title-container">
                      <Typography noWrap={true} className="first-title">
                        {food.food_name}
                      </Typography>
                      <Typography noWrap={true} className="second-title">
                        {food.brand_name}
                      </Typography>
                    </div>
                  </MenuItem>
                  <Divider></Divider>
                </div>
              ))}
            </>
          )}
        </Wrapper>
      </Paper>
    </Popper>
  );
};

export default AutoList;
