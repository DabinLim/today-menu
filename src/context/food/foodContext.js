import createDataContext from '../../utils/createDataContext';
import foodReducer from './foodReducer';
import { requestRandomFoodList, requestWorldCupFoodList } from "./foodApis";

const getRandomFoodList = (dispatch) => async (callback) => {
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
};

const getWorldCupFoodList = (dispatch) => async (round, callback) => {
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
};

export const { Context, Provider } = createDataContext(
  foodReducer,
  {
    getRandomFoodList,
    getWorldCupFoodList,
  }, {
    randomFoodList: [],
    randomFoodLoading: false,
    foodWorldCupList: [],
    foodWorldCupListLoading: false,
  },
);
