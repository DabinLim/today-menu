import HomeScreen from '../screens/Home/HomeScreen';
import MyPageScreen from '../screens/Mypage/MyPageScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import LocalFoodScreen from '../screens/LocalFood/LocalFoodScreen';
import RandomFoodScreen from '../screens/RandomFood/RandomFoodScreen';
import FoodWorldCupScreen from '../screens/FoodWorldCup/FoodWorldCupScreen';
import SortByCravingScreen from '../screens/Home/SortByCravingScreen';
import FoodMapScreen from '../components/FoodMapScreen';
import UserInfoScreen from '../screens/Mypage/components/UserInfoScreen';
import BookmarkedListScreen from '../screens/Mypage/components/BookmarkedListScreen';
import ModifyUserPasswordScreen from '../screens/Mypage/components/ModifyUserPasswordScreen';
import LicenseScreen from '../screens/Mypage/components/LicenseScreen';

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
  USER_INFO_SCREEN: {
    name: 'UserInfo',
    component: UserInfoScreen,
    options: UserInfoScreen.navigationOptions,
    flow: ['MAIN'],
  },
  BOOKMARKED_LIST_SCREEN: {
    name: 'BookmarkedList',
    component: BookmarkedListScreen,
    options: BookmarkedListScreen.navigationOptions,
    flow: ['MAIN'],
  },
  MODIFY_USER_PASSWORD_SCREEN: {
    name: 'ModifyUserPassword',
    component: ModifyUserPasswordScreen,
    options: ModifyUserPasswordScreen.navigationOptions,
    flow: ['MAIN'],
  },
  LICENSE_SCREEN: {
    name: 'License',
    component: LicenseScreen,
    option: LicenseScreen.navigationOptions,
    flow: ['MAIN'],
  },
};
