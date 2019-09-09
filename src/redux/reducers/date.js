const initialState = { dateIndex: 0 };

const date = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_DATE_INDEX":
      return {
        ...state,
        dateIndex: action.dateIndex
      };
    default:
      return state;
  }
};

export default date;
