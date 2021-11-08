import React from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { myPageList } from '../utils';
import { screens } from '../../../constants/screens';

const MyPageList = ({ navigate }) => {
  const renderMyPageList = ({ item: { title } }) => (
    <TouchableOpacity
      onPress={() => navigateTo(title)}
      style={styles.listItem}
    >
      <Text style={styles.listTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const navigateTo = (title) => {
    switch (title) {
      case '내 정보 수정':
        navigate(screens.USER_INFO_SCREEN.name);
        break;
      case '즐겨찾는 맛집':
        navigate(screens.BOOKMARKED_LIST_SCREEN.name);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(item) => item.title}
        data={myPageList}
        renderItem={renderMyPageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 40,
  },
  listItem: {
    marginTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  listTitle: {
    fontSize: 18,
  },
});

export default MyPageList;
