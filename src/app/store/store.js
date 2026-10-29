import { configureStore } from '@reduxjs/toolkit';

import { partReducer } from '@/entities/part';

export const store = configureStore({
  reducer: {
    part: partReducer
  }
});
