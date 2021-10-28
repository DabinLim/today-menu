import createDataContext from '../../utils/createDataContext';
import foodReducer from './foodReducer';
import foodActions from './foodActions';

export const { Context, Provider } = createDataContext(
  foodReducer,
  {
    ...foodActions,
  }, {
    randomFoodList: [],
    randomFoodLoading: false,
    foodWorldCupList: [],
    foodWorldCupListLoading: false,
  },
);
