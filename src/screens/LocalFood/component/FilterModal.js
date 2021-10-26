import React from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const FilterModal = ({ onClose, visible }) => {
  let temp;
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.3}
      onBackdropPress={onClose}
    >
      <View>
        <Text>
          this is modal
        </Text>
      </View>
    </Modal>
  );
};

FilterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default FilterModal;
