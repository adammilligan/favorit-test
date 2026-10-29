const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000';

/** Сервис отдаёт пустой товар вместо ошибки, если артикул не найден. */
export const isNotFound = goods => {
  if (!Array.isArray(goods) || goods.length === 0) return true;

  const [first] = goods;

  return (
    goods.length === 1 &&
    !first.brand &&
    !first.name &&
    (first.goodsID === EMPTY_GOODS_ID || !first.goodsID)
  );
};

export const mapBrands = goods =>
  goods
    .filter(item => item.brand)
    .map(item => ({
      goodsID: item.goodsID,
      brand: item.brand,
      name: item.name,
      number: item.number,
      count: item.count ?? 0
    }));

/**
 * Строка таблицы — предложение склада.
 * Корневую price не используем: в документации её просят брать из warehouses.
 */
const toOfferRows = (item, kind) => {
  const base = {
    goodsID: item.goodsID,
    name: item.name,
    brand: item.brand,
    number: item.number,
    kind
  };

  if (!item.warehouses?.length) {
    return [
      {
        ...base,
        rowId: `${kind}-${item.goodsID}`,
        price: null,
        stock: 0,
        warehouse: ''
      }
    ];
  }

  return item.warehouses.map((warehouse, index) => ({
    ...base,
    rowId: `${kind}-${item.goodsID}-${warehouse.id}-${index}`,
    price: warehouse.price,
    stock: warehouse.stock ?? 0,
    warehouse: warehouse.code || ''
  }));
};

/** Выбранная деталь и её аналоги в плоский список предложений. */
export const mapOffers = goods => {
  if (isNotFound(goods)) return [];

  const [selected] = goods;
  const analogues = selected.analogues ?? [];

  return [
    ...toOfferRows(selected, 'requested'),
    ...analogues.flatMap(item => toOfferRows(item, 'analogue'))
  ];
};
