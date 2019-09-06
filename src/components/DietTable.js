import React, { useState } from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import { OpenSansNormal, DarkGrey, NormalBlack } from "../assets/js/variables";
import { diet } from "../assets/js/mockDiet";

import { connect } from "react-redux";
import { changePlan } from "../redux/actions/index";

const mockList = diet.data_points[1].intake_list;

const Wrapper = styled.div`
  flex-grow: 1;
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
  .table-footer {
    .MuiTableCell-root {
      border-bottom: 0;
    }
  }
`;

const DietTable = props => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Wrapper>
      <Table size="small">
        <TableBody>
          {mockList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img className="food-icon" src={item.thumb} alt="food" />
                </TableCell>
                <TableCell>
                  <span className="cell-top">{item.food_name}</span>
                  <p className="cell-bottom">
                    {item.serving_size} {item.serving_unit}s (
                    {item.serving_weight_grams} g)
                  </p>
                </TableCell>
                <TableCell align="right">
                  <span className="cell-top">{item.nf_calories} cal</span>
                  <p className="cell-bottom">{item.meal_type}</p>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter className="table-footer">
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={onChangePage}
              count={mockList.length}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { plan: state.plan };
};

export default connect(
  mapStateToProps,
  { changePlan }
)(DietTable);
