export const setTableInputs = (value) => {
    return {
        type: 'SET_TABLE_INPUTS',
        payload: value,
    }
};

export const setCartValue = (value) => {
    return {
        type: 'SET_CART',
        payload: value,
    }
}

export const updateCartValue = (value) => {
    return {
        type: 'UPDATE_CART',
        payload: value,
    }
}
