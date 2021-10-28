import { requestRandomFoodList, requestWorldCupFoodList } from './foodApis';
import { handleError } from '../utils';

export default {
  getRandomFoodList: (dispatch) => async (callback) => {
    try {
      dispatch({
        type: 'random_food_list',
        payload: {
          loading: true,
        },
      });

      const { randomFoodList, error } = await requestRandomFoodList();

      if (error && callback) {
        callback(error);
      }

      dispatch({
        type: 'random_food_list',
        payload: {
          randomFoodList,
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
  getWorldCupFoodList: (dispatch) => async (round, callback) => {
    try {
      dispatch({
        type: 'fetch_food_world_cup_list',
        payload: {
          loading: true,
        },
      });

      const { foodWorldCupList, error } = await requestWorldCupFoodList(round);

      if (error && callback) {
        callback(error);
      }

      dispatch({
        type: 'fetch_food_world_cup_list',
        payload: {
          foodWorldCupList,
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
};
