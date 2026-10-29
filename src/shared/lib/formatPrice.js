const priceFormat = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/** Цена склада. Пустое значение — предложения нет. */
export const formatPrice = price => {
  if (price === null || price === undefined) return '—';

  return `${priceFormat.format(price)} ₽`;
};
