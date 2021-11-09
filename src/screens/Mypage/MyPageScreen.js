import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Context as AuthContext } from '../../context/auth/authContext';
import { myPageList } from './utils';
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
  const userEmail = get(user, 'email');

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
              님 안녕하세요
            </Text>
          </Text>
        </View>
        <MyPageList navigate={navigate} />
      </View>
      <View style={styles.btnWrap}>
        <Button
          onPress={confirmSignOut}
          title="로그아웃"
          type="dark"
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
    paddingVertical: 20,
    flex: 1,
  },
  userName: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 20,
  },
  btnWrap: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default MyPageScreen;
