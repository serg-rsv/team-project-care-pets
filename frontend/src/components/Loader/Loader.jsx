import { RotatingLines } from 'react-loader-spinner';
import s from './Loader.module.scss'

 export const Loader = () => {
   return (
     <div className={s.loaderWrapper}>
       <RotatingLines
         strokeColor="orange"
         strokeWidth="5"
         animationDuration="0.75"
         width="96"
         visible={true}
       />
     </div>
   );
 };