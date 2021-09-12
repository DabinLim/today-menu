export const validatePwd = (pwd) => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,16}$/;
  return reg.test(pwd);
};

export const validateName = (name) => {
  const reg = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,10}$/;
  return reg.test(name);
};

export const validateEmail = (email) => {
  const reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z]{2,3}$)*/;
  return reg.test(email);
};
