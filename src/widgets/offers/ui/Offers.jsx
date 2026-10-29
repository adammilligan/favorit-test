import { formatPrice } from '@/shared/lib/formatPrice';
import { useAppSelector } from '@/shared/lib/redux';

import { RequestState } from '@/shared/ui/RequestState';

const SKELETON_ROWS = 5;

/** Скелетон таблицы предложений. */
const OffersSkeleton = () => {
  return (
    <div className='table-responsive' role='status'>
      <span className='visually-hidden'>Загрузка...</span>
      <table className='table align-middle mb-0' aria-hidden='true'>
        <thead>
          <tr>
            <th>Название / Производитель</th>
            <th>Артикул</th>
            <th>Склад</th>
            <th>Цена</th>
            <th>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <tr key={index} className='placeholder-glow'>
              <td>
                <span className='placeholder col-8 d-block' />
                <span className='placeholder col-4 d-block mt-2' />
              </td>
              <td>
                <span className='placeholder col-8 d-block' />
              </td>
              <td>
                <span className='placeholder col-6 d-block' />
              </td>
              <td>
                <span className='placeholder col-8 d-block' />
              </td>
              <td>
                <span className='placeholder col-4 d-block' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Таблица предложений и аналогов выбранного производителя. */
export const Offers = () => {
  const { brandsStatus, offersStatus, offers, offersError, selectedBrand } =
    useAppSelector(state => state.part);

  const idleText =
    brandsStatus === 'success'
      ? 'Выберите производителя, чтобы увидеть аналоги и предложения'
      : '';

  return (
    <section>
      <h2 className='h5 mb-3'>
        {selectedBrand ? `Предложения: ${selectedBrand}` : 'Предложения'}
      </h2>
      <RequestState
        status={offersStatus}
        error={offersError}
        emptyText='Предложения не найдены'
        idleText={idleText}
        loader={<OffersSkeleton />}
      >
        <div className='table-responsive offers-table'>
          <table className='table table-striped table-hover align-middle mb-0'>
            <thead>
              <tr>
                <th>Название / Производитель</th>
                <th>Артикул</th>
                <th>Склад</th>
                <th>Цена</th>
                <th>Остаток</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => (
                <tr key={offer.rowId}>
                  <td>
                    <div className='fw-semibold'>{offer.name || '—'}</div>
                    <div className='small text-secondary'>
                      {offer.brand}
                      {offer.kind === 'analogue' ? ' · аналог' : ''}
                    </div>
                  </td>
                  <td className='text-nowrap'>{offer.number}</td>
                  <td className='text-nowrap'>{offer.warehouse || '—'}</td>
                  <td className='text-nowrap'>{formatPrice(offer.price)}</td>
                  <td className='text-nowrap'>{offer.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RequestState>
    </section>
  );
};
