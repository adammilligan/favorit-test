import { SearchByNumber } from '@/features/search-by-number';
import { SelectBrand } from '@/features/select-brand';

import { Offers } from '@/widgets/offers';

/** Подбор номенклатуры: артикул, производитель, предложения. */
export const SearchPage = () => {
  return (
    <div className='min-vh-100 bg-light'>
      <header className='bg-white border-bottom'>
        <div className='container py-3'>
          <h1 className='h4 mb-0'>Подбор автозапчастей</h1>
        </div>
      </header>
      <main className='container py-4'>
        <div className='card shadow-sm mb-4'>
          <div className='card-body'>
            <SearchByNumber />
          </div>
        </div>
        <div className='row g-4'>
          <div className='col-12 col-lg-4'>
            <div className='card shadow-sm'>
              <div className='card-body'>
                <SelectBrand />
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-8'>
            <div className='card shadow-sm'>
              <div className='card-body'>
                <Offers />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
