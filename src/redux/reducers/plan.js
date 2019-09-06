import { diet } from "../../assets/js/mockDiet";

const initialState = diet.data_points[0];

const plan = (state = initialState, action) => {
  switch (action.actionType) {
    case "CHANGE_PLAN":
      return {
        ...state,
        plan: action.plan
      };
    default:
      return state;
  }
};

export default plan;
