import {
  requestRandomFood,
  requestRandomFoodList,
  requestSelectedFoodByType,
  requestWorldCupFoodList,
} from './foodApis';
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

      const { randomFoodList } = await requestRandomFoodList();

      dispatch({
        type: 'random_food_list',
        payload: {
          randomFoodList,
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'random_food_list',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  getRandomFood: (dispatch) => async (callback) => {
    try {
      dispatch({
        type: 'fetch_random_food',
        payload: {
          loading: true,
        },
      });

      const { randomFood } = await requestRandomFood();

      dispatch({
        type: 'fetch_random_food',
        payload: {
          randomFood,
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'fetch_random_food',
        payload: {
          loading: false,
        },
      });
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

      const { foodWorldCupList } = await requestWorldCupFoodList(round);

      dispatch({
        type: 'fetch_food_world_cup_list',
        payload: {
          foodWorldCupList,
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'fetch_food_world_cup_list',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  getFoodByType: (dispatch) => async (answers, callback) => {
    try {
      dispatch({
        type: 'fetch_selected_food_by_type',
        payload: {
          loading: true,
        },
      });

      const { selectedFoodByType } = await requestSelectedFoodByType(answers);

      dispatch({
        type: 'fetch_selected_food_by_type',
        payload: {
          selectedFoodByType,
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'fetch_selected_food_by_type',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
};
