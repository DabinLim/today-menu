import createDataContext from '../../utils/createDataContext';
import foodReducer from './foodReducer';
import { requestRandomFoodList } from './foodApis';

const getRandomFoodList = (dispatch) => async (email, password, name, callback) => {
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

export const { Context, Provider } = createDataContext(
  foodReducer,
  {
    getRandomFoodList,
  }, {
    randomFoodList: [],
    randomFoodLoading: false,
  },
);
