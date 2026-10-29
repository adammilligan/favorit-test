import { useEffect, useState } from 'react';

import { useAppDispatch } from '@/shared/lib/redux';

import { searchBrands } from '@/entities/part';

const DEBOUNCE_MS = 400;
const MIN_LENGTH = 2;

/** Поле артикула. Запрос уходит по вводу, без кнопки. */
export const SearchByNumber = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  useEffect(() => {
    const article = value.trim();
    const timer = setTimeout(() => {
      dispatch(searchBrands(article.length >= MIN_LENGTH ? article : ''));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [dispatch, value]);

  return (
    <label className='form-label w-100 mb-0'>
      Артикул
      <input
        className='form-control form-control-lg mt-2'
        value={value}
        placeholder='Например, 01089'
        autoComplete='off'
        autoFocus
        onChange={event => setValue(event.target.value)}
      />
    </label>
  );
};
