import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Context as AuthContext } from '../../context/auth/authContext';
import { myPageList } from './utils';

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

  const navigateTo = (title) => {

  };

  const renderMyPageList = ({ item: { title } }) => (
    <View>
      <Text>
        {title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.userName}>
          {userName}
          <Text style={styles.title}>
            님 안녕하세요
          </Text>
        </Text>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item.title}
            data={myPageList}
            renderItem={renderMyPageList}
          />
        </View>
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
  listContainer: {
    marginTop: 40,
  },
});

export default MyPageScreen;
