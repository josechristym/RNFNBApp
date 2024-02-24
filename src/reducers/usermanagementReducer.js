const UserManagementReducer = (state = {}, action) => {
    // Reducer logic for the first slice of state
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        return { ...state, loginResponse: action.payload };
      case 'USER_LOGIN_FAILURE':
          return { ...state, loginFailure: action.payload };
      default:
        return state;
    }
  };

export default UserManagementReducer;