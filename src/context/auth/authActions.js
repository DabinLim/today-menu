import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import axios from 'axios';
import {
  requestAddBookmarkedRestaurant,
  requestCheckSession,
  requestDeleteAccount, requestGetBookmarkedRestaurant,
  requestModifyPassword,
  requestModifyUserName, requestRemoveBookmarkedRestaurant,
  requestSignIn,
  requestSignUp,
} from './authApis';
import { handleError } from '../utils';

export default {
  setSkipSignIn: (dispatch) => async (callback) => {
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
      const error = handleError(e);
      callback(error);
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
          await AsyncStorage.setItem('eat_what_token', token);
        }
      }

      if (callback) {
        callback(user, null);
      }

      dispatch({
        type: 'sign_in',
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
  checkSession: (dispatch) => async (callback) => {
    try {
      const token = await AsyncStorage.getItem('eat_what_token');
      console.log(token);
      if (token) {
        const { user } = await requestCheckSession();
        dispatch({
          type: 'check_session',
          payload: {
            user,
            isChecked: true,
          },
        });
      } else {
        dispatch({
          type: 'skip_sign_in',
          payload: {
            skipSignIn: true,
          },
        });
        dispatch({
          type: 'check_session',
          payload: {
            user: null,
            isChecked: true,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: 'check_session',
        payload: {
          user: null,
          isChecked: true,
        },
      });
      const error = handleError(e);
      console.error('checkSessionError: ', e);
      callback(error);
    }
  },
  getBookMarkList: (dispatch) => async (callback) => {
    try {
      dispatch({
        type: 'get_bookmark',
        payload: {
          loading: true,
        },
      });
      const token = await AsyncStorage.getItem('eat_what_token');
      if (token) {
        const { bookmarkedRestaurant } = await requestGetBookmarkedRestaurant();

        const bookmarkedIdList = bookmarkedRestaurant.map((v) => v.name);

        dispatch({
          type: 'get_bookmark',
          payload: {
            loading: false,
            bookmarkedRestaurant,
            bookmarkedIdList,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: 'get_bookmark',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  addBookMark: (dispatch) => async (
    place_name,
    category_group_name,
    address_name,
    road_address_name,
    phone,
    place_url,
    x,
    y,
    callback,
  ) => {
    try {
      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: true,
        },
      });

      const { bookmarkedRestaurant } = await requestAddBookmarkedRestaurant(
        place_name,
        category_group_name,
        address_name,
        road_address_name,
        phone,
        place_url,
        x,
        y,
      );

      const restaurantItem = {
        address: address_name,
        category: category_group_name,
        name: place_name,
        phoneNumber: phone,
        restaurantId: bookmarkedRestaurant?.restaurantId,
        roadAddress: road_address_name,
        url: place_url,
        x,
        y,
      };

      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: false,
          bookmarkedRestaurant: restaurantItem,
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
  removeBookmark: (dispatch) => async (restaurantId, callback) => {
    try {
      dispatch({
        type: 'remove_bookmark',
        payload: {
          loading: true,
        },
      });
      await requestRemoveBookmarkedRestaurant(restaurantId);
      dispatch({
        type: 'remove_bookmark',
        payload: {
          loading: true,
          restaurantId,
        },
      });
    } catch (e) {
      dispatch({
        type: 'remove_bookmark',
        payload: {
          loading: false,
        },
      });
      callback(null, error);
      console.error('removeBookmark Error: ', e);
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
        type: 'modify_user_password',
        payload: {
          loading: true,
        },
      });

      const { data } = await requestModifyPassword(pwd);

      dispatch({
        type: 'modify_user_password',
        payload: {
          loading: false,
        },
      });

      callback(data, null);
    } catch (e) {
      dispatch({
        type: 'modify_user_password',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(null, error);
    }
  },
  deleteAccount: (dispatch) => async (callback) => {
    try {
      dispatch({
        type: 'delete_account',
        payload: {
          loading: true,
        },
      });

      const { data } = await requestDeleteAccount();

      await AsyncStorage.removeItem('eat_what_token');
      axios.defaults.headers.common.Authorization = undefined;

      dispatch({
        type: 'delete_account',
        payload: {
          loading: false,
          user: null,
        },
      });

      callback(data, null);
    } catch (e) {
      dispatch({
        type: 'delete_account',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  signOutAction: (dispatch) => async (callback) => {
    try {
      await AsyncStorage.removeItem('eat_what_token');
      dispatch({
        type: 'sign_out',
        payload: {
          user: null,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
};
