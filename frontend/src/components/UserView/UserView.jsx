import PetsList from '../PetsList';
import UserData from '../UserData';
import Button from '../Button';
import scss from './UserView.module.scss';

const UserView = () => {
  const addPet = () => {
    console.log('addPet');
  };
  return (
    <section className={["container", scss.wrapper].join(" ")}>
      <h2 className={scss.titleInfo}>My information:</h2>
      <UserData />
      <h2 className={scss.titlePets}>My pets:</h2>
      <div className={scss.btnWrapper}>
        <p className={scss.addPetText}>Add pet </p>
        <Button className={scss.addPetBtn} onClick={addPet()}></Button>
      </div>
      <PetsList />
    </section>
  );
};

export default UserView;
