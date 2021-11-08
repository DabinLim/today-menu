import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'sign_up':
      return myImmer(state, {
        user: action.payload.user,
        loading: action.payload.loading,
      });
    case 'sign_in':
      return myImmer(state, {
        user: action.payload.user,
        loading: action.payload.loading,
      });
    case 'skip_sign_in':
      return myImmer(state, {
        skipSignIn: action.payload.skipSignIn,
      });
    case 'modify_user_name':
      // eslint-disable-next-line no-case-declarations
      const { user } = state;
      user.name = action.payload.userName;
      return myImmer(state, {
        user,
      });
    default:
      return state;
  }
};
