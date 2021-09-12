import { get } from 'lodash';
import { myAxios, handleError } from '../utils';
import { randomFoodData } from "../mockData";

export const requestRandomFoodList = async () => {
  try {
    // const response = await myAxios(
    //   'GET',
    //   '',
    // );

    // const data = get(response, 'data');

    const data = randomFoodData;

    return { randomFoodList: data };
  } catch (e) {
    handleError(e);
    return { error: e };
  }
};
