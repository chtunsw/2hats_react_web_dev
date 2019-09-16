import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  appId,
  appIdValue,
  appKey,
  appKeyValue
} from "../../assets/js/apiAccessToken";
import { AutoListWrapper, DialogWrapper } from "./style";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { Dialog } from "@material-ui/core";
import { Select, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import { connect } from "react-redux";
import { changeDietList } from "../../redux/actions";

const AutoList = props => {
  const {
    isInputActive,
    inputValue,
    inputRef,
    foodList,
    currentDietList,
    changeDietList
  } = props;

  // extract common list and branded list
  const commonList = foodList && foodList.common;
  const brandedList = foodList && foodList.branded;

  // create food detail state
  const [foodDetail, setFoodDetail] = useState();
  useEffect(() => {
    console.log(foodDetail);
  }, [foodDetail]);

  // create dialog switch state
  const [dialogSwitch, setDialogSwitch] = useState(false);

  // handle list item click
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

  // close dialog
  const closeDialog = () => {
    setDialogSwitch(false);
  };

  // create serveQty state
  const [serveQty, setServeQty] = useState(1.0);

  // update servimg qty input value
  const updateServeQty = e => {
    setServeQty(e.target.value);
  };

  // create mealType state
  const [mealType, setMealType] = useState("breakfast");

  // update meal type select input value
  const updateMealType = e => {
    setMealType(e.target.value);
  };

  // add food to diet
  const addFoodToDiet = () => {
    let newTodayList = currentDietList[0].intake_list;
    newTodayList.push({
      food_name: foodDetail.food_name,
      meal_type: mealType,
      nf_calories:
        foodDetail &&
        !isNaN(serveQty) &&
        Number((foodDetail.nf_calories * serveQty).toFixed(2)),
      serving_qty: serveQty && serveQty,
      serving_weight_grams:
        foodDetail &&
        !isNaN(serveQty) &&
        Number((foodDetail.serving_weight_grams * serveQty).toFixed(2)),
      serving_unit: foodDetail.serving_unit,
      thumb: foodDetail && foodDetail.photo.thumb
    });
    let newDietList = [...currentDietList];
    newDietList[0].intake_list = [...newTodayList];
    changeDietList(newDietList);
    setDialogSwitch(false);
  };

  return (
    <>
      {isInputActive && inputValue !== "" && (
        <AutoListWrapper>
          <Paper
            className="paper"
            style={{
              width: inputRef ? inputRef.clientWidth : undefined
            }}
          >
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
          </Paper>
        </AutoListWrapper>
      )}
      <Dialog fullWidth={true} maxWidth="xs" open={dialogSwitch}>
        <DialogWrapper>
          <div className="dialog-title-box" id="customized-dialog-title">
            <IconButton
              onClick={closeDialog}
              className="close-button"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <img src={foodDetail && foodDetail.photo.thumb} alt="food icon" />
            <p>{foodDetail && foodDetail.food_name}</p>
          </div>
          <Divider />
          <div className="dialog-content-box">
            <TextField
              id="filled-name"
              label="Servings"
              helperText={foodDetail && foodDetail.serving_unit}
              margin="normal"
              variant="filled"
              className="serving-input"
              value={serveQty}
              autoComplete="off"
              type="number"
              inputProps={{ min: "0", step: "0.1" }}
              onChange={updateServeQty}
            />
            <div className="unit-box">
              <span>
                {foodDetail &&
                  !isNaN(serveQty) &&
                  (foodDetail.serving_weight_grams * serveQty).toFixed(0)}
              </span>
              <p>grams</p>
            </div>
            <div className="calorie-box">
              <span>
                {foodDetail &&
                  !isNaN(serveQty) &&
                  (foodDetail.nf_calories * serveQty).toFixed(0)}
              </span>
              <p>calories</p>
            </div>
          </div>
          <Divider />
          <div className="dialog-actions-box">
            <p>ADD TO TODAY</p>
            <Select
              className="dialog-select"
              onChange={updateMealType}
              value={mealType}
            >
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="lunch">Lunch</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
            </Select>
            <Button
              onClick={addFoodToDiet}
              className="dialog-button"
              size="large"
            >
              ADD
            </Button>
          </div>
        </DialogWrapper>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  currentDietList: state.diet.dietList
});

export default connect(
  mapStateToProps,
  { changeDietList }
)(AutoList);
