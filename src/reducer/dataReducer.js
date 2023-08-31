const dataReducer = (state, action) => {
  switch (action.type) {
    case "USER_LIST":
      return {
        ...state,
        item: [...state.item, action.payload],
        isLoading: true,
      };

    default:
      return state;
  }
};

export default dataReducer;
