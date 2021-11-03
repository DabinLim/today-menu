import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'random_food_list':
      return myImmer(state, {
        randomFoodList: action.payload.randomFoodList,
        randomFoodLoading: action.payload.loading,
      });
    case 'fetch_food_world_cup_list':
      return myImmer(state, {
        foodWorldCupList: action.payload.foodWorldCupList,
        foodWorldCupListLoading: action.payload.loading,
      });
    case 'fetch_selected_food':
      return myImmer(state, {
        selectedFood: action.payload.selectedFood,
        selectedFoodLoading: action.payload.loading,
      });
    default:
      return state;
  }
};
