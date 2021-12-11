import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Context as AuthContext } from '../../context/auth/authContext';
import Button from '../../components/Button';
import MyPageList from './components/MyPageList';
import { Context as PopUpContext } from '../../context/popup/popUpContext';

const MyPageScreen = ({ navigation: { navigate } }) => {
  const {
    state: {
      user,
    },
    signOutAction,
  } = useContext(AuthContext);

  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const userName = get(user, 'name');

  const confirmSignOut = () => {
    showAlert({
      message: '로그아웃 하시겠습니까?',
      onConfirm: handleSignOut,
      onCancel: dismissAlert,
    });
  };

  const handleSignOut = () => {
    signOutAction((error) => {
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    });
    dismissAlert();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.userName}>
            {userName}
            <Text style={styles.title}>
              {' '}
              님
            </Text>
          </Text>
          <Text style={styles.title}>
            오늘의 메뉴를 골라보세요
          </Text>
        </View>
        <MyPageList navigate={navigate} />
      </View>
      <View style={styles.btnWrap}>
        <Button
          onPress={confirmSignOut}
          title="로그아웃"
          type="darkGray"
        />
      </View>
    </SafeAreaView>
  );
};

MyPageScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 20,
    textAlign: 'center',
  },
  btnWrap: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default MyPageScreen;
