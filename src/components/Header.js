import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  screen,
  OpenSansBold,
  OpenSansNormal,
  PassionPurple,
  DarkPurple,
  DarkGrey
} from "../assets/js/variables";
import {
  appId,
  appIdValue,
  appKey,
  appKeyValue
} from "../assets/js/apiAccessToken";
import { diet } from "../assets/js/mockDiet";
import axios from "axios";
import AutoList from "./AutoList";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { connect } from "react-redux";
import { changeDateIndex } from "../redux/actions";

const { first_name, portrait, height_cm, weight_kg } = diet;

const Wrapper = styled.div`
  width: 100%;
  background: ${PassionPurple};
  .container {
    margin: 0 auto;
    padding: 25px 15px 0;
    width: 50%;
    @media ${screen.small} {
      width: auto;
      margin: 0;
    }
    .search-input-paper {
      position: relative;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .search-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        padding: 5px;
        color: ${DarkGrey};
      }
      .search-input {
        input {
          padding-left: 40px;
        }
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
          padding-left: 20px;
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

const Header = props => {
  const { changeDateIndex, currentDateIndex } = props;

  // store and update search input value
  const [inputValue, setInputValue] = useState("");
  const [inputRef, setInputRef] = useState();
  const [isInputActive, setIsInputActive] = useState(false);

  // update input value
  const updateInputValue = e => {
    setInputValue(e.target.value);
  };

  // create reference for input
  const createInputRef = input => {
    input && setInputRef(input);
  };

  // call food api for food list when inputValue changes
  const [foodList, setFoodList] = useState();
  useEffect(() => {
    inputValue !== "" &&
      (async () => {
        try {
          const promise = await axios({
            method: "get",
            url: `https://trackapi.nutritionix.com/v2/search/instant?query=${inputValue}`,
            headers: {
              [appId]: appIdValue,
              [appKey]: appKeyValue
            }
          });
          setFoodList(promise.data);
        } catch (e) {
          console.log(e);
        }
      })();
  }, [inputValue]);

  // track window active element id
  useEffect(() => {
    const clickEventRef = window.addEventListener("click", e => {
      if (document.activeElement.id === "search-input") {
        setIsInputActive(true);
      } else {
        setIsInputActive(false);
      }
    });
    return () => window.removeEventListener("click", clickEventRef);
  }, []);

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

  return (
    <Wrapper>
      <div className="container">
        <Paper className="search-input-paper">
          <SearchIcon className="search-icon" />
          <InputBase
            id="search-input"
            className="search-input"
            inputRef={createInputRef}
            fullWidth={true}
            value={inputValue}
            onChange={updateInputValue}
            placeholder="Search foods..."
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <AutoList
          isInputActive={isInputActive}
          inputValue={inputValue}
          inputRef={inputRef}
          foodList={foodList}
        />
        <div className="date-selector">
          <IconButton
            className="arrow-icon"
            onClick={() => updateDateIndex(+1)}
          >
            <ArrowLeft fontSize="inherit" />
          </IconButton>
          {getDateFromIndex(currentDateIndex)}
          <IconButton
            className="arrow-icon"
            onClick={() => updateDateIndex(-1)}
          >
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

const mapStateToProps = state => ({ currentDateIndex: state.date.dateIndex });

export default connect(
  mapStateToProps,
  { changeDateIndex }
)(Header);
