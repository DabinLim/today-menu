import { requestRandomFoodList, requestSelectedFood, requestWorldCupFoodList } from './foodApis';
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
  getSelectedFood: (dispatch) => async (answers, callback) => {
    try {
      dispatch({
        type: 'fetch_selected_food',
        payload: {
          loading: true,
        },
      });

      const { selectedFood } = await requestSelectedFood(answers);

      dispatch({
        type: 'fetch_selected_food',
        payload: {
          selectedFood,
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'fetch_selected_food',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
};
