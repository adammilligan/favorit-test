/**
 * Общее состояние запроса: загрузка, ошибка, пустой ответ.
 * @param root0 Пропсы
 * @param root0.status idle | loading | success | empty | error
 * @param root0.error Текст ошибки
 * @param root0.emptyText Текст пустого ответа
 * @param root0.idleText Подсказка до запроса
 * @param root0.loader Скелетон на время загрузки
 * @param root0.children Содержимое успешного состояния
 */
export const RequestState = ({
  status,
  error,
  emptyText,
  idleText,
  loader,
  children
}) => {
  if (status === 'loading') return loader;

  if (status === 'error') {
    return (
      <div className='alert alert-danger mb-0' role='alert'>
        {error}
      </div>
    );
  }

  if (status === 'empty') {
    return <div className='alert alert-secondary mb-0'>{emptyText}</div>;
  }

  if (status === 'idle') {
    return idleText ? <p className='text-secondary mb-0'>{idleText}</p> : null;
  }

  return children;
};
