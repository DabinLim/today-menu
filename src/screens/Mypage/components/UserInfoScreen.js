import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import Button from '../../../components/Button';

const UserInfoScreen = ({ navigation }) => {
  const {
    state: {
      user,
    },
  } = useContext(AuthContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const navigateTo = (action) => {
    switch (action) {
      case 'modify_name':
        console.log(action);
        break;
      case 'modify_password':
        console.log(action);
        break;
      case 'delete_account':
        showAlert({
          message: '정말 회원탈퇴 하시겠습니까?\n회원정보는 복구 할 수 없습니다.',
          onConfirm: dismissAlert,
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.item}>
          <Text style={styles.text}>
            이메일:
            {' '}
            {user?.email}
          </Text>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={styles.text}>
              이름:
              {' '}
              {user?.name}
            </Text>
          </View>
          <Button
            onPress={navigateTo}
            title="수정"
            type="dark"
            containerStyle={styles.modifyBtn}
          />
        </View>
      </View>
      <View style={styles.btnWrap}>
        <Button
          onPress={navigateTo}
          title="비밀번호 변경"
          type="dark"
        />
        <Button
          onPress={navigateTo}
          title="회원탈퇴"
          type="gray"
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  modifyBtn: {
    width: 60,
    height: 40,
    marginLeft: 20,
  },
  userInfo: {
    flex: 1,
  },
  btnWrap: {
    marginBottom: 20,
  },
});

UserInfoScreen.navigationOptions = {
  title: '내 정보 수정',
};

export default UserInfoScreen;
