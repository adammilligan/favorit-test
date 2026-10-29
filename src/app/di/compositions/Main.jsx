import { Store } from '../injections/Store';

/** Композиция приложения */
export const MainComposition = ({ children }) => {
  return <Store>{children}</Store>;
};
