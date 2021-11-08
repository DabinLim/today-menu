import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import {
  requestAddRestaurant, requestCheckSession, requestModifyUserName, requestSignIn, requestSignUp,
} from './authApis';
import { handleError } from '../utils';

export default {
  setSkipSignIn: (dispatch) => async () => {
    try {
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
    } catch (e) {
      // todo 에러핸들링
      console.error(e);
    }
  },
  signUpAction: (dispatch) => async (email, password, name, callback) => {
    try {
      dispatch({
        type: 'sign_up',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestSignUp(email, password, name);

      if (callback) {
        callback(user, null);
      }

      dispatch({
        type: 'sign_up',
        payload: {
          user,
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(null, error);
    }
  },
  signInAction: (dispatch) => async (email, password, callback) => {
    try {
      dispatch({
        type: 'sign_in',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestSignIn(email, password);

      let token;
      if (user) {
        token = get(user, 'token');
        if (token) {
          console.log(token);
          await AsyncStorage.setItem('token', token);
        }
      }

      if (callback) {
        callback(user, null);
      }

      dispatch({
        type: 'sign_in',
        payload: {
          user,
          token,
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(null, error);
    }
  },
  checkSession: (dispatch) => async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        const { user } = await requestCheckSession();
        dispatch({
          type: 'sign_in',
          payload: {
            user,
            token,
            loading: false,
          },
        });
      }
    } catch (e) {
      // todo 에러핸들링
      console.error(e);
    }
  },
  addBookMark: (dispatch) => async (restaurant, callback) => {
    try {
      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: true,
        },
      });

      const { bookmarkedRestaurant } = await requestAddRestaurant();

      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: false,
          bookmarkedRestaurant,
        },
      });
    } catch (e) {
      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(null, error);
    }
  },
  modifyUserName: (dispatch) => async (userName, callback) => {
    try {
      dispatch({
        type: 'modify_user_name',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestModifyUserName(userName);

      if (user) {
        dispatch({
          type: 'modify_user_name',
          payload: {
            loading: false,
            userName,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: 'modify_user_name',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  modifyUserPassword: (dispatch) => async (pwd, callback) => {
    try {
      dispatch({
        type: 'modify_user_info',
        payload: {
          loading: true,
        },
      });
    } catch (e) {
      dispatch({
        type: 'modify_user_info',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
};
