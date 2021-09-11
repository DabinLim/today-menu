import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'sign_up':
      return myImmer(state, {
        user: action.payload.user,
        loading: action.payload.loading,
      });
    default:
      return state;
  }
};
