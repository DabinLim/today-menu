import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import { requestSignIn, requestSignUp } from './authApis';
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
        token = get(user, 'accessToken');
        if (token) {
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
      if (token) {
        // todo 세션 체크 api 연동
        dispatch({
          type: 'sign_in',
          payload: {
            user: true,
            token,
          },
        });
      }
    } catch (e) {
      // todo 에러핸들링
      console.error(e);
    }
  },
};
