import axios from 'axios';

import { apiClient, favoritApiKey } from '@/shared/api/client';

const API_ERRORS = {
  'Empty key!': 'Не указан ключ покупателя',
  'Invalid key client!': 'Неверный ключ покупателя',
  'Empty number goods!': 'Не указан номер детали',
  'Request quota exceeded!': 'Превышен лимит запросов'
};

const toMessage = error => {
  const text = Array.isArray(error) ? error.join('. ') : String(error);

  return API_ERRORS[text] || text;
};

/**
 * Поиск деталей. brand и analogues передаются только на втором шаге.
 * @param root0 Параметры
 * @param root0.number Артикул
 * @param root0.brand Производитель
 * @param root0.analogues Запросить аналоги
 */
export const fetchGoods = async ({ number, brand, analogues }) => {
  const params = {
    key: favoritApiKey,
    number
  };

  if (brand) params.brand = brand;
  if (analogues) params.analogues = 'on';

  try {
    const { data } = await apiClient.get('', { params });

    if (data?.error) throw new Error(toMessage(data.error));

    return data?.goods ?? [];
  } catch (error) {
    if (error instanceof Error && !axios.isAxiosError(error)) throw error;

    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data?.error;

      if (apiError) throw new Error(toMessage(apiError));
      if (!error.response) {
        throw new Error(
          'Сервис недоступен. Проверьте соединение и повторите запрос.'
        );
      }
    }

    throw new Error('Не удалось выполнить запрос');
  }
};
