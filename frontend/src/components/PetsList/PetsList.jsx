import PetsData from '../PetsData/PetsData';
import scss from './PetsList.module.scss';
import Cat from '../../images/catPatData.png';
const pets = [
  {
    id: 1,
    avatarURL: Cat,
    name: 'Jack',
    birthday: '22.04.2018',
    breed: '22.04.2018',
    comments: `Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit
    amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
    dolor sit amet, consectetur Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit
    amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
    dolor sit amet, consectetur`,
  },
  {
    id: 2,
    avatarURL: Cat,
    name: 'Bob',
    birthday: '12.07.2021',
    breed: '12.07.2021',
    comments: `Ipsum dolor sit amet, consecteturLorem ipsum dolor sit
    amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
    dolor sit amet, consectetur Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit
    amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
    dolor sit amet, consectetur`,
  },
];

const PetsList = () => {
  return (
    <>
      <ul>
        {pets.map(({ id, avatarURL, name, birthday, breed, comments }) => {
          return (
            <li className={scss.petsList} key={id}>
              <PetsData
                avatarURL={avatarURL}
                name={name}
                birthday={birthday}
                breed={breed}
                comments={comments}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default PetsList;
