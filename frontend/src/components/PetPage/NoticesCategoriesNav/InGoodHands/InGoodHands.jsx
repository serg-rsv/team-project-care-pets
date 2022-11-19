import { useGetNoticesBycategoryQuery } from '../../../../redux/services/noticesSlice';
import NoticesCategoriesList from '../../NoticesCategoriesList';

const pets = [
  {
    id: '1',
    link: 'https://static9.depositphotos.com/1632087/1139/i/600/depositphotos_11395540-stock-photo-black-yellow.jpg',
    title: 'cat',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '2',
    link: 'https://st.depositphotos.com/1146092/1409/i/600/depositphotos_14094278-stock-photo-dog-listening-with-big-ear.jpg',
    title: 'dog',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '3',
    link: 'https://st4.depositphotos.com/1008620/27244/i/600/depositphotos_272442936-stock-photo-cute-puppy-on-green-grass.jpg',
    title: 'dog',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '4',
    link: 'https://static7.depositphotos.com/1004739/714/i/600/depositphotos_7144342-stock-photo-rabbit.jpg',
    title: 'Rabbit',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '5',
    link: 'https://st.depositphotos.com/1000152/2398/i/600/depositphotos_23986869-stock-photo-kitten-sleeps.jpg',
    title: 'Cet',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '6',
    link: 'https://static3.depositphotos.com/1000804/124/i/600/depositphotos_1241195-free-stock-photo-cat.jpg',
    title: 'Cet',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '7',
    link: 'https://static6.depositphotos.com/1003366/660/i/600/depositphotos_6606960-stock-photo-purebred-english-bulldog-in-glasses.jpg',
    title: 'Dog',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
  {
    id: '8',
    link: 'https://st4.depositphotos.com/13193824/22618/i/600/depositphotos_226186154-free-stock-photo-close-shot-adorable-scottish-fold.jpg',
    title: 'Dog',
    breed: 'Pomeranian',
    place: 'Lviv',
    age: 'one year',
    page: 'In good hands',
  },
];

const InGoodHands = () => {
  const { data, isSuccess } = useGetNoticesBycategoryQuery('for-free');
  const pets = data?.data;
  return <>{isSuccess && <NoticesCategoriesList pets={pets} />}</>;
};

export default InGoodHands;
