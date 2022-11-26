import PetsData from '../PetsData/PetsData';
import scss from './PetsList.module.scss';
import { useFetchPetsQuery } from '../../redux/services/petsSlice';

const PetsList = () => {
  const { data, error, isLoading } = useFetchPetsQuery();
  return (
    <>
      <ul>
        {error ? (
          <p className={scss.text}>Oh no, there was an error</p>
        ) : isLoading ? (
          <p className={scss.text}>Loading...</p>
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
