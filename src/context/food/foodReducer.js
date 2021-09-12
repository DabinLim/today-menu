import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'random_food_list':
      return myImmer(state, {
        randomFoodList: action.payload.randomFoodList,
        randomFoodLoading: action.payload.loading,
      });
    default:
      return state;
  }
};
