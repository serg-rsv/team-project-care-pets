import { useTranslation } from 'react-i18next';

import { useFetchPetsQuery } from '../../redux/services/petsSlice';
import PetsData from '../PetsData/PetsData';
import scss from './PetsList.module.scss';

const PetsList = () => {
  const { t } = useTranslation('common');
  const { data, error, isLoading } = useFetchPetsQuery();

  return (
    <>
      <ul>
        {error ? (
          <p className={scss.text}>{t('PetsList.somethingWentWrong')}</p>
        ) : isLoading ? (
          <p className={scss.text}>{t('PetsList.loading')}</p>
        ) : data ? (
          data.data.map(
            ({ _id, photoURL, name, birthday, breed, comments }) => {
              return (
                <li className={scss.petsList} key={_id}>
                  <PetsData
                    id={_id}
                    photoURL={photoURL}
                    name={name}
                    birthday={birthday}
                    breed={breed}
                    comments={comments}
                  />
                </li>
              );
            }
          )
        ) : null}
      </ul>
    </>
  );
};

export default PetsList;
