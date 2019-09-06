import React from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
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

import { connect } from "react-redux";
import { changePlan } from "../redux/actions/index";

const mockList = diet.data_points[1].intake_list;
console.log(mockList);

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const DietTable = props => {
  return (
    <Wrapper>
      <Table>
        <TableBody>
          {mockList.map((item, index) => (
            <TableRow key={index}>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination />
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
