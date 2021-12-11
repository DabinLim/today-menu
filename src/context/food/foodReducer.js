import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'random_food_list':
      return myImmer(state, {
        randomFoodList: action.payload.randomFoodList,
        randomFoodListLoading: action.payload.loading,
      });
    case 'fetch_food_world_cup_list':
      return myImmer(state, {
        foodWorldCupList: action.payload.foodWorldCupList,
        foodWorldCupListLoading: action.payload.loading,
      });
    case 'fetch_selected_food_by_type':
      return myImmer(state, {
        selectedFoodByType: action.payload.selectedFoodByType,
        selectedFoodByTypeLoading: action.payload.loading,
      });
    case 'fetch_random_food':
      return myImmer(state, {
        randomFood: action.payload.randomFood,
        randomFoodLoading: action.payload.loading,
      });
    default:
      return state;
  }
};
