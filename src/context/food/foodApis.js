import { get } from 'lodash';
import { myAxios, handleError } from '../utils';

export const requestRandomFoodList = async () => {
  try {
    const response = await myAxios(
      'GET',
      '/api/food',
    );

    const data = get(response, 'data');

    return { randomFoodList: data };
  } catch (e) {
    handleError(e);
    return { error: e };
  }
};
