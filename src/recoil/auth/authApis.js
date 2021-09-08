import { get } from 'lodash';
import { myAxios, handleError } from '../utils';

export const requestSignUp = async (email, password, name) => {
  try {
    const response = await myAxios(
      'POST',
      '/api/member/signup',
      {
        email,
        password,
        name,
        memberRole: 'USER',
      },
    );

    const data = get(response, 'data');
    console.log(`data : ${data}`);
    return { data };
  } catch (e) {
    handleError(e);
    return { error: e };
  }
};

export const requestMembers = async () => {
  try {
    const response = await myAxios(
      'GET',
      '/api/member',
    );
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};
