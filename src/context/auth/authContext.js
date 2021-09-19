import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from '../../utils/createDataContext';
import authReducer from './authReducer';
import { requestSignUp } from './authApis';

const setSkipSignIn = (dispatch) => async () => {
  const skipSignIn = await AsyncStorage.getItem('skipSignIn');
  if (skipSignIn) {
    dispatch({
      type: 'skip_sign_in',
      payload: {
        skipSignIn: true,
      },
    });
  } else {
    dispatch({
      type: 'skip_sign_in',
      payload: {
        skipSignIn: false,
      },
    });
  }
};

const signUpAction = (dispatch) => async (email, password, name, callback) => {
  dispatch({
    type: 'sign_up',
    payload: {
      loading: true,
    },
  });

  const { user, error } = await requestSignUp(email, password, name);

  if (callback) {
    if (error) {
      callback(null, error);
    } else {
      callback(user, null);
    }
  }

  dispatch({
    type: 'sign_up',
    payload: {
      user,
      loading: false,
    },
  });
};

const signInAction = (dispatch) => (email, password) => {
  dispatch({
    type: 'sign_in',
    payload: {

    },
  });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    setSkipSignIn,
    signUpAction,
    signInAction,
  }, {
    user: {},
    skipSignIn: false,
  },
);
