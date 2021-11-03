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

export const requestSelectedFood = async (answers) => {
  const response = await myAxios(
    'GET',
    '/api/foods/select',
    undefined,
    answers,
  );

  const data = get(response, 'data');

  return { selectedFood: data };
};
