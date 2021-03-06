import React from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { OpenSansNormal, DarkGrey, NormalBlack } from "../assets/js/variables";

import { connect } from "react-redux";

const Wrapper = styled.div`
  flex: 1;
  min-height: 440px;
  padding: 20px 0;
  background-color: white;
  .food-icon {
    width: 40px;
    height: 40px;
  }
  .cell-top {
    font-family: ${OpenSansNormal};
    font-size: 1.1rem;
    line-height: 1.5;
    color: ${NormalBlack};
  }
  .cell-bottom {
    font-family: ${OpenSansNormal};
    font-size: 0.8rem;
    color: ${DarkGrey};
  }
  .MuiTableCell-sizeSmall {
    padding: 15px;
  }
  .MuiTablePagination-toolbar {
    padding-left: 16px;
    border: none;
  }
  .MuiTablePagination-spacer {
    flex: 0;
  }
`;

const DietTable = props => {
  const { currentDateIndex, currentDietList } = props;

  return (
    <Wrapper>
      <Table size="small">
        <TableBody>
          {currentDietList[currentDateIndex].intake_list.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <img className="food-icon" src={item.thumb} alt="food" />
              </TableCell>
              <TableCell>
                <span className="cell-top">{item.food_name}</span>
                <p className="cell-bottom">
                  {item.serving_qty} {item.serving_unit}s (
                  {item.serving_weight_grams &&
                    item.serving_weight_grams.toFixed(0)}{" "}
                  g)
                </p>
              </TableCell>
              <TableCell align="right">
                <span className="cell-top">
                  {item.nf_calories && item.nf_calories.toFixed(0)} cal
                </span>
                <p className="cell-bottom">{item.meal_type}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    currentDateIndex: state.date.dateIndex,
    currentDietList: state.diet.dietList
  };
};

export default connect(mapStateToProps)(DietTable);
