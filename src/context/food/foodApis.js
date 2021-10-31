import { get } from 'lodash';
import { myAxios } from '../utils';

export const requestRandomFoodList = async () => {
  const response = await myAxios(
    'GET',
    '/api/foods',
  );

  const data = get(response, 'data');

  return { randomFoodList: data };
};

export const requestWorldCupFoodList = async (round) => {
  const response = await myAxios(
    'GET',
    `/api/foods/world-cup/${round}`,
  );

  const data = get(response, 'data');

  return { foodWorldCupList: data };
};
