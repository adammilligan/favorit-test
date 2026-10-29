import { Provider } from 'react-redux';

import { store } from '../../store/store';

/** Провайдер Redux */
export const Store = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
