import React, { useRef } from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';

const MapView = () => {
  let webviewRef = useRef();
  const handleSetRef = (ref) => {
    webviewRef = ref;
  };
  const handleEndLoading = (e) => {
    console.log('handleEndLoading');
    webviewRef.postMessage('hello');
  };
  const handleOnMessage = ({ nativeEvent: { data } }) => {
    console.log(`dataFromWebView : ${JSON.stringify(data)}`);
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        ref={handleSetRef}
        source={{ uri: 'https://dabinlim.github.io/eat_what_map' }}
      />
    </View>
  );
};

export default MapView;
