import { SearchPage } from '@/pages/search';

import { MainComposition } from './di/compositions/Main';

/** Корневой компонент */
const App = () => {
  return (
    <MainComposition>
      <SearchPage />
    </MainComposition>
  );
};

export default App;
