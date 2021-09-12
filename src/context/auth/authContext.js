import createDataContext from '../../utils/createDataContext';
import authReducer from './authReducer';
import { requestSignUp } from './authApis';

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
    signUpAction,
    signInAction,
  }, {
    user: {},
  },
);
