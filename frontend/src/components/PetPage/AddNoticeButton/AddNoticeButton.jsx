import { useTranslation } from 'react-i18next';

import { useModal } from '../../../hooks/useModal';
import Button from '../../Button';
import s from './AddNoticeButton.module.scss';

const AddNoticeButton = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModal();

  return (
    <div
      onClick={() => {
        openModal('addpet');
      }}
      className={s.addBox}
    >
      <p>{t('AddNoticeButton.add')}</p>
      <Button className={s.addButton}></Button>
    </div>
  );
};

export default AddNoticeButton;
