import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchGoods } from '../api/fetchGoods';
import { isNotFound } from './mapGoods';

const rejectMessage = error =>
  error instanceof Error ? error.message : 'Не удалось выполнить запрос';

/** Шаг 1: производители по артикулу. Пустая строка сбрасывает поиск. */
export const searchBrands = createAsyncThunk(
  'part/searchBrands',
  async (article, { rejectWithValue }) => {
    if (!article) return [];

    try {
      const goods = await fetchGoods({ number: article });

      return isNotFound(goods) ? [] : goods;
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  }
);

/** Шаг 2: предложения и аналоги выбранного производителя. */
export const loadOffers = createAsyncThunk(
  'part/loadOffers',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      return await fetchGoods({ number, brand, analogues: true });
    } catch (error) {
      return rejectWithValue(rejectMessage(error));
    }
  }
);
