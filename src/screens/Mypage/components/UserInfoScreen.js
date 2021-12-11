import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { screens } from '../../../constants/screens';

const UserInfoScreen = ({ navigation }) => {
  const {
    state: {
      user,
    },
    deleteAccount,
    modifyUserName,
  } = useContext(AuthContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const [nameInputVisible, setNameInputVisible] = useState(false);
  const [nameText, setNameText] = useState(user?.name);
  const inputRef = useRef();

  const handleUserAction = (action) => {
    switch (action) {
      case 'modify_name':
        if (nameInputVisible) {
          handleModifyUserName();
          setNameInputVisible(false);
        } else {
          setNameInputVisible(true);
          if (inputRef) {
            setTimeout(() => { inputRef.current.focus(); }, 10);
          }
        }
        break;
      case 'modify_password':
        navigation.navigate(screens.MODIFY_USER_PASSWORD_SCREEN.name);
        break;
      case 'delete_account':
        showAlert({
          message: '정말 회원탈퇴 하시겠습니까?\n회원정보는 복구 할 수 없습니다.',
          onConfirm: () => {
            handleDeleteAccount();
            dismissAlert();
          },
          onCancel: dismissAlert,
        });
        break;
      default:
        break;
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount((response, error) => {
      if (response) {
        showAlert({
          message: '회원탈퇴가 완료 되었습니다.이용해주셔서 감사합니다.',
          onConfirm: dismissAlert,
        });
      }
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    });
  };

  const handleModifyUserName = () => {
    modifyUserName(nameText, (error) => {
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    });
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
          <Text style={styles.text}>
            이름:
            {' '}
          </Text>
          {nameInputVisible ? (
            <View style={{ flex: 1 }}>
              <TextInput
                ref={inputRef}
                onSubmitEditing={() => handleUserAction('modify_name')}
                onChangeText={setNameText}
                value={nameText}
                style={{ fontSize: 16 }}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                {user?.name}
              </Text>
            </View>
          )}
          <Button
            onPress={() => handleUserAction('modify_name')}
            title="수정"
            type="dark"
            containerStyle={styles.modifyBtn}
          />
          {nameInputVisible && (
            <Button
              onPress={() => setNameInputVisible(false)}
              title="취소"
              type="gray"
              containerStyle={styles.modifyBtn}
            />
          )}
        </View>
      </View>
      <View style={styles.btnWrap}>
        <Button
          onPress={() => handleUserAction('modify_password')}
          title="비밀번호 변경"
          type="dark"
        />
        <Button
          onPress={() => handleUserAction('delete_account')}
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
    lineHeight: 20,
  },
  modifyBtn: {
    width: 60,
    height: 35,
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
