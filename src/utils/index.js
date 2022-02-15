import { Alert } from 'react-native';

export const alertNeedSignIn = (confirm) => {
  Alert.alert('로그인이 필요합니다.', '', [{ onPress: confirm, text: '로그인' }, { text: '취소', style: 'cancel' }]);
};
