const initialState = false;

const showCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_CART':
      state = true;
      return state;
    case 'HIDE_CART':
      state = false;
      return state;
    default:
      return state;
  }
}

export default showCartReducer;