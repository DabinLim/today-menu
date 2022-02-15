import React from 'react';
import {
  View, Text, Linking, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';

const LicenseScreen = () => {
  const linkTo = async (license) => {
    switch (license) {
      case 'react-navigation':
        await Linking.openURL('https://github.com/react-navigation/react-navigation/blob/main/packages/drawer/LICENSE');
        break;
      case 'axios':
        await Linking.openURL('https://github.com/axios/axios/blob/master/LICENSE');
        break;
      case 'react-native':
        await Linking.openURL('https://github.com/facebook/react-native/blob/main/LICENSE');
        break;
      case 'vector-icons':
        await Linking.openURL('https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE');
        break;
      case 'dropdown-picker':
        await Linking.openURL('https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/LICENSE');
        break;
      case 'splash-screen':
        await Linking.openURL('https://github.com/crazycodeboy/react-native-splash-screen/blob/master/LICENSE');
        break;
      case 'geolocation':
        await Linking.openURL('https://github.com/Agontuk/react-native-geolocation-service/blob/master/LICENSE');
        break;
      case 'gesture':
        await Linking.openURL('https://github.com/software-mansion/react-native-gesture-handler/blob/main/LICENSE');
        break;
      case 'webview':
        await Linking.openURL('https://github.com/react-native-webview/react-native-webview/blob/master/LICENSE');
        break;
      case 'modal':
        await Linking.openURL('https://github.com/react-native-modal/react-native-modal/blob/master/LICENSE.md');
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => linkTo('react-navigation')}
          style={styles.button}
        >
          <Text>
            react-navigation
          </Text>
          <Text>
            Copyright (c) 2020 React Navigation
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('axios')}
          style={styles.button}
        >
          <Text>
            axios
          </Text>
          <Text>
            Copyright (c) 2014-present Matt Zabriskie
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('axios')}
          style={styles.button}
        >
          <Text>
            react-native
          </Text>
          <Text>
            Copyright (c) Meta Platforms, Inc. and affiliates.
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('vector-icons')}
          style={styles.button}
        >
          <Text>
            react-native-vector-icons
          </Text>
          <Text>
            Copyright (c) 2015 Joel Arvidsson
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('dropdown-picker')}
          style={styles.button}
        >
          <Text>
            react-native-dropdown-picker
          </Text>
          <Text>
            Copyright (c) 2015 Joel Arvidsson
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('splash-screen')}
          style={styles.button}
        >
          <Text>
            react-native-splash-screen
          </Text>
          <Text>
            Copyright (c) 2016 Jia PengHui
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('geolocation')}
          style={styles.button}
        >
          <Text>
            react-native-geolocation-service
          </Text>
          <Text>
            Copyright (c) 2018 Iftekhar Rifat
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('gesture')}
          style={styles.button}
        >
          <Text>
            react-native-gesture-handler
          </Text>
          <Text>
            Copyright (c) 2016 Software Mansion
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('webview')}
          style={styles.button}
        >
          <Text>
            react-native-webview
          </Text>
          <Text>
            Copyright (c) 2015-present, Facebook, Inc.
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linkTo('modal')}
          style={styles.button}
        >
          <Text>
            react-native-modal
          </Text>
          <Text>
            Copyright (c) 2017 React Native Community
          </Text>
          <Text>
            MIT License
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  button: {
    marginBottom: 24,
  },
});

LicenseScreen.navigationOptions = {
  title: '제작 정보',
};

export default LicenseScreen;
