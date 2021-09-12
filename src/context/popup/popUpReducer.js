import { myImmer } from '../utils';

export default (state, action) => {
  switch (action.type) {
    case 'show_alert':
      return myImmer(state, {
        alertVisible: action.payload.visible,
        alertMessage: action.payload.message,
        alertBackPress: action.payload.backPress,
        onConfirm: action.payload.onConfirm,
        onCancel: action.payload.onCancel,
      });
    case 'dismiss_alert':
      return myImmer(state, {
        alertVisible: false,
        alertMessage: '',
        alertBackPress: false,
        onConfirm: null,
        onCancel: null,
      });
    default:
      return state;
  }
};
