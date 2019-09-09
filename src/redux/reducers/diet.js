import { diet as dietData } from "../../assets/js/mockDiet";

const initialState = { dietList: dietData.data_points };

const diet = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_DIET_LIST":
      return {
        ...state,
        dietList: action.dietList
      };
    default:
      return state;
  }
};

export default diet;
