import { createSlice } from '@reduxjs/toolkit';

import { mapBrands, mapOffers } from './mapGoods';
import { loadOffers, searchBrands } from './thunks';

const initialState = {
  article: '',
  brandsStatus: 'idle',
  brands: [],
  brandsError: '',
  selectedGoodsID: '',
  selectedBrand: '',
  offersStatus: 'idle',
  offers: [],
  offersError: ''
};

const partSlice = createSlice({
  name: 'part',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchBrands.pending, (state, action) => {
        state.article = action.meta.arg;
        state.selectedGoodsID = '';
        state.selectedBrand = '';
        state.offers = [];
        state.offersStatus = 'idle';
        state.offersError = '';

        if (!action.meta.arg) {
          state.brands = [];
          state.brandsStatus = 'idle';
          state.brandsError = '';
          return;
        }

        state.brandsStatus = 'loading';
        state.brandsError = '';
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        if (action.meta.arg !== state.article) return;
        if (!action.meta.arg) return;

        const brands = mapBrands(action.payload);

        state.brands = brands;
        state.brandsStatus = brands.length ? 'success' : 'empty';
      })
      .addCase(searchBrands.rejected, (state, action) => {
        if (action.meta.arg !== state.article || action.meta.aborted) return;

        state.brands = [];
        state.brandsStatus = 'error';
        state.brandsError = action.payload || 'Не удалось выполнить запрос';
      })
      .addCase(loadOffers.pending, (state, action) => {
        state.selectedGoodsID = action.meta.arg.goodsID;
        state.selectedBrand = action.meta.arg.brand;
        state.offersStatus = 'loading';
        state.offersError = '';
        state.offers = [];
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        const { brand, number } = action.meta.arg;

        if (brand !== state.selectedBrand || number !== state.article) return;

        const offers = mapOffers(action.payload);

        state.offers = offers;
        state.offersStatus = offers.length ? 'success' : 'empty';
      })
      .addCase(loadOffers.rejected, (state, action) => {
        const { brand, number } = action.meta.arg;

        if (brand !== state.selectedBrand || number !== state.article) return;
        if (action.meta.aborted) return;

        state.offers = [];
        state.offersStatus = 'error';
        state.offersError =
          action.payload || 'Не удалось получить предложения';
      });
  }
});

export const { reducer: partReducer } = partSlice;
