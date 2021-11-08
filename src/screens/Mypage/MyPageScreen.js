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

const MyPageScreen = ({ navigation: { navigate } }) => {
  const {
    state: {
      user,
    },
  } = useContext(AuthContext);

  const userName = get(user, 'name');
  const userEmail = get(user, 'email');

  const handleSignOut = () => {

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
          onPress={handleSignOut}
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
