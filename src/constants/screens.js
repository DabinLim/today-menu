import HomeScreen from '../screen/Home/HomeScreen';
import MyPageScreen from '../screen/Mypage/MyPageScreen';
import SignInScreen from '../screen/SignIn/SignInScreen';
import SignUpScreen from '../screen/SignUp/SignUpScreen';

export const screens = {
  SIGN_IN: {
    name: 'SignIn',
    component: SignInScreen,
    options: SignInScreen.navigationOptions,
    flows: ['AUTH'],
  },
  SIGN_UP: {
    name: 'SignUp',
    component: SignUpScreen,
    options: SignUpScreen.navigationOptions,
    flows: ['AUTH'],
  },
  HOME: {
    name: 'Home',
    component: HomeScreen,
    options: HomeScreen.navigationOptions,
    flows: ['BOTTOM_NAVI'],
  },
  MY_PAGE: {
    name: 'MyPage',
    component: MyPageScreen,
    options: MyPageScreen.navigationOptions,
    flows: ['BOTTOM_NAVI'],
  },
};
