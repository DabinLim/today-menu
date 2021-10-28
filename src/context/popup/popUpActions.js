export default {
  showAlert: (dispatch) => ({
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
  },
  dismissAlert: (dispatch) => () => {
    dispatch({
      type: 'dismiss_alert',
    });
  },
};
