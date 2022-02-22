import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, Text, View } from 'react-native';
import { Context as PopUpContext } from '../context/popup/popUpContext';
import Button from './Button';

const Alert = () => {
  const {
    state: {
      alertVisible,
      alertMessage,
      onConfirm,
      onCancel,
    },
  } = useContext(PopUpContext);
  return (
    <Modal
      isVisible={alertVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => {}}
      animationInTiming={0.1}
      animationOutTiming={0.1}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.message}>
            {alertMessage}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          {onCancel && (
          <Button
            onPress={onCancel}
            title="취소"
            type="white"
            containerStyle={{ flex: 1, borderRadius: 0, height: 50 }}
            textStyle={{ fontSize: 14 }}
          />
          )}
          <Button
            onPress={onConfirm}
            title="확인"
            type="dark"
            containerStyle={{ flex: 1, borderRadius: 0, height: 50 }}
            textStyle={{ fontSize: 14 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    borderRadius: 24,
    overflow: 'hidden',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    justifyContent: 'space-between',
  },
});

export default Alert;
