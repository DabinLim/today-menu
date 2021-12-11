import React, { useContext } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { myPageList } from '../utils';
import { screens } from '../../../constants/screens';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';

const MyPageList = ({ navigate }) => {
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);
  const renderMyPageList = ({ item: { title } }) => (
    <TouchableOpacity
      onPress={() => navigateTo(title)}
      style={styles.listItem}
    >
      <Text style={styles.listTitle}>
        {title}
      </Text>
      <AntDesign name="right" size={20} />
    </TouchableOpacity>
  );

  const navigateTo = (title) => {
    switch (title) {
      case '내 정보':
        navigate(screens.USER_INFO_SCREEN.name);
        break;
      case '즐겨찾는 맛집':
        navigate(screens.BOOKMARKED_LIST_SCREEN.name);
        break;
      case '나의 맛집 친구':
        showAlert({
          message: '아직 준비중입니다.',
          onConfirm: dismissAlert,
        });
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
    width: '100%',
    flex: 1,
  },
  listItem: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 18,
  },
});

export default MyPageList;
