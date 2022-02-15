import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../../constants/screens';
import Button from '../../components/Button';
import { images } from '../../constants/assets';
import { foodCategoryList } from './utils';
import { Context as PopUpContext } from '../../context/popup/popUpContext';
import { Context as AuthContext } from '../../context/auth/authContext';
import Input from '../../components/Input';

const HomeScreen = ({ navigation: { navigate } }) => {
  const { showAlert, dismissAlert } = useContext(PopUpContext);
  const {
    state: {
      skipSignIn,
    },
    setSkipSignIn,
  } = useContext(AuthContext);
  const [searchKeyword, setSearchKeyword] = useState('');

  const goToQuestion = () => {
    navigate(screens.SORT_BY_CRAVING.name);
  };

  const goToMap = (keyword) => {
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword });
  };

  const searchByKeyword = () => {
    if (searchKeyword === '') {
      showAlert({
        message: '검색어를 입력해주세요.',
        onConfirm: dismissAlert,
      });
      return;
    }
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword: searchKeyword });
    setSearchKeyword('');
  };

  const goToCommunity = () => {
    showAlert({
      message: '아직 준비중입니다.',
      onConfirm: dismissAlert,
    });
  };

  const goToBookmarkedList = () => {
    if (skipSignIn) {
      showAlert({
        message: '로그인이 필요합니다.',
        onConfirm: () => setSkipSignIn(false),
        onCancel: dismissAlert,
      });
      return;
    }
    navigate(screens.BOOKMARKED_LIST_SCREEN.name);
  };

  const renderFoodCategoryItem = ({ item: { value, image } }) => (
    <TouchableOpacity
      onPress={() => goToMap(value)}
      style={styles.smallMenuCard}
    >
      <Image style={styles.smallMenuImage} source={{ uri: image }} />
      <View>
        <Text style={styles.menuText}>
          {value}
          맛집
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <FlatList
            keyExtractor={({ value }) => value}
            contentContainerStyle={styles.menuWrap}
            data={foodCategoryList}
            renderItem={renderFoodCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.menuWrap}>
            <TouchableOpacity
              onPress={goToCommunity}
              style={styles.halfMenuCard}
            >
              <Image source={images.COMMUNITY} style={styles.halfMenuImage} />
              <View>
                <Text style={styles.halfMenuText}>
                  커뮤니티
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToBookmarkedList}
              style={styles.halfMenuCard}
            >
              <Image source={images.LIKE} style={styles.halfMenuImage} />
              <View>
                <Text style={styles.halfMenuText}>
                  즐겨찾는 맛집
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Button
            type="dark"
            onPress={goToQuestion}
            title="질문으로 메뉴 정하기"
            containerStyle={styles.longMenuCard}
          />
        </View>
      </ScrollView>
      <View source={images.MAIN_IMAGE} style={styles.mainImage}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            오늘의 메뉴
          </Text>
        </View>
        <Input
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          onSubmitEditing={searchByKeyword}
          style={styles.input}
          placeholder="맛집을 검색해보세요!"
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  mainImage: {
    width: '100%',
    height: Dimensions.get('window').height / 4,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#ffa033',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: Dimensions.get('window').height / 4 + 24,
    paddingHorizontal: 20,
  },
  titleWrap: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuWrap: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfMenuCard: {
    backgroundColor: 'darkgray',
    width: Dimensions.get('window').width / 2.4,
    height: Dimensions.get('window').width / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 16,
    marginLeft: 2,
  },
  halfMenuImage: {
    position: 'absolute',
    width: Dimensions.get('window').width / 2.4,
    height: Dimensions.get('window').width / 2.4,
    borderRadius: 16,
    opacity: 0.8,
  },
  smallMenuCard: {
    position: 'relative',
    backgroundColor: '#000',
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 16,
    marginRight: 8,
    marginLeft: 2,
  },
  smallMenuImage: {
    position: 'absolute',
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderRadius: 16,
    opacity: 0.8,
  },
  longMenuCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 16,
    marginBottom: 24,
  },
  menuCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 20,
  },
  halfMenuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    zIndex: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
    borderRadius: 8,
    height: 40,
    padding: 8,
    fontSize: 16,
    marginBottom: 24,
    color: '#000000',
  },
  image: {
    width: '100%',
    marginTop: 80,
  },
});

export default HomeScreen;
