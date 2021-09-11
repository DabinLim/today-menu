import HomeScreen from '../screens/Home/HomeScreen';
import MyPageScreen from '../screens/Mypage/MyPageScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import LocalFoodScreen from '../screens/LocalFood/LocalFoodScreen';
import RandomFoodScreen from '../screens/RandomFood/RandomFoodScreen';
import FoodWorldCupScreen from '../screens/FoodWorldCup/FoodWorldCupScreen';
import SortByCravingScreen from '../screens/Home/SortByCravingScreen';

export const screens = {
  SIGN_IN: {
    name: 'SignIn',
    component: SignInScreen,
    options: SignInScreen.navigationOptions,
    flows: ['MAIN'],
  },
  SIGN_UP: {
    name: 'SignUp',
    component: SignUpScreen,
    options: SignUpScreen.navigationOptions,
    flows: ['MAIN'],
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
  LOCAL_FOOD: {
    name: 'LocalFood',
    component: LocalFoodScreen,
    options: LocalFoodScreen.navigationOptions,
    flows: ['BOTTOM_NAVI'],
  },
  RANDOM_FOOD: {
    name: 'RandomFood',
    component: RandomFoodScreen,
    options: RandomFoodScreen.navigationOptions,
    flows: ['BOTTOM_NAVI'],
  },
  FOOD_WORLD_CUP: {
    name: 'FoodWorldCup',
    component: FoodWorldCupScreen,
    options: FoodWorldCupScreen.navigationOptions,
    flows: ['BOTTOM_NAVI'],
  },
  SORT_BY_CRAVING: {
    name: 'SortByCraving',
    component: SortByCravingScreen,
    options: SortByCravingScreen.navigationOptions,
    flows: ['MAIN'],
  },
};
