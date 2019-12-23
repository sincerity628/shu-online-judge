export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.user.token);
      return {
        ...state,
        token: action.user.token
      };

    case 'UPDATE':
      return {
        ...state,
        ...action.user
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      break;

    default:
      return state;
  }
};
