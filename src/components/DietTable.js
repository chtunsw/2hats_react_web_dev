import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { changePlan } from "../redux/actions/index";

const Wrapper = styled.div``;

const DietTable = props => {
  return (
    <Wrapper>
      <div>diet table</div>
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
