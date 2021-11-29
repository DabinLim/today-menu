import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../../constants/screens';
import Button from '../../components/Button';
import { images } from '../../constants/assets';
import Input from '../../components/Input';

const HomeScreen = ({ navigation: { navigate } }) => {
  const [keyword, setKeyword] = useState('');

  const goToQuestion = () => {
    navigate(screens.SORT_BY_CRAVING.name);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.menuWrap}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity style={styles.smallMenuCard}>
              <View>
                <Text style={styles.menuText}>
                  치킨 맛집
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallMenuCard}>
              <View>
                <Text style={styles.menuText}>
                  한식 맛집
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallMenuCard}>
              <View>
                <Text style={styles.menuText}>
                  중식 맛집
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallMenuCard}>
              <View>
                <Text style={styles.menuText}>
                  파스타 맛집
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.menuWrap}>
            <TouchableOpacity style={styles.halfMenuCard}>
              <View>
                <Text style={styles.menuText}>
                  커뮤니티
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.halfMenuCard}>
              <View>
                <Text style={styles.menuText}>
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
        <TextInput
          onChangeText={setKeyword}
          style={styles.input}
          placeholder="맛집을 검색해보세요!"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          returnKeyType="search"
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
    backgroundColor: '#f5f5f5',
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
  smallMenuCard: {
    backgroundColor: '#f5f5f5',
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
  },
  image: {
    width: '100%',
    marginTop: 80,
  },
});

export default HomeScreen;
