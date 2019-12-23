export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.user.token);
      return {
        ...state,
        token: action.user.token
      };
    case 'SIGNUP':
      console.log(action);
      return {
        ...state,
        ...action.user
      };
    case 'REAFRESH':

      break;
    case 'LOGOUT':
      localStorage.removeItem('token');
      break;

    default:
      return state;
  }
};
