import { myImmer } from '../utils';

export default (state, action) => {
  const { user } = state;
  switch (action.type) {
    case 'sign_up':
      return myImmer(state, {
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
      user.name = action.payload.userName;
      return myImmer(state, {
        user,
        modifyUserNameLoading: action.payload.loading,
      });
    case 'modify_user_password':
      return myImmer(state, {
        modifyUserPassword: action.payload.loading,
      });
    case 'delete_account':
      console.log(action.payload.user);
      return myImmer(state, {
        user: action.payload.user === undefined ? user : action.payload.user,
        deleteAccountLoading: action.payload.loading,
      });
    case 'sign_out':
      return myImmer(state, {
        user: action.payload.user,
      });
    default:
      return state;
  }
};
