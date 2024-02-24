const FNBReducer = (state = {}, action) => {
    // Reducer logic for the first slice of state
    switch (action.type) {
      case 'GET_DINE_IN_SUCCESS':
        return { ...state, dineinoptions: action.payload };
      case 'GET_DINE_IN_FAILURE':
        return { ...state, dineinFailure: action.payload };
      case 'GET_TABLES_SUCCESS':
        return { ...state, tablesInfo: action.payload };
      case 'GET_TABLES_FAILURE':
        return { ...state, tablesFailure: action.payload };
      default:
        return state;
    }
  };

export default FNBReducer;