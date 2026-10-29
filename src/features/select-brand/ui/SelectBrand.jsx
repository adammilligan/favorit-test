import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';

import { RequestState } from '@/shared/ui/RequestState';

import { loadOffers } from '@/entities/part';

const SKELETON_ROWS = ['col-8', 'col-7', 'col-6', 'col-9'];

/** Скелетон списка производителей. */
const BrandListSkeleton = () => {
  return (
    <div role='status'>
      <span className='visually-hidden'>Загрузка...</span>
      <div className='list-group placeholder-glow' aria-hidden='true'>
        {SKELETON_ROWS.map(width => (
          <div key={width} className='list-group-item'>
            <span className={`placeholder ${width} d-block`} />
            <span className='placeholder col-4 d-block mt-2' />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Список производителей по введённому артикулу. */
export const SelectBrand = () => {
  const dispatch = useAppDispatch();
  const { article, brands, brandsStatus, brandsError, selectedGoodsID } =
    useAppSelector(state => state.part);

  const onSelect = item => {
    dispatch(
      loadOffers({
        number: article,
        brand: item.brand,
        goodsID: item.goodsID
      })
    );
  };

  return (
    <section>
      <h2 className='h5 mb-3'>Производители</h2>
      <RequestState
        status={brandsStatus}
        error={brandsError}
        emptyText='По этому артикулу ничего не найдено'
        idleText='Введите артикул, чтобы увидеть производителей'
        loader={<BrandListSkeleton />}
      >
        <div className='list-group'>
          {brands.map(item => {
            const isSelected = item.goodsID === selectedGoodsID;

            return (
              <button
                key={item.goodsID}
                type='button'
                className={`list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
                onClick={() => onSelect(item)}
              >
                <span className='d-flex justify-content-between gap-2'>
                  <span className='fw-semibold'>{item.brand}</span>
                  <span className='badge text-bg-light text-dark'>
                    {item.count} шт.
                  </span>
                </span>
                <span
                  className={`d-block small mt-1 ${isSelected ? '' : 'text-secondary'}`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </RequestState>
    </section>
  );
};
