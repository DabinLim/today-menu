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
            type="gray"
            containerStyle={{ flex: 1, marginRight: 20 }}
          />
          )}
          <Button
            onPress={onConfirm}
            title="확인"
            type="dark"
            containerStyle={{ flex: 1, borderRadius: 24 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    minHeight: 160,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Alert;
