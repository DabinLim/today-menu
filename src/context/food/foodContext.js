import createDataContext from '../../utils/createDataContext';
import foodReducer from './foodReducer';
import foodActions from './foodActions';

export const { Context, Provider } = createDataContext(
  foodReducer,
  {
    ...foodActions,
  }, {
    randomFoodList: [],
    randomFoodListLoading: false,
    foodWorldCupList: [],
    foodWorldCupListLoading: false,
    selectedFoodByType: undefined,
    selectedFoodByTypeLoading: false,
    randomFood: undefined,
    randomFoodLoading: false,
  },
);
