const CartReducer = (state = {}, action) => {
    // Reducer logic for the first slice of state
    switch (action.type) {
      case 'SET_TABLE_INPUTS':
        return { ...state, tablechairs: action.payload }; 
      case 'SET_CART':
        let cartValue = state.cartValue ? state.cartValue : []
        if(cartValue != undefined){
            cartValue = cartValue.filter(elem=>elem.id!=action.payload.id)
        }
        return { ...state, cartValue: [...cartValue,action.payload]}; 
       case 'UPDATE_CART':
        return { ...state, cartValue: action.payload }; 
      default:
        return state;
    }
  };

export default CartReducer;