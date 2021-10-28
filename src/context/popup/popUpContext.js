import createDataContext from '../../utils/createDataContext';
import popUpReducer from './popUpReducer';
import popUpActions from './popUpActions';

export const { Context, Provider } = createDataContext(
  popUpReducer,
  {
    ...popUpActions,
  }, {
    alertVisible: false,
    alertMessage: '',
    alertBackPress: null,
    onConfirm: () => {},
    onCancel: null,
  },
);
