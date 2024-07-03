const initialState = {
    user: null,
    token: localStorage.getItem('token')
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('token', action.payload.token);
        return { ...state, user: action.payload.user, token: action.payload.token };
      case 'LOGOUT':
        localStorage.removeItem('token');
        return { ...state, user: null, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  