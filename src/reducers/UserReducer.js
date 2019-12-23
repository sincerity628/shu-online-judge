export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.user.token
      };
    case 'SIGNUP':
      return {
        ...state,
        ...action.user
      };
    case 'REFRESH':

      break;
    case 'LOGOUT':

      break;

    default:
      return state;
  }
};
