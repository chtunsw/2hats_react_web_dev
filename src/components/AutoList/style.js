import styled from "styled-components";
import {
  OpenSansBold,
  OpenSansNormal,
  PassionPurple,
  LightGrey,
  DarkGrey,
  NormalBlack
} from "../../assets/js/variables";

export const AutoListWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 70px;
  .paper {
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
  }
`;

export const DialogWrapper = styled.div`
  position: relative;
  padding: 15px;
  .dialog-title-box {
    padding-bottom: 15px;
    .close-button {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 15px;
    }
    img {
      width: 80px;
      height: 80px;
    }
    p {
      display: block;
      font-family: ${OpenSansNormal};
      font-size: 2rem;
      color: ${NormalBlack};
    }
  }
  .dialog-content-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px 0;
    .serving-input {
      width: 50%;
      margin: 0;
    }
    .unit-box {
      height: 56px;
      span {
        font-family: ${OpenSansNormal};
        font-size: 2rem;
        color: ${NormalBlack};
      }
      p {
        font-family: ${OpenSansNormal};
        font-size: 1rem;
        color: ${DarkGrey};
      }
    }
    .calorie-box {
      height: 56px;
      span {
        font-family: ${OpenSansNormal};
        font-size: 2rem;
        color: ${NormalBlack};
      }
      p {
        font-family: ${OpenSansNormal};
        font-size: 1rem;
        color: ${DarkGrey};
      }
    }
  }
  .dialog-actions-box {
    p {
      padding: 15px 0;
      font-family: ${OpenSansNormal};
      font-size: 1rem;
      color: ${DarkGrey};
    }
    .dialog-select {
      width: 100%;
      display: block;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: rgba(0, 0, 0, 0.09);
      .MuiSelect-selectMenu {
        padding: 15px 0 15px 12px;
      }
    }
    .dialog-button {
      display: block;
      float: right;
      margin-top: 15px;
      color: ${LightGrey};
      background-color: ${PassionPurple};
    }
  }
`;
