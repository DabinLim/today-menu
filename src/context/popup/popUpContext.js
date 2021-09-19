import createDataContext from '../../utils/createDataContext';
import popUpReducer from './popUpReducer';

const showAlert = (dispatch) => ({
  message, onConfirm, onCancel, backPress,
}) => {
  dispatch({
    type: 'show_alert',
    payload: {
      visible: true,
      message,
      backPress,
      onConfirm,
      onCancel,
    },
  });
};

const dismissAlert = (dispatch) => () => {
  dispatch({
    type: 'dismiss_alert',
  });
};

export const { Context, Provider } = createDataContext(
  popUpReducer,
  {
    showAlert,
    dismissAlert,
  }, {
    alertVisible: false,
    alertMessage: '',
    alertBackPress: null,
    onConfirm: () => {},
    onCancel: () => {},
  },
);
