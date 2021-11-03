import HomeScreen from '../screens/Home/HomeScreen';
import MyPageScreen from '../screens/Mypage/MyPageScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import LocalFoodScreen from '../screens/LocalFood/LocalFoodScreen';
import RandomFoodScreen from '../screens/RandomFood/RandomFoodScreen';
import FoodWorldCupScreen from '../screens/FoodWorldCup/FoodWorldCupScreen';
import SortByCravingScreen from '../screens/Home/SortByCravingScreen';
import FoodMapScreen from '../components/FoodMapScreen';

export const screens = {
  SIGN_IN: {
    name: 'SignIn',
    component: SignInScreen,
    options: SignInScreen.navigationOptions,
    flow: ['AUTH'],
  },
  SIGN_UP: {
    name: 'SignUp',
    component: SignUpScreen,
    options: SignUpScreen.navigationOptions,
    flow: ['AUTH'],
  },
  HOME: {
    name: 'Home',
    component: HomeScreen,
    options: HomeScreen.navigationOptions,
    flow: ['BOTTOM'],
  },
  MY_PAGE: {
    name: 'MyPage',
    component: MyPageScreen,
    options: MyPageScreen.navigationOptions,
    flow: ['BOTTOM'],
  },
  LOCAL_FOOD: {
    name: 'LocalFood',
    component: LocalFoodScreen,
    options: LocalFoodScreen.navigationOptions,
    flow: ['BOTTOM'],
  },
  RANDOM_FOOD: {
    name: 'RandomFood',
    component: RandomFoodScreen,
    options: RandomFoodScreen.navigationOptions,
    flow: ['BOTTOM'],
  },
  FOOD_WORLD_CUP: {
    name: 'FoodWorldCup',
    component: FoodWorldCupScreen,
    options: FoodWorldCupScreen.navigationOptions,
    flow: ['BOTTOM'],
  },
  SORT_BY_CRAVING: {
    name: 'SortByCraving',
    component: SortByCravingScreen,
    options: SortByCravingScreen.navigationOptions,
    flow: ['MAIN'],
  },
  FOOD_MAP_SCREEN: {
    name: 'FoodMap',
    component: FoodMapScreen,
    options: FoodMapScreen.navigationOptions,
    flow: ['MAIN'],
  },
};
