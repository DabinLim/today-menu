import createDataContext from '../../utils/createDataContext';
import authReducer from './authReducer';
import authActions from './authActions';

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    ...authActions,
  }, {
    user: null,
    isChecked: false,
    skipSignIn: false,
    signUpLoading: false,
    signInLoading: false,
    modifyUserNameLoading: false,
    modifyUserPasswordLoading: false,
    deleteAccountLoading: false,
    bookmarkedRestaurant: [],
    bookmarkedIdList: [],
    bookmarkedRestaurantLoading: false,
  },
);
