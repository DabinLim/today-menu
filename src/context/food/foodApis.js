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

export const requestRandomFood = async () => {
  const response = await myAxios(
    'GET',
    '/api/foods/random',
  );

  const data = get(response, 'data');

  return { randomFood: data };
};

export const requestWorldCupFoodList = async (round) => {
  const response = await myAxios(
    'GET',
    `/api/foods/world-cup/${round}`,
  );

  const data = get(response, 'data');

  return { foodWorldCupList: data };
};

export const requestSelectedFoodByType = async (answers) => {
  const response = await myAxios(
    'GET',
    '/api/foods/select',
    undefined,
    answers,
  );

  const data = get(response, 'data');

  return { selectedFoodByType: data };
};
