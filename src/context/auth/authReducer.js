import { myImmer } from '../utils';

export default (state, action) => {
  const { user } = state;
  const { bookmarkedRestaurant, bookmarkedIdList } = state;
  switch (action.type) {
    case 'sign_up':
      return myImmer(state, {
        signUpLoading: action.payload.loading,
      });
    case 'sign_in':
      return myImmer(state, {
        user: action.payload.user,
        signInLoading: action.payload.loading,
      });
    case 'check_session':
      return myImmer(state, {
        user: action.payload.user,
        isChecked: action.payload.isChecked,
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
        modifyUserPasswordLoading: action.payload.loading,
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
    case 'get_bookmark':
      return myImmer(state, {
        bookmarkedRestaurant: action.payload.bookmarkedRestaurant,
        bookmarkedRestaurantLoading: action.payload.loading,
        bookmarkedIdList: action.payload.bookmarkedIdList,
      });
    case 'add_bookmark':
      if (action.payload.bookmarkedRestaurant) {
        bookmarkedRestaurant.push(action.payload.bookmarkedRestaurant);
        bookmarkedIdList.push(action.payload.bookmarkedRestaurant.name);
      }
      return myImmer(state, {
        bookmarkedRestaurant,
        bookmarkedIdList,
      });
    case 'remove_bookmark':
      bookmarkedRestaurant.forEach((v, idx) => {
        if (v.restaurantId === action.payload.restaurantId) {
          bookmarkedRestaurant.splice(idx, 1);
          bookmarkedIdList.splice(idx, 1);
        }
      });
      return myImmer(state, {
        bookmarkedRestaurant,
        bookmarkedIdList,
      });
    default:
      return state;
  }
};
