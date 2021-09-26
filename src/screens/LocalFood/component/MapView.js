import React, { useRef } from 'react';
import WebView from 'react-native-webview';
import { Text, TouchableOpacity, View } from 'react-native';

const MapView = () => {
  let webviewRef = useRef();
  const handleSetRef = (ref) => {
    webviewRef = ref;
  };
  const handleEndLoading = () => {
    webviewRef.postMessage(JSON.stringify({
      type: 'Location',
      data: {
        latitude: 37.27869377902859,
        longitude: 127.05759316285203,
      },
    }));
  };
  const handleOnMessage = ({ nativeEvent: { data } }) => {
    console.log(`dataFromWebView : ${JSON.stringify(data)}`);
  };
  return (
    <View style={{ flex: 1 }}>
      {/*<TouchableOpacity onPress={() => {*/}
      {/*  webviewRef.postMessage(JSON.stringify({*/}
      {/*    type: 'Location',*/}
      {/*    data: {*/}
      {/*      latitude: 37.27869377902859,*/}
      {/*      longitude: 127.05759316285203,*/}
      {/*    },*/}
      {/*  }));*/}
      {/*}}*/}
      {/*>*/}
      {/*  <Text>*/}
      {/*    메세지 보내기*/}
      {/*  </Text>*/}
      {/*</TouchableOpacity>*/}
      <WebView
        originWhitelist={['http://*', 'https://*']}
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        ref={handleSetRef}
        source={{ uri: 'https://dabinlim.github.io/eat_what_map' }}
      />
    </View>
  );
};

export default MapView;
